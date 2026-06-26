"use client"

import { useState, useEffect } from "react"
import { useFormStore, imageStorage } from "@/store/form-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, Camera, Clock, Upload, Loader2 } from "lucide-react"
import Link from "next/link"
import JSZip from "jszip"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { v4 as uuidv4 } from 'uuid'
import { getUploadSignedUrl } from "@/actions/upload-actions"
import imageCompression from 'browser-image-compression'
import { getPricingDetails } from "@/data/one-time-pricing-details"

export function ReviewStep() {
  const { formData, updateFormData, slug, resetFormWithCleanup } = useFormStore()
  const [consent, setConsent] = useState(false)
  const [uploadCount, setUploadCount] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter();

  const toastId = uuidv4();

  const category = slug.split("-")[0]
  const pricingDetails = getPricingDetails(category);
  const usedPlan =  Object.values(pricingDetails.plans).find(plan => plan.name.toLowerCase() === formData.selectedPlan)
  const pricingData = {
    name: usedPlan?.name,
    price: usedPlan?.price,
    headshots: usedPlan?.headshots,
    time: usedPlan?.generationTime,
  }


  // Initialize consent from formData and count uploads
  useEffect(() => {
    setConsent(formData.consent || false)
    setUploadCount(formData.uploadedImages?.length || 0)
  }, [formData.consent, formData.uploadedImages])

  const handleConsentChange = (checked: boolean) => {
    setConsent(checked)
    updateFormData({ consent: checked })
  }

  const handleGenerateHeadshots = async () => {

    // console.log('Starting headshot generation with form data:', formData);
    // return null;
    toast.loading('Preparing your photos...', { id: toastId })
    if (!consent) {
      toast.error("Please provide consent to generate headshots", { id: toastId, duration: 10000 })
      return
    }

    if (!formData.uploadedImages || formData.uploadedImages.length === 0) {
      toast.error("No images uploaded. Please upload images first.", { id: toastId, duration: 10000 })
      return
    }

    setIsGenerating(true)

         try {
       // Create zip file from uploaded images
       const zip = new JSZip()
       
       // Retrieve actual files from IndexedDB
       for (let i = 0; i < formData.uploadedImages.length; i++) {
         const storedPhoto = formData.uploadedImages[i]
         const actualFile = await imageStorage.getImage(storedPhoto.id)
         
         if (actualFile) {
           // Convert WEBP -> JPEG at zip time only
           const fileIsWebp = actualFile.type === 'image/webp' || /\.webp$/i.test(actualFile.name)
           let fileToZip = actualFile
           if (fileIsWebp) {
             const converted = await imageCompression(actualFile, {
               fileType: 'image/jpeg',
               initialQuality: 1,
               useWebWorker: true,
             })
             fileToZip = new File(
               [converted],
               actualFile.name.replace(/\.webp$/i, '.jpg'),
               { type: 'image/jpeg', lastModified: actualFile.lastModified }
             )
           }

           const imageBuffer = await fileToZip.arrayBuffer()
           const fileExtension = fileToZip.name.split('.').pop() || 'jpg'
           const fileName = `image_${i + 1}.${fileExtension}`
           zip.file(fileName, imageBuffer)
         }
       }

      // Generate zip blob
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const zipFile = new File([zipBlob], 'training_images.zip', { type: 'application/zip' });

      toast.loading('Uploading images...', { id: toastId })

      const { signedUrl, filePath } = await getUploadSignedUrl()

      await fetch(signedUrl, {
        method: 'PUT',
        body: zipFile,
        headers: {
          'Content-Type': 'application/zip'
        }
      })
      // Prepare form data with zip file and user selections
      const requestFormData = new FormData()
      
      // Add all user selection data
      const userSelections = {
        gender: formData.gender,
        ageGroup: formData.ageGroup,
        hairColor: formData.hairColor,
        hairLength: formData.hairLength,
        hairType: formData.hairType,
        ethnicity: formData.ethnicity,
        bodyType: formData.bodyType,
        selectedPlan: formData.selectedPlan,
        packSlug: slug,
        filePath: filePath,
        glassesPreference: formData.glassesPreference,
      }

      // Add individual fields to form data
      Object.entries(userSelections).forEach(([key, value]) => {
        if (value) {
          requestFormData.append(key, value)
        }
      })

      // Only add attire and background if they have values
      if (formData.attire && formData.attire.length > 0) {
        requestFormData.append('attire', JSON.stringify(formData.attire))
      }
      
      if (formData.background && formData.background.length > 0) {
        requestFormData.append('background', JSON.stringify(formData.background))
      }

      // Make API request — Gemini generation (replaces Replicate training).
      const response = await fetch('/api/generate/onetime', {
        method: 'POST',
        body: requestFormData
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to start generation')
      }

      // Training started successfully
      // console.log('Training started:', result.data)

      toast.success('Your headshots are being generated!', { id: toastId, duration: 5000 })

      // Give user time to read the success toast
      await new Promise(resolve => setTimeout(resolve, 5000)) // 5 seconds

      // Redirect to dashboard or photos page
      router.replace('/dashboard')

      // Clean up the form state shortly after navigation to avoid race
      // with the route change (prevents redirecting back to gender step)
      setTimeout(() => { void resetFormWithCleanup() }, 2000)
      
    } catch (error) {
      console.error('Error starting training:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to start training. Please try again.', { id: toastId, duration: 10000 })
      setIsGenerating(false)
    }
  }

  const formatLabel = (key: string, value: string | string[]) => {
    const labels: Record<string, string> = {
      gender: "Gender",
      ageGroup: "Age Group",
      hairColor: "Hair Color",
      hairLength: "Hair Length",
      hairType: "Hair Type",
      ethnicity: "Ethnicity",
      bodyType: "Body Type",
      attire: "Attire",
      background: "Background",
      glassesPreference: "Glasses Preference",
      selectedPlan: "Selected Plan",
    }

    // Handle array values (for attire and background)
    const formattedValue = Array.isArray(value)
      ? value
      : value

    return {
      label: labels[key] || key,
      value: formattedValue
    }
  }

  const selectedPlanDetails = formData.selectedPlan
    ? pricingData
    : undefined


  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-28">
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Review your selections</h1>
        <p className="text-base sm:text-lg text-gray-600">
          Double-check your selections, then hit Generate to create your headshots. 
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(formData).map(([key, value]) => {
              if (
                !value ||
                key === "selectedPlan" ||
                key === "uploadedImages" ||
                key === "consent" ||
                key === "selectedTrainingId" ||
                key === "lastSlug" ||
                (Array.isArray(value) && value.length === 0) ||
                (typeof value !== "string" && !Array.isArray(value))
              )
                return null
              
              // For attire and background, only show if they have values
              if ((key === "attire" || key === "background") && Array.isArray(value) && value.length === 0) {
                return null
              }
              const { label, value: formattedValue } = formatLabel(key, value)

              // Helper function to format individual values
              const formatIndividualValue = (val: string) => {
                // Handle age group special case - keep dashes
                if (key === 'ageGroup') {
                  return val
                }
                // Remove dashes and capitalize each word for other values
                return val
                  .replace(/-/g, ' ')
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ')
              }

              return (
                <div
                  key={key}
                  className="text-sm sm:text-base py-2 gap-2 flex justify-between items-center border-b border-gray-100 last:border-b-0"
                >
                    <span className="font-medium text-gray-700">{label}:</span>

                  {/* Handle array values (attire and background) as badges */}
                  {Array.isArray(formattedValue) && formattedValue.length > 0 ? (
                    <div className="flex flex-wrap gap-2 justify-end">
                      {formattedValue.map((val, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm border-blue-200"
                        >
                          {formatIndividualValue(val)}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-900 capitalize text-right">{formattedValue}</span>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Plan & Upload Summary */}
        <div className="space-y-6">
          {/* Selected Plan */}
          {selectedPlanDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-blue-500" />
                  Selected Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{selectedPlanDetails.name}</h3>
                    <p className="text-2xl font-bold text-blue-500">${selectedPlanDetails.price}</p>
                  </div>
                  <Badge className="bg-blue-500">Selected</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    <span>{selectedPlanDetails.headshots} headshots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedPlanDetails.time}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Uploaded Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-500" />
                Uploaded Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{uploadCount} photos uploaded</span>
                <Badge variant="outline">Ready</Badge>
              </div>
              <p className="text-sm text-gray-600 mt-2">Your photos have been uploaded and are ready for processing.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Consent Section */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6 py-2">
          <div className="flex items-start gap-4">
            <Checkbox id="consent" checked={consent} onCheckedChange={handleConsentChange} className="mt-1 bg-white border-gray-800" />
            <div className="space-y-2">
              <label htmlFor="consent" className="text-sm font-medium cursor-pointer">
                I consent to the processing of my uploaded images for headshot generation
              </label>
              <p className="text-sm text-gray-600">
                By checking this box, you agree to our <Link href="/terms" className="text-blue-500">Terms of Service</Link> and <Link href="/privacy" className="text-blue-500">Privacy Policy</Link>. Your images will be
                processed using AI technology to generate professional headshots. We do not store your images longer
                than necessary for processing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons — floating sticky bar */}
      <div className="flex flex-col sm:flex-row gap-4 fixed bottom-0 py-4 -translate-x-1/2 left-1/2 bg-white/95 backdrop-blur-sm w-full justify-center items-center z-20">
        <Button 
          variant="outline" 
          onClick={() => (window.location.href = `/generate/one-time/${slug}?step=gender`)} 
          className="flex-1 w-[90%] sm:w-full max-w-sm py-6 bg-white text-blue-500 border-blue-500 hover:text-blue-500 hover:bg-blue-50 rounded-sm text-lg font-medium cursor-pointer"
          disabled={isGenerating}
        >
          Start Over
        </Button>
        <Button
          onClick={handleGenerateHeadshots}
          disabled={!consent || isGenerating}
          className="flex-1 w-[90%] sm:w-full max-w-sm py-6 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 rounded-sm text-lg font-medium"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Starting generation...
            </>
          ) : (
            <>
              Generate Headshots
              <ArrowRight className="size-5" />
            </>
          )}
        </Button>
      </div>

      {!consent && !isGenerating && (
        <p className="text-center text-sm text-red-600">Please provide consent to generate your headshots</p>
      )}
    </div>
  )
}
