'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Upload } from 'lucide-react'

interface GenericEditorPanelProps {
	editorTool: string
	onSettingChange?: (setting: string, value: string | number | boolean) => void
}

function getToolDisplayName(tool: string): string {
	const toolNames: { [key: string]: string } = {
		'blemish-remover': 'Blemish Remover',
		'magic-eraser': 'Magic Eraser',
		'image-extender': 'Image Extender',
		'text-remover': 'Text Remover',
		'unblur-image': 'Unblur Image',
		'photo-restoration': 'Photo Restoration',
		'color-correction': 'Color Correction',
		'image-upscaler': 'Image Upscaler',
		'photo-enhancer': 'Photo Enhancer',
	}
	return toolNames[tool] || tool
}

function getToolDescription(tool: string): string {
	const descriptions: { [key: string]: string } = {
		'blemish-remover': 'Remove all kinds of blemishes: pimples, acne scars, dark spots, and more!',
		'magic-eraser': 'Remove specific objects, people, and text from your photos.',
		'image-extender': 'Extend and expand the background edges of your photos.',
		'text-remover': 'Remove text from your images.',
		'unblur-image': 'Fix blurry photos and enhance overall image quality.',
		'photo-restoration': 'Repair old photos by fixing damages and improving color quality.',
		'color-correction': 'Fix image saturation, contrast, and exposure.',
		'image-upscaler': 'Enhance the quality and increase the resolution of your images.',
		'photo-enhancer': 'Improve the overall quality and sharpness of your photos.',
	}
	return descriptions[tool] || 'Edit and enhance your image with AI-powered tools.'
}

function getToolIcon(tool: string): string {
	const icons: { [key: string]: string } = {
		'blemish-remover': '✨',
		'magic-eraser': '🪄',
		'image-extender': '🔄',
		'text-remover': '📝',
		'unblur-image': '🔍',
		'photo-restoration': '🖼️',
		'color-correction': '🌈',
		'image-upscaler': '📐',
		'photo-enhancer': '✨',
	}
	return icons[tool] || '🔧'
}

export function GenericEditorPanel({ editorTool, onSettingChange }: GenericEditorPanelProps) {
	const toolName = getToolDisplayName(editorTool)
	const description = getToolDescription(editorTool)
	const icon = getToolIcon(editorTool)

	return (
		<div className="p-4">
			{/* Header */}
			<div className="flex items-center mb-4">
				<div className="w-6 h-6 mr-3 text-lg flex items-center justify-center">
					{icon}
				</div>
				<h2 className="text-lg font-semibold">{toolName}</h2>
			</div>

			<p className="text-sm text-gray-600 mb-6">
				{description}
			</p>

			{/* Upload Area */}
			<Card className="mb-6">
				<CardContent className="p-4">
					<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
						<Button className="bg-blue-600 hover:bg-blue-700 text-white mb-2" size="sm">
							<Upload className="w-4 h-4 mr-2" />
							Upload a picture
						</Button>
						<p className="text-xs text-gray-500">
							or <span className="text-blue-600">drag and drop</span> your photo
						</p>
						<p className="text-xs text-gray-400">
							PNG, JPG, HEIC, WEBP up to 120MB
						</p>
					</div>
				</CardContent>
			</Card>

			{/* Tool-specific options */}
			{editorTool === 'blemish-remover' && (
				<div className="space-y-6">
					<div>
						<label className="text-sm font-medium mb-2 block">Intensity</label>
						<Slider
							defaultValue={[50]}
							max={100}
							step={1}
							onValueChange={(value) => onSettingChange?.('intensity', value[0])}
							className="mb-2"
						/>
						<div className="flex justify-between text-xs text-gray-500">
							<span>Subtle</span>
							<span>Strong</span>
						</div>
					</div>
				</div>
			)}

			{editorTool === 'color-correction' && (
				<div className="space-y-6">
					<div>
						<label className="text-sm font-medium mb-2 block">Brightness</label>
						<Slider
							defaultValue={[0]}
							min={-100}
							max={100}
							step={1}
							onValueChange={(value) => onSettingChange?.('brightness', value[0])}
							className="mb-2"
						/>
					</div>
					<div>
						<label className="text-sm font-medium mb-2 block">Contrast</label>
						<Slider
							defaultValue={[0]}
							min={-100}
							max={100}
							step={1}
							onValueChange={(value) => onSettingChange?.('contrast', value[0])}
							className="mb-2"
						/>
					</div>
					<div>
						<label className="text-sm font-medium mb-2 block">Saturation</label>
						<Slider
							defaultValue={[0]}
							min={-100}
							max={100}
							step={1}
							onValueChange={(value) => onSettingChange?.('saturation', value[0])}
							className="mb-2"
						/>
					</div>
				</div>
			)}

			{editorTool === 'image-upscaler' && (
				<div className="space-y-6">
					<div>
						<label className="text-sm font-medium mb-2 block">Scale Factor</label>
						<div className="grid grid-cols-2 gap-2">
							<Button variant="outline" size="sm">2x</Button>
							<Button variant="outline" size="sm">4x</Button>
							<Button variant="outline" size="sm">6x</Button>
							<Button variant="outline" size="sm">8x</Button>
						</div>
					</div>
				</div>
			)}

			{/* Auto-enhance option for most tools */}
			{!['background-changer', 'magic-eraser'].includes(editorTool) && (
				<div className="mt-6">
					<label className="flex items-center space-x-3">
						<input
							type="checkbox"
							className="form-checkbox"
							onChange={(e) => onSettingChange?.('autoEnhance', e.target.checked)}
						/>
						<span className="text-sm">Auto-enhance after processing</span>
					</label>
				</div>
			)}

			{/* Processing instructions */}
			<div className="mt-8">
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
					<h3 className="text-sm font-semibold text-blue-900 mb-2">How to use:</h3>
					<ol className="text-xs text-blue-800 space-y-1">
						{editorTool === 'blemish-remover' && (
							<>
								<li>1. Click on blemishes you want to remove</li>
								<li>2. Adjust intensity if needed</li>
								<li>3. Preview and download your result</li>
							</>
						)}
						{editorTool === 'magic-eraser' && (
							<>
								<li>1. Click and drag to select objects to remove</li>
								<li>2. AI will automatically fill the background</li>
								<li>3. Preview and download your result</li>
							</>
						)}
						{!['blemish-remover', 'magic-eraser'].includes(editorTool) && (
							<>
								<li>1. Adjust settings as needed</li>
								<li>2. Click process to apply changes</li>
								<li>3. Preview and download your result</li>
							</>
						)}
					</ol>
				</div>
			</div>
		</div>
	)
} 