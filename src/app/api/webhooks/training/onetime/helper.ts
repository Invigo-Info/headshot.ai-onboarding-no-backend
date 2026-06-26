// preserveOrder support: Added optional `preserveOrder` flag to UserSelection and threaded it
// through selectPromptsForPlan → handler functions → selectWithRepetition.
// When true, prompts are returned in their original DB order (no shuffle).
// Used by the /check-prompts page to display prompts in a stable, predictable order.
// Default behavior (preserveOrder: undefined/false) remains unchanged — prompts are still shuffled.

// Plan configuration
const PLAN_CONFIG = {
	starter: { images: 40 },
	basic: { images: 100 },
	premium: { images: 150 }
} as const

// Enhanced type guards
function isRecordOfStringArray(value: unknown): value is Record<string, string[]> {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return false
	const obj = value as Record<string, unknown>
	const entries = Object.entries(obj)
	if (entries.length === 0) return false
	return entries.every(([key, val]) => 
		typeof key === 'string' && 
		Array.isArray(val) && 
		val.every(item => typeof item === 'string')
	)
}

function isComplexNestedStructure(value: unknown): value is Record<string, Record<string, string[]>> {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return false
	const obj = value as Record<string, unknown>
	const entries = Object.entries(obj)
	if (entries.length === 0) return false
	return entries.every(([key, val]) => 
		typeof key === 'string' && 
		isRecordOfStringArray(val)
	)
}

// Helper function to safely get array values and filter out empty ones
function getValidPrompts(prompts: string[]): string[] {
	return prompts.filter(p => p && typeof p === 'string' && p.trim().length > 0)
}

// Key normalization utilities for matching user selections (kebab-case slugs)
// against pack keys (display names) case-insensitively
function normalizeKey(key: string): string {
	return key.trim().toLowerCase().replace(/[\s_]+/g, "-")
}

function buildNormalizedKeyMap(keys: string[]): Map<string, string> {
	const map = new Map<string, string>()
	for (const key of keys) {
		map.set(normalizeKey(key), key)
	}
	return map
}

function deduplicateSelections(selections: string[]): string[] {
	const seen = new Set<string>()
	return selections.filter(s => {
		const norm = normalizeKey(s)
		if (seen.has(norm)) return false
		seen.add(norm)
		return true
	})
}

// Seeded PRNG for deterministic-but-shuffled output (reproducible for debugging)
function seededRandom(seed: number): () => number {
	let s = seed
	return () => {
		s = (s * 1664525 + 1013904223) & 0xffffffff
		return (s >>> 0) / 0xffffffff
	}
}

function shuffleArray<T>(arr: T[], rng: () => number): T[] {
	const result = [...arr]
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]]
	}
	return result
}

// Helper function for shuffled repetition with optional seed
function selectWithRepetition(prompts: string[], needed: number, seed?: number, preserveOrder?: boolean): string[] {
	if (prompts.length === 0) {
		throw new Error('Cannot select from empty prompts array')
	}

	if (preserveOrder) {
		if (prompts.length >= needed) {
			return prompts.slice(0, needed)
		}
		const result: string[] = []
		while (result.length < needed) {
			result.push(...prompts)
		}
		return result.slice(0, needed)
	}

	const rng = seededRandom(seed ?? Date.now())

	if (prompts.length >= needed) {
		return shuffleArray(prompts, rng).slice(0, needed)
	}

	const result: string[] = []
	while (result.length < needed) {
		result.push(...shuffleArray(prompts, rng))
	}
	return result.slice(0, needed)
}

// Handle direct array structure
function handleDirectArrayStructure(prompts: string[], totalNeeded: number, preserveOrder?: boolean): string[] {
	console.log('Processing direct array structure')
	const validPrompts = getValidPrompts(prompts)

	if (validPrompts.length === 0) {
		throw new Error('No valid prompts found in direct array structure')
	}

	const result = selectWithRepetition(validPrompts, totalNeeded, undefined, preserveOrder)
	console.log(`Selected ${result.length} prompts from ${validPrompts.length} available (direct array)`)
	return result
}

