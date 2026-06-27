import { MIN_ACCEPTED_IMAGES } from "@/lib/constants"
import { create } from "zustand"
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware"

export interface StoredPhoto {
  id: string // Unique ID for tracking
  name: string
  type: string
  size: number
  lastModified: number
  // File will be stored separately in IndexedDB
}

export interface FormData {
  name: string
  gender: string
  ageGroup: string
  hairColor: string
  hairLength: string
  hairType: string
  ethnicity: string
  bodyType: string
  attire: string[]
  background: string[]
  selectedPlan: string
  uploadedImages: StoredPhoto[] // Only metadata, actual files in IndexedDB
  consent: boolean
  selectedTrainingId: string // For pro packs
  glassesPreference: string // "with-glasses" | "without-glasses" | "mix"
  lastSlug: string // Tracks which pack the current selections belong to
  generatedPreviews: string[] // IndexedDB ids of generated preview headshots
  generatedPreviewsKey: string // selection signature the previews were made for
}

// Pack data interface to determine which steps are needed
export interface PackData {
  id?: string
  slug?: string
  title?: string
  description?: string | null
  attire: unknown | null
  background: unknown | null
  choices: {
    attire: { [key: string]: number | "all" }
    background: { [key: string]: number | "all" }
  } | null
  is_active?: boolean | null
  pro?: boolean | null
}

// IndexedDB utilities
const DB_NAME = 'headshot-images'
const DB_VERSION = 1
const STORE_NAME = 'images'

class ImageStorage {
  private db: IDBDatabase | null = null
  private opening: Promise<IDBDatabase> | null = null

  // Open (or reuse) a live connection. If a previous connection was closed by
  // the browser, Fast Refresh/HMR, a tab/version change, or eviction, the cached
  // handle is dropped via onclose/onversionchange so this reopens a fresh one.
  private openDb(): Promise<IDBDatabase> {
    if (this.db) return Promise.resolve(this.db)
    if (this.opening) return this.opening

    this.opening = new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => {
        this.opening = null
        reject(request.error)
      }
      request.onsuccess = () => {
        const db = request.result
        // Drop the cached handle when the connection goes away so the next
        // operation transparently reopens instead of throwing "connection is
        // closing".
        db.onclose = () => {
          if (this.db === db) this.db = null
        }
        db.onversionchange = () => {
          try { db.close() } catch { /* ignore */ }
          if (this.db === db) this.db = null
        }
        this.db = db
        this.opening = null
        resolve(db)
      }
      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        }
      }
    })

    return this.opening
  }

  async init(): Promise<void> {
    await this.openDb()
  }

  // Run a single IndexedDB request. Creating the transaction can throw
  // synchronously ("InvalidStateError: The database connection is closing") if
  // the cached connection has been closed — in that case we discard it and
  // retry once with a freshly-opened connection.
  private async run<T>(
    mode: IDBTransactionMode,
    op: (store: IDBObjectStore) => IDBRequest,
  ): Promise<T> {
    const attempt = async (): Promise<T> => {
      const db = await this.openDb()
      return new Promise<T>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], mode)
        const store = transaction.objectStore(STORE_NAME)
        const request = op(store)
        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result as T)
      })
    }

    try {
      return await attempt()
    } catch {
      // Stale/closing connection — drop it and retry once with a fresh one.
      this.db = null
      this.opening = null
      return attempt()
    }
  }

  async storeImage(id: string, file: File): Promise<void> {
    await this.run<IDBValidKey>('readwrite', (store) => store.put({ id, file }))
  }

  async getImage(id: string): Promise<File | null> {
    const result = await this.run<{ id: string; file: File } | undefined>(
      'readonly',
      (store) => store.get(id),
    )
    return result ? result.file : null
  }

  async deleteImage(id: string): Promise<void> {
    await this.run<undefined>('readwrite', (store) => store.delete(id))
  }

  async getAllImages(): Promise<{ id: string; file: File }[]> {
    return this.run<{ id: string; file: File }[]>(
      'readonly',
      (store) => store.getAll(),
    )
  }

  async clearAll(): Promise<void> {
    await this.run<undefined>('readwrite', (store) => store.clear())
  }
}

export const imageStorage = new ImageStorage()

// Encryption utilities using Web Crypto API
class EncryptionHelper {
  private key: CryptoKey | null = null
  private readonly keyMaterial = 'headshot-ai-form-storage-v1' // Obfuscation key

  async getKey(): Promise<CryptoKey> {
    if (this.key) return this.key

    const encoder = new TextEncoder()
    const keyData = encoder.encode(this.keyMaterial)
    
    // Import raw key material
    const importedKey = await crypto.subtle.importKey(
      'raw',
      await crypto.subtle.digest('SHA-256', keyData),
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    )

    this.key = importedKey
    return this.key
  }

