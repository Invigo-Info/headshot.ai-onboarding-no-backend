"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

interface Pack {
	id: string
	slug: string
	title: string
	attire: Record<string, { name: string; vaule: string }[]> | null
	background: { name: string; vaule: string }[] | null
}

interface PromptResult {
	index: number
	basePrompt: string
	finalPrompt: string
	hasGlasses: boolean
}

interface ApiResponse {
	prompts: PromptResult[]
	meta: {
		total: number
		pack: string
		gender: string
		plan: string
	}
}

const PLANS = [
	{ label: "Starter (40)", value: "starter" },
	{ label: "Basic (100)", value: "basic" },
	{ label: "Premium (150)", value: "premium" },
]

const AGE_GROUPS = ["18-20", "21-24", "25-29", "30-40", "41-50", "51-65", "65+"]

const HAIR_LENGTHS_MALE = ["bald", "short", "medium", "long"]
const HAIR_LENGTHS_FEMALE = ["bald", "short", "medium", "long", "very-long"]

const HAIR_TYPES = ["curly", "dreadlocks", "straight", "wavy"]
const HAIR_COLORS = ["brown", "black", "blonde", "gray", "auburn", "red", "white"]

const BODY_TYPES_MALE = ["slim", "athletic", "average", "muscular", "heavy"]
const BODY_TYPES_FEMALE = ["slim", "athletic", "average", "curvy", "plus-size"]

const GLASSES_OPTIONS = [
	{ label: "With Glasses", value: "with-glasses" },
	{ label: "Without Glasses", value: "without-glasses" },
	{ label: "Mix", value: "mix" },
]