// Handle single-dimension key-value structure
function handleKeyValueStructure(
	genderPrompts: Record<string, string[]>,
	selectedAttires: string[] | undefined,
	selectedBackgrounds: string[] | undefined,
	totalNeeded: number,
	preserveOrder?: boolean
): string[] {
	console.log('Processing single-dimension key-value structure')
	
	const availableKeys = Object.keys(genderPrompts)
	if (availableKeys.length === 0) {
		throw new Error('No keys found in key-value structure')
	}
	
	console.log('Available keys:', availableKeys)
	
	let selectedKeys: string[] = []
	let selectionSource = 'none'
	
	// Try to match selected attires first (normalized matching)
	const keyMap = buildNormalizedKeyMap(availableKeys)

	if (selectedAttires && selectedAttires.length > 0) {
		const attireMatches = deduplicateSelections(selectedAttires)
			.map(a => keyMap.get(normalizeKey(a)))
			.filter((k): k is string => k !== undefined)
		if (attireMatches.length > 0) {
			selectedKeys = attireMatches
			selectionSource = 'attire'
			console.log(`Matched ${attireMatches.length} attire selections:`, attireMatches)
		}
	}

	// If no attire matches, try backgrounds (normalized matching)
	if (selectedKeys.length === 0 && selectedBackgrounds && selectedBackgrounds.length > 0) {
		const backgroundMatches = deduplicateSelections(selectedBackgrounds)
			.map(bg => keyMap.get(normalizeKey(bg)))
			.filter((k): k is string => k !== undefined)
		if (backgroundMatches.length > 0) {
			selectedKeys = backgroundMatches
			selectionSource = 'background'
			console.log(`Matched ${backgroundMatches.length} background selections:`, backgroundMatches)
		}
	}
	
	// If no matches found, use all available keys as fallback
	if (selectedKeys.length === 0) {
		selectedKeys = availableKeys
		selectionSource = 'fallback'
		console.log('No user selections matched, using all available keys as fallback')
	}
	
	// Collect prompts per key (keep them separated for even distribution)
	const keyPromptGroups: Array<{ key: string; prompts: string[] }> = []

	for (const key of selectedKeys) {
		const keyPrompts = genderPrompts[key]
		if (Array.isArray(keyPrompts)) {
			const validPrompts = getValidPrompts(keyPrompts)
			if (validPrompts.length > 0) {
				keyPromptGroups.push({ key, prompts: validPrompts })
			}
		}
	}

	if (keyPromptGroups.length === 0) {
		throw new Error(`No valid prompts found for keys: ${selectedKeys.join(', ')}`)
	}

	// Distribute prompts evenly across keys
	const promptsPerKey = Math.floor(totalNeeded / keyPromptGroups.length)
	const remainder = totalNeeded % keyPromptGroups.length

	const allSelectedPrompts: string[] = []

	keyPromptGroups.forEach((group, index) => {
		const numPromptsForThisKey = promptsPerKey + (index < remainder ? 1 : 0)
		const selectedFromKey = selectWithRepetition(group.prompts, numPromptsForThisKey, undefined, preserveOrder)
		allSelectedPrompts.push(...selectedFromKey)

		console.log(`Key ${group.key}: ${selectedFromKey.length}/${group.prompts.length} prompts`)
	})

	console.log(`Selected ${allSelectedPrompts.length} prompts from ${keyPromptGroups.length} keys (${selectionSource} selection)`)
	return allSelectedPrompts
}

// Handle complex nested structure (attire -> background -> prompts)
function handleComplexStructure(
	genderPrompts: Record<string, Record<string, string[]>>,
	selectedAttires: string[] | undefined,
	selectedBackgrounds: string[] | undefined,
	planConfig: { images: number },
	preserveOrder?: boolean
): string[] {
	console.log('Processing complex nested structure')
	
	const availableAttires = Object.keys(genderPrompts)
	if (availableAttires.length === 0) {
		throw new Error('No attires found in complex structure')
	}
	
	// Determine which attires to use (normalized matching)
	const attireKeyMap = buildNormalizedKeyMap(availableAttires)
	let targetAttires: string[] = []
	if (selectedAttires && selectedAttires.length > 0) {
		targetAttires = deduplicateSelections(selectedAttires)
			.map(a => attireKeyMap.get(normalizeKey(a)))
			.filter((k): k is string => k !== undefined)
		if (targetAttires.length === 0) {
			console.warn(`None of selected attires [${selectedAttires.join(', ')}] found in available attires [${availableAttires.join(', ')}]`)
			targetAttires = availableAttires // Use all available as fallback (Issue 4)
		}
	} else {
		targetAttires = availableAttires // Use all available if none selected (Issue 4)
	}
	
	// Find valid combinations
	const validCombinations: Array<{ attire: string; background: string; prompts: string[] }> = []
	
	for (const attire of targetAttires) {
		const attireData = genderPrompts[attire]
		if (!attireData || typeof attireData !== 'object') continue
		
		const availableBackgrounds = Object.keys(attireData)
		let targetBackgrounds: string[] = []
		
		// Determine which backgrounds to use for this attire (normalized matching)
		const bgKeyMap = buildNormalizedKeyMap(availableBackgrounds)
		if (selectedBackgrounds && selectedBackgrounds.length > 0) {
			targetBackgrounds = deduplicateSelections(selectedBackgrounds)
				.map(bg => bgKeyMap.get(normalizeKey(bg)))
				.filter((k): k is string => k !== undefined)
			if (targetBackgrounds.length === 0) {
				console.warn(`No selected backgrounds found for attire ${attire}, using all available`)
				targetBackgrounds = availableBackgrounds
			}
		} else {
			targetBackgrounds = availableBackgrounds
		}
		
		// Add valid combinations
		for (const background of targetBackgrounds) {
			const prompts = attireData[background]
			if (Array.isArray(prompts)) {
				const validPrompts = getValidPrompts(prompts)
				if (validPrompts.length > 0) {
					validCombinations.push({ attire, background, prompts: validPrompts })
				}
			}
		}
	}
	
	if (validCombinations.length === 0) {
		throw new Error('No valid attire-background combinations found')
	}
	
	console.log(`Found ${validCombinations.length} valid combinations`)
	
	const totalPromptsNeeded = planConfig.images
	
	// Distribute prompts across combinations
	const promptsPerCombination = Math.floor(totalPromptsNeeded / validCombinations.length)
	const remainder = totalPromptsNeeded % validCombinations.length
	
	const allSelectedPrompts: string[] = []
	
	validCombinations.forEach((combo, index) => {
		const numPromptsForThisCombination = promptsPerCombination + (index < remainder ? 1 : 0)
		const selectedFromCombination = selectWithRepetition(combo.prompts, numPromptsForThisCombination, undefined, preserveOrder)
		allSelectedPrompts.push(...selectedFromCombination)
		
		console.log(`Combination ${combo.attire}+${combo.background}: ${selectedFromCombination.length}/${combo.prompts.length} prompts`)
	})
	
	console.log(`Total prompts selected: ${allSelectedPrompts.length}`)
	return allSelectedPrompts
}