  async encrypt(data: string): Promise<string> {
    try {
      const encoder = new TextEncoder()
      const dataBuffer = encoder.encode(data)
      const key = await this.getKey()
      
      // Generate a random IV (Initialization Vector)
      const iv = crypto.getRandomValues(new Uint8Array(12))
      
      // Encrypt the data
      const encryptedBuffer = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        dataBuffer
      )
      
      // Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength)
      combined.set(iv, 0)
      combined.set(new Uint8Array(encryptedBuffer), iv.length)
      
      // Convert to base64 for storage
      return btoa(String.fromCharCode(...combined))
    } catch (error) {
      console.error('Encryption error:', error)
      // Fallback to plain text if encryption fails
      return data
    }
  }

  async decrypt(encryptedData: string): Promise<string> {
    try {
      const key = await this.getKey()
      
      // Decode from base64
      const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0))
      
      // Extract IV and encrypted data
      const iv = combined.slice(0, 12)
      const data = combined.slice(12)
      
      // Decrypt the data
      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        data
      )
      
      // Convert back to string
      const decoder = new TextDecoder()
      return decoder.decode(decryptedBuffer)
    } catch (error) {
      console.error('Decryption error:', error)
      // If decryption fails, try returning as plain text (migration case)
      return encryptedData
    }
  }
}

const encryptionHelper = new EncryptionHelper()

// Create encrypted storage adapter for Zustand
const createEncryptedStorage = (): StateStorage => {
  return {
    getItem: async (name: string): Promise<string | null> => {
      const encryptedValue = localStorage.getItem(name)
      if (!encryptedValue) return null
      
      try {
        const decrypted = await encryptionHelper.decrypt(encryptedValue)
        return decrypted
      } catch (error) {
        console.error('Failed to decrypt storage:', error)
        return null
      }
    },
    setItem: async (name: string, value: string): Promise<void> => {
      try {
        const encrypted = await encryptionHelper.encrypt(value)
        localStorage.setItem(name, encrypted)
      } catch (error) {
        console.error('Failed to encrypt storage:', error)
        // Fallback to unencrypted storage
        localStorage.setItem(name, value)
      }
    },
    removeItem: (name: string): void => {
      localStorage.removeItem(name)
    },
  }
}

interface FormStore {
  currentStep: string
  formData: FormData,
  slug: string,
  packData: PackData | null,
  setSlug: (slug: string) => boolean
  setPackData: (packData: PackData) => void
  setCurrentStep: (step: string) => void
  updateFormData: (data: Partial<FormData>) => void
  resetForm: () => void
  resetFormWithCleanup: () => Promise<void>
  getStepNumber: (step: string) => number
  getTotalSteps: () => number
  getStepOrder: () => string[]
  getNextStep: (currentStep: string) => string | null
  validateStep: (targetStep: string) => { isValid: boolean; redirectTo: string }
  getNextIncompleteStep: () => string
}

const initialFormData: FormData = {
  name: "",
  gender: "",
  ageGroup: "",
  hairColor: "",
  hairLength: "",
  hairType: "",
  ethnicity: "",
  bodyType: "",
  attire: [],
  background: [],
  selectedPlan: "basic",
  uploadedImages: [],
  consent: false,
  selectedTrainingId: "",
  glassesPreference: "",
  lastSlug: "",
  generatedPreviews: [],
  generatedPreviewsKey: "",
}

const getPackSpecificDefaults = (): Partial<FormData> => ({
  attire: [],
  background: [],
  selectedPlan: "basic",
  uploadedImages: [],
  generatedPreviews: [],
  generatedPreviewsKey: "",
})

// S1 Front-loaded variant: the gender step combines gender + attire + background,
// then we jump straight to upload (the "Upload My Selfies" CTA), and finish with
// pricing + glasses + review. The demographic questions (age, hair, ethnicity,
// body-type) are dropped from this variant.
const baseStepOrder = [
  "gender",
  "attire",
  "background",
  "upload",
  "preview",
  "unlock",
  "checkout",
  "pricing",
  "glasses",
  "review",
  "payment-success",
]

const getStepOrder = (_packData: PackData | null, _formData?: FormData): string[] => {
  return [...baseStepOrder]
}

// Step validation logic
const validateStepAccess = (targetStep: string, formData: FormData, packData: PackData | null): { isValid: boolean; redirectTo: string } => {
  const stepOrder = getStepOrder(packData, formData)
  const targetIndex = stepOrder.indexOf(targetStep)

  // If step doesn't exist, redirect to first step
  if (targetIndex === -1) {
    return { isValid: false, redirectTo: "gender" }
  }

  // Always allow access to first step
  if (targetIndex === 0) {
    return { isValid: true, redirectTo: targetStep }
  }

  // payment-success is reached via Stripe's success_url redirect, so it must
  // be allowed even if the user hasn't completed intermediate steps like
  // glasses/review (Stripe checkout skips them).
  if (targetStep === "payment-success") {
    return { isValid: true, redirectTo: targetStep }
  }

  // Check if all previous steps are completed
  for (let i = 0; i < targetIndex; i++) {
    const step = stepOrder[i]
    const isCompleted = isStepCompleted(step, formData, packData)
    
    if (!isCompleted) {
      return { isValid: false, redirectTo: step }
    }
  }

  return { isValid: true, redirectTo: targetStep }
}