export function CheckPromptsClient({ packs }: { packs: Pack[] }) {
	const [selectedPack, setSelectedPack] = useState<Pack | null>(null)
	const [gender, setGender] = useState("")
	const [plan, setPlan] = useState("")
	const [selectedAttires, setSelectedAttires] = useState<string[]>([])
	const [selectedBackgrounds, setSelectedBackgrounds] = useState<string[]>([])
	const [ageGroup, setAgeGroup] = useState("")
	const [hairLength, setHairLength] = useState("")
	const [hairType, setHairType] = useState("")
	const [hairColor, setHairColor] = useState("")
	const [bodyType, setBodyType] = useState("")
	const [glassesPreference, setGlassesPreference] = useState("")
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState<ApiResponse | null>(null)
	const [error, setError] = useState("")

	const handlePackChange = (slug: string) => {
		const pack = packs.find((p) => p.slug === slug) ?? null
		setSelectedPack(pack)
		setSelectedAttires([])
		setSelectedBackgrounds([])
		setResult(null)
	}

	const handleGenderChange = (value: string) => {
		setGender(value)
		setSelectedAttires([])
		setHairLength("")
		setHairType("")
		setHairColor("")
		setBodyType("")
		setResult(null)
	}

	const toggleAttire = (value: string) => {
		setSelectedAttires((prev) =>
			prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
		)
	}

	const toggleBackground = (value: string) => {
		setSelectedBackgrounds((prev) =>
			prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
		)
	}

	const attireOptions =
		selectedPack?.attire && gender
			? (selectedPack.attire[gender] ?? null)
			: null

	const backgroundOptions = selectedPack?.background ?? null

	const hairLengths = gender === "woman" ? HAIR_LENGTHS_FEMALE : HAIR_LENGTHS_MALE
	const bodyTypes = gender === "woman" ? BODY_TYPES_FEMALE : BODY_TYPES_MALE
	const isBald = hairLength === "bald"

	const handleSubmit = async () => {
		if (!selectedPack || !gender || !plan) return

		setLoading(true)
		setError("")
		setResult(null)

		try {
			const res = await fetch("/api/check-prompts", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					packSlug: selectedPack.slug,
					gender,
					selectedPlan: plan,
					attire: selectedAttires.length > 0 ? selectedAttires : undefined,
					background:
						selectedBackgrounds.length > 0 ? selectedBackgrounds : undefined,
					ageGroup: ageGroup || undefined,
					hairLength: hairLength || undefined,
					hairType: !isBald && hairType ? hairType : undefined,
					hairColor: !isBald && hairColor ? hairColor : undefined,
					bodyType: bodyType || undefined,
					glassesPreference: glassesPreference || undefined,
				}),
			})

			if (!res.ok) {
				const data = await res.json()
				throw new Error(data.error || `HTTP ${res.status}`)
			}

			const data: ApiResponse = await res.json()
			setResult(data)
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="max-w-7xl mx-auto p-6 space-y-6">
			<div>
				<h1 className="text-2xl font-semibold">Check Prompts</h1>
				<p className="text-sm text-muted-foreground mt-1">
					Preview AI prompts for different pack/plan/attire/background
					combinations
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Configuration</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Row 1: Pack, Gender, Plan */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label>Pack</Label>
							<Select onValueChange={handlePackChange}>
								<SelectTrigger>
									<SelectValue placeholder="Select a pack" />
								</SelectTrigger>
								<SelectContent>
									{packs.map((p) => (
										<SelectItem key={p.id} value={p.slug}>
											{p.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label>Gender</Label>
							<Select onValueChange={handleGenderChange}>
								<SelectTrigger>
									<SelectValue placeholder="Select gender" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="man">Man</SelectItem>
									<SelectItem value="woman">Woman</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label>Plan</Label>
							<Select onValueChange={(v) => { setPlan(v); setResult(null) }}>
								<SelectTrigger>
									<SelectValue placeholder="Select plan" />
								</SelectTrigger>
								<SelectContent>
									{PLANS.map((p) => (
										<SelectItem key={p.value} value={p.value}>
											{p.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Attire checkboxes */}
					{attireOptions && attireOptions.length > 0 && (
						<div className="space-y-2">
							<Label>Attire</Label>
							<div className="flex flex-wrap gap-4">
								{attireOptions.map((opt) => (
									<label
										key={opt.vaule}
										className="flex items-center gap-2 text-sm"
									>
										<Checkbox
											checked={selectedAttires.includes(opt.vaule)}
											onCheckedChange={() => toggleAttire(opt.vaule)}
										/>
										{opt.name}
									</label>
								))}
							</div>
						</div>
					)}

					{/* Background checkboxes */}
					{backgroundOptions && backgroundOptions.length > 0 && (
						<div className="space-y-2">
							<Label>Background</Label>
							<div className="flex flex-wrap gap-4">
								{backgroundOptions.map((opt) => (
									<label
										key={opt.vaule}
										className="flex items-center gap-2 text-sm"
									>
										<Checkbox
											checked={selectedBackgrounds.includes(opt.vaule)}
											onCheckedChange={() => toggleBackground(opt.vaule)}
										/>
										{opt.name}
									</label>
								))}
							</div>
						</div>
					)}

					{/* Descriptor fields */}
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
						<div className="space-y-2">
							<Label>Age Group</Label>
							<Select onValueChange={setAgeGroup}>
								<SelectTrigger>
									<SelectValue placeholder="Any" />
								</SelectTrigger>
								<SelectContent>
									{AGE_GROUPS.map((a) => (
										<SelectItem key={a} value={a}>
											{a}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label>Hair Length</Label>
							<Select
								onValueChange={(v) => {
									setHairLength(v)
									if (v === "bald") {
										setHairType("")
										setHairColor("")
									}
								}}
							>
								<SelectTrigger>
									<SelectValue placeholder="Any" />
								</SelectTrigger>
								<SelectContent>
									{hairLengths.map((h) => (
										<SelectItem key={h} value={h}>
											{h}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{!isBald && (
							<div className="space-y-2">
								<Label>Hair Type</Label>
								<Select onValueChange={setHairType}>
									<SelectTrigger>
										<SelectValue placeholder="Any" />
									</SelectTrigger>
									<SelectContent>
										{HAIR_TYPES.map((h) => (
											<SelectItem key={h} value={h}>
												{h}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}

						{!isBald && (
							<div className="space-y-2">
								<Label>Hair Color</Label>
								<Select onValueChange={setHairColor}>
									<SelectTrigger>
										<SelectValue placeholder="Any" />
									</SelectTrigger>
									<SelectContent>
										{HAIR_COLORS.map((h) => (
											<SelectItem key={h} value={h}>
												{h}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}

						<div className="space-y-2">
							<Label>Body Type</Label>
							<Select onValueChange={setBodyType}>
								<SelectTrigger>
									<SelectValue placeholder="Any" />
								</SelectTrigger>
								<SelectContent>
									{bodyTypes.map((b) => (
										<SelectItem key={b} value={b}>
											{b}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label>Glasses</Label>
							<Select onValueChange={setGlassesPreference}>
								<SelectTrigger>
									<SelectValue placeholder="Any" />
								</SelectTrigger>
								<SelectContent>
									{GLASSES_OPTIONS.map((g) => (
										<SelectItem key={g.value} value={g.value}>
											{g.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					<Button
						onClick={handleSubmit}
						disabled={!selectedPack || !gender || !plan || loading}
						className="cursor-pointer"
					>
						{loading ? "Loading..." : "Check Prompts"}
					</Button>
				</CardContent>
			</Card>

			{error && (
				<Card className="border-destructive">
					<CardContent className="pt-6">
						<p className="text-destructive text-sm">{error}</p>
					</CardContent>
				</Card>
			)}

			{result && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							<span>Results</span>
							<span className="text-sm font-normal text-muted-foreground">
								{result.meta.pack} &middot; {result.meta.gender} &middot;{" "}
								{result.meta.plan} &middot; {result.meta.total} prompts
							</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="rounded-md border overflow-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-12">#</TableHead>
										<TableHead>Base Prompt</TableHead>
										<TableHead>Final Prompt</TableHead>
										<TableHead className="w-24">Glasses</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{result.prompts.map((p) => (
										<TableRow key={p.index}>
											<TableCell className="font-mono text-sm">
												{p.index}
											</TableCell>
											<TableCell className="whitespace-normal break-words text-sm max-w-md">
												{p.basePrompt}
											</TableCell>
											<TableCell className="whitespace-normal break-words text-sm max-w-md">
												{p.finalPrompt}
											</TableCell>
											<TableCell>
												<Badge
													variant={p.hasGlasses ? "default" : "secondary"}
												>
													{p.hasGlasses ? "Yes" : "No"}
												</Badge>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