/**
 * Enhanced function to select prompts based on user selection and plan
 * Handles all possible data structures robustly with comprehensive error handling
 */
function selectPromptsForPlan(
	packPrompts: PackPrompts,
	userSelection: UserSelection
): string[] {
	try {
		// Input validation
		if (!packPrompts || typeof packPrompts !== 'object') {
			throw new Error('Invalid packPrompts: must be a valid object')
		}
		
		if (!userSelection || typeof userSelection !== 'object') {
			throw new Error('Invalid userSelection: must be a valid object')
		}
		
		const { gender, attire: selectedAttires, background: selectedBackgrounds, selectedPlan } = userSelection
		
		// Validate required fields
		if (!gender || typeof gender !== 'string') {
			throw new Error('Gender is required and must be a string')
		}
		
		if (!selectedPlan || typeof selectedPlan !== 'string') {
			throw new Error('Selected plan is required and must be a string')
		}
		
		// Get and validate plan configuration
		const planConfig = PLAN_CONFIG[selectedPlan as keyof typeof PLAN_CONFIG]
		if (!planConfig) {
			throw new Error(`Invalid plan: ${selectedPlan}. Available plans: ${Object.keys(PLAN_CONFIG).join(', ')}`)
		}
		
		// Get gender-specific prompts
		const genderPrompts = packPrompts[gender]
		if (!genderPrompts) {
			const availableGenders = Object.keys(packPrompts)
			throw new Error(`No prompts found for gender: ${gender}. Available genders: ${availableGenders.join(', ')}`)
		}
		
		console.log(`Processing prompts for gender: ${gender}, plan: ${selectedPlan}`)
		console.log(`Target: ${planConfig.images} images`)
		console.log(`Selected attires: ${selectedAttires?.length || 0}, backgrounds: ${selectedBackgrounds?.length || 0}`)
		
		const preserveOrder = userSelection.preserveOrder

		// Route to appropriate handler based on data structure
		if (Array.isArray(genderPrompts)) {
			// Direct array structure: {"gender": ["prompt1", "prompt2"]}
			return handleDirectArrayStructure(genderPrompts, planConfig.images, preserveOrder)
		}

		if (isRecordOfStringArray(genderPrompts)) {
			// Single-dimension key-value: {"gender": {"key1": ["prompt1"], "key2": ["prompt2"]}}
			return handleKeyValueStructure(
				genderPrompts,
				selectedAttires,
				selectedBackgrounds,
				planConfig.images,
				preserveOrder
			)
		}

		if (isComplexNestedStructure(genderPrompts)) {
			// Complex nested: {"gender": {"attire1": {"background1": ["prompt1"]}}}
			return handleComplexStructure(
				genderPrompts,
				selectedAttires,
				selectedBackgrounds,
				planConfig,
				preserveOrder
			)
		}
		
		// If none of the above structures match
		throw new Error(`Unsupported data structure for gender: ${gender}. Expected array, Record<string, string[]>, or nested Record structure.`)
		
	} catch (error) {
		console.error('Error in selectPromptsForPlan:', error)
		throw error
	}
}

// Type definitions (add these if not already present)
interface PackPrompts {
	[gender: string]: string[] | Record<string, string[]> | Record<string, Record<string, string[]>>
}

interface UserSelection {
	gender: string
	attire?: string[]
	background?: string[]
	selectedPlan: string
	preserveOrder?: boolean
}

export { selectPromptsForPlan, PLAN_CONFIG }