// Helper function to check if a step is completed
const isStepCompleted = (step: string, formData: FormData, _packData: PackData | null): boolean => {
  switch (step) {
    case "gender": {
      // The redesigned gender step ("Tell us about yourself") collects name +
      // gender only; outfits/backgrounds are no longer chosen here.
      return Boolean(formData.name && formData.name.trim()) && Boolean(formData.gender)
    }
    case "age":
      return Boolean(formData.ageGroup)
    case "hair-color":
      // Skip validation if user is bald
      if (formData.hairLength === "bald") return true
      return Boolean(formData.hairColor)
    case "hair-length":
      return Boolean(formData.hairLength)
    case "hair-type":
      // Skip validation if user is bald
      if (formData.hairLength === "bald") return true
      return Boolean(formData.hairType)
    case "ethnicity":
      return Boolean(formData.ethnicity)
    case "body-type":
      return Boolean(formData.bodyType)
    case "pricing":
      // For pricing step, we consider it complete if a plan is selected
      // The actual payment validation happens in the pricing step component
      return Boolean(formData.selectedPlan)
    case "attire":
      // Dedicated attire step now always collects at least one selection.
      return Array.isArray(formData.attire) && formData.attire.length > 0
    case "background":
      // Dedicated background step now always collects at least one selection.
      return Array.isArray(formData.background) && formData.background.length > 0
    case "upload":
      return Array.isArray(formData.uploadedImages) && formData.uploadedImages.length >= MIN_ACCEPTED_IMAGES
    case "preview":
      // Soft auth/preview gate — completes as soon as the user advances from it.
      return true
    case "unlock":
      // Preview-reveal gate — completes as soon as the user clicks Unlock.
      return true
    case "checkout":
      // Embedded Stripe checkout — reached after a plan is chosen on unlock.
      return Boolean(formData.selectedPlan)
    case "glasses":
      return Boolean(formData.glassesPreference)
    case "review":
      return Boolean(formData.consent)
    case "payment-success":
      // Reached only via Stripe success_url after a paid order — always considered complete.
      return true
    default:
      return false
  }
}

// Function to find the next incomplete step
const getNextIncompleteStep = (formData: FormData, packData: PackData | null): string => {
  const stepOrder = getStepOrder(packData, formData)
  for (const step of stepOrder) {
    if (!isStepCompleted(step, formData, packData)) {
      return step
    }
  }
  return stepOrder[stepOrder.length - 1] // Return last step if all are complete
}

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      currentStep: "gender",
      formData: initialFormData,
      slug: "",
      packData: null,
      setSlug: (slug) => {
        const { formData } = get()
        const slugChanged = Boolean(formData.lastSlug) && formData.lastSlug !== slug
        if (slugChanged) {
          set((state) => ({
            slug,
            formData: { ...state.formData, ...getPackSpecificDefaults(), lastSlug: slug },
          }))
          // Clear the previous pack's uploaded blobs from IndexedDB so stale
          // selfies don't reappear in the new pack's upload step.
          imageStorage.clearAll().catch((err) => {
            console.error("Failed to clear stale uploads on pack switch:", err)
          })
        } else {
          set((state) => ({
            slug,
            formData: { ...state.formData, lastSlug: slug },
          }))
        }
        return slugChanged
      },
      setPackData: (packData) => {
        set({ packData })
      },
      setCurrentStep: (step) => {
        // Only update if the step is different
        if (get().currentStep !== step) {
          set({ currentStep: step })
        }
      },
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetForm: () => set({ formData: initialFormData, currentStep: "gender", slug: "", packData: null }),
      resetFormWithCleanup: async () => {
        try {
          await imageStorage.clearAll()
        } catch (error) {
          console.error('Error clearing IndexedDB:', error)
        }
        set({ formData: initialFormData, currentStep: "gender", slug: "", packData: null })
      },
      getStepOrder: () => {
        const { packData, formData } = get()
        return getStepOrder(packData, formData)
      },
      getStepNumber: (step) => {
        const { packData, formData } = get()
        const stepOrder = getStepOrder(packData, formData)
        return stepOrder.indexOf(step) + 1
      },
      getTotalSteps: () => {
        const { packData, formData } = get()
        return getStepOrder(packData, formData).length
      },
      getNextStep: (currentStep) => {
        const { packData, formData } = get()
        const stepOrder = getStepOrder(packData, formData)
        const currentIndex = stepOrder.indexOf(currentStep)
        if (currentIndex >= 0 && currentIndex < stepOrder.length - 1) {
          return stepOrder[currentIndex + 1]
        }
        return null // No next step (last step)
      },
      validateStep: (targetStep) => {
        const { formData, packData } = get()
        return validateStepAccess(targetStep, formData, packData)
      },
      getNextIncompleteStep: () => {
        const { formData, packData } = get()
        return getNextIncompleteStep(formData, packData)
      },
    }),
    {
      name: "ohfs",
      // Use encrypted storage
      storage: createJSONStorage(() => createEncryptedStorage()),
      // Only store formData in localStorage, not currentStep or packData
      partialize: (state) => ({ formData: state.formData }),
    },
  ),
)
