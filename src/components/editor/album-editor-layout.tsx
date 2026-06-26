'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ArrowLeft, ImageIcon, Wand2, Eraser, Crop, Type, ImageUpscale, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { 
	BackgroundChangerPanel, 
	BlemishRemoverPanel, 
	ImageExtenderPanel,
	MagicEraserPanel,
	GenericEditorPanel, 
	TextRemoverPanel,
	ImageUpscalePanel,
	UnblurImagePanel
} from '@/components/editor'

interface AlbumEditorLayoutProps {
	albumId: string
	imageSrc: string
	albumTitle: string
	userId: string
	width?: number
	height?: number
}

export function AlbumEditorLayout({ 
	albumId, 
	imageSrc, 
	userId,
	width,
	height
}: AlbumEditorLayoutProps) {
	const [activeTab, setActiveTab] = useState('background-changer')
	const [showMobilePanel, setShowMobilePanel] = useState(false)
	
	// Canvas and magic eraser state
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const imageRef = useRef<HTMLImageElement>(null)
	const [brushSize, setBrushSize] = useState(20)
	const [isDrawing, setIsDrawing] = useState(false)
	const [scaleRatio, setScaleRatio] = useState({ x: 1, y: 1 })

	const imageUrl = `/api/image/${imageSrc}?from=output-images`

	const editorTools = [
		{
			id: 'background-changer',
			name: 'Background Changer',
			icon: ImageIcon,
			description: 'Remove or replace backgrounds'
		},
		{
			id: 'blemish-remover',
			name: 'Blemish Remover',
			icon: Wand2,
			description: 'Remove blemishes and imperfections'
		},
		{
			id: 'magic-eraser',
			name: 'Magic Eraser',
			icon: Eraser,
			description: 'Remove unwanted objects'
		},
		{
			id: 'image-extender',
			name: 'Image Extender',
			icon: Crop,
			description: 'Extend image boundaries'
		},
		{
			id: 'text-remover',
			name: 'Text Remover',
			icon: Type,
			description: 'Remove text from images'
		},
		{
			id: 'image-upscaler',
			name: 'Image Upscaler',
			icon: ImageUpscale,
			description: 'Upscale images to a higher resolution'
		},
		{
			id: 'unblur-image',
			name: 'Unblur Image',
			icon: Search,
			description: 'Unblur images and restore details'
		}
	]

	// Canvas drawing functions for magic eraser
	const handleBrushSizeChange = (newSize: number[]) => {
		setBrushSize(newSize[0])
	}

	// Get actual image dimensions
	const getActualImageDimensions = async (imageUrl: string): Promise<{ width: number; height: number }> => {
		return new Promise((resolve) => {
			const img = document.createElement('img')
			img.onload = () => {
				resolve({ width: img.naturalWidth, height: img.naturalHeight })
			}
			img.src = imageUrl
		})
	}

	// Canvas drawing functions
	const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
		setIsDrawing(true)
		draw(e)  
	}

	const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!isDrawing) return

		const canvas = canvasRef.current
		const rect = canvas?.getBoundingClientRect()
		if (!canvas || !rect) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		// Get display coordinates
		const displayX = e.clientX - rect.left
		const displayY = e.clientY - rect.top

		// Convert to actual image coordinates
		const actualX = displayX * scaleRatio.x
		const actualY = displayY * scaleRatio.y

		// Set up the drawing context
		ctx.globalCompositeOperation = "source-over"
		ctx.fillStyle = "rgba(255, 255, 255, 0.6)" // Semi-transparent white for better visibility
		ctx.beginPath()
		ctx.arc(actualX, actualY, (brushSize / 2) * Math.min(scaleRatio.x, scaleRatio.y), 0, 2 * Math.PI)
		ctx.fill()
	}

	const stopDrawing = () => {
		setIsDrawing(false)
	}

	const clearCanvas = () => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		ctx.clearRect(0, 0, canvas.width, canvas.height)
	}

	// Clear canvas when switching away from magic eraser
	const handleTabChange = (newTab: string) => {
		if (activeTab === 'magic-eraser' && newTab !== 'magic-eraser') {
			// Use setTimeout to avoid clearing canvas immediately
			setTimeout(() => clearCanvas(), 100)
		}
		setActiveTab(newTab)
	}

	// Handle mobile tool selection
	const handleMobileToolSelect = (toolId: string) => {
		setActiveTab(toolId)
		setShowMobilePanel(true)
	}

	// Handle mobile back navigation
	const handleMobileBack = () => {
		setShowMobilePanel(false)
	}


	// Setup canvas when image loads or when magic eraser is selected
	useEffect(() => {
		if (activeTab !== 'magic-eraser') return

		const setupCanvas = async () => {
			const canvas = canvasRef.current
			const image = imageRef.current
			
			if (!canvas || !image) return

			// Get actual image dimensions
			const actualDimensions = await getActualImageDimensions(imageUrl)
			
			const resizeCanvas = () => {
				const container = image.parentElement
				if (!container) return

				const containerRect = container.getBoundingClientRect()

				const imageAspectRatio = actualDimensions.width / actualDimensions.height
				const containerAspectRatio = containerRect.width / containerRect.height

				let displayedWidth: number
				let displayedHeight: number

				if (imageAspectRatio > containerAspectRatio) {
					// Image is limited by width
					displayedWidth = containerRect.width
					displayedHeight = containerRect.width / imageAspectRatio
				} else {
					// Image is limited by height
					displayedHeight = containerRect.height
					displayedWidth = containerRect.height * imageAspectRatio
				}

				// Only update canvas if dimensions have changed (performance optimization)
				const needsResize = canvas.width !== actualDimensions.width || 
								  canvas.height !== actualDimensions.height ||
								  canvas.style.width !== `${displayedWidth}px` ||
								  canvas.style.height !== `${displayedHeight}px`

				if (needsResize) {
					// Set canvas to actual image dimensions
					canvas.width = actualDimensions.width
					canvas.height = actualDimensions.height

					// Set display size to match the contained image
					canvas.style.width = `${displayedWidth}px`
					canvas.style.height = `${displayedHeight}px`

					// Position the canvas over the image
					canvas.style.position = 'absolute'
					canvas.style.top = `${(containerRect.height - displayedHeight) / 2}px`
					canvas.style.left = `${(containerRect.width - displayedWidth) / 2}px`
					canvas.style.cursor = 'crosshair'
					canvas.style.borderRadius = '0.5rem'
					canvas.style.pointerEvents = 'auto'
				}

				// Calculate scale ratio for coordinate conversion
				const newScaleRatio = {
					x: actualDimensions.width / displayedWidth,
					y: actualDimensions.height / displayedHeight,
				}
				setScaleRatio(newScaleRatio)
			}

			// Use a timeout to ensure image is fully loaded
			const timeoutId = setTimeout(() => {
				if (image.complete && image.naturalWidth > 0) {
					resizeCanvas()
				} else {
					image.onload = resizeCanvas
				}
			}, 100)

			// Handle window resize with debouncing
			let resizeTimeout: NodeJS.Timeout
			const handleResize = () => {
				clearTimeout(resizeTimeout)
				resizeTimeout = setTimeout(resizeCanvas, 100)
			}

			window.addEventListener("resize", handleResize)

			return () => {
				clearTimeout(timeoutId)
				clearTimeout(resizeTimeout)
				window.removeEventListener("resize", handleResize)
			}
		}

		setupCanvas()
	}, [imageUrl, activeTab])

	const renderTabContent = (toolId: string) => {
		switch (toolId) {
			case 'background-changer':
				return <BackgroundChangerPanel currentImageUrl={imageUrl} />
			case 'blemish-remover':
				return <BlemishRemoverPanel currentImageUrl={imageUrl} />
			case 'magic-eraser':
				return (
					<MagicEraserPanel 
						currentImageUrl={imageUrl} 
						userId={userId}
						onBrushSizeChange={handleBrushSizeChange}
						canvasRef={canvasRef}
					/>
				)
			case 'image-extender':
				return <ImageExtenderPanel currentImageUrl={imageUrl}  />
			case 'text-remover':
				return <TextRemoverPanel currentImageUrl={imageUrl} />
			case 'image-upscaler':
				return <ImageUpscalePanel currentImageUrl={imageUrl} />
			case 'unblur-image':
				return <UnblurImagePanel currentImageUrl={imageUrl} />
			default:
				return <GenericEditorPanel editorTool={toolId} />
		}
	}

	return (
		<div className="flex flex-col max-h-screen relative w-full overflow-x-hidden">
			{/* Header - Mobile */}
			<div className="flex items-center justify-between p-4 absolute top-0 left-0 sm:left-2 lg:left-8 right-0 z-20 w-fit">
				<Button variant="outline" size="sm" asChild>
					<Link href={`/albums/${albumId}`} className="inline-flex items-center">
						<ArrowLeft className="w-4 h-4 mr-1" />
						Back
					</Link>
				</Button>
			</div>

			{/* Main Content Layout */}
			<div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 relative mt-16 lg:my-0">

				{/* Image Section */}
				<div className="flex-1 lg:col-span-6 2xl:col-span-7 flex items-center justify-center p-4  mb-4 lg:mb-0 lg:p-8">
					<div className="relative max-w-2xl w-full">
						<div className="relative w-full mx-auto max-w-lg lg:max-w-[30vw]" style={{aspectRatio: width && height ? width / height : 4 / 5}}>
							<Image
								ref={imageRef}
								src={imageUrl}
								alt="Image to edit"
								fill
								className="object-contain rounded-lg"
								priority
							/>
							{/* Canvas overlay for magic eraser */}
							{activeTab === 'magic-eraser' && (
								<canvas
									ref={canvasRef}
									className="absolute inset-0 cursor-crosshair rounded-lg"
									onMouseDown={startDrawing}
									onMouseMove={draw}
									onMouseUp={stopDrawing}
									onMouseLeave={stopDrawing}
									onTouchStart={(e) => {
										e.preventDefault()
										const touch = e.touches[0]
										const canvas = canvasRef.current
										const rect = canvas?.getBoundingClientRect()
										if (!canvas || !rect) return
										
										const syntheticEvent = {
											clientX: touch.clientX,
											clientY: touch.clientY,
											preventDefault: () => {},
											stopPropagation: () => {}
										} as React.MouseEvent<HTMLCanvasElement>
										
										setIsDrawing(true)
										draw(syntheticEvent)
									}}
									onTouchMove={(e) => {
										e.preventDefault()
										const touch = e.touches[0]
										
										const syntheticEvent = {
											clientX: touch.clientX,
											clientY: touch.clientY,
											preventDefault: () => {},
											stopPropagation: () => {}
										} as React.MouseEvent<HTMLCanvasElement>
										
										draw(syntheticEvent)
									}}
									onTouchEnd={(e) => {
										e.preventDefault()
										stopDrawing()
									}}
									style={{
										backgroundColor: "transparent",
										touchAction: "none",
										pointerEvents: "auto",
									}}
								/>
							)}
						</div>
					</div>
				</div>

				{/* Right Panel - Desktop / Bottom Panel - Mobile */}
				<div className="lg:col-span-6 2xl:col-span-5 bg-white lg:border-l flex flex-col lg:flex-row ">
					{/* Mobile: Tool Pills at Bottom */}
					<div className="lg:hidden">
						{!showMobilePanel ? (
							/* Tools Pills */
							<div className="p-4">
								<div className="grid grid-cols-2 gap-3">
									{editorTools.map((tool) => {
										const Icon = tool.icon
										return (
											<button
												key={tool.id}
												onClick={() => handleMobileToolSelect(tool.id)}
												className="flex flex-col items-start gap-3 p-4 rounded-xl hover:bg-gray-100 transition-colors text-left border border-gray-300"
											>
												<Icon className="size-6" strokeWidth={1.5}/>
												<span className="text-sm xs:text-base font-medium text-gray-900">
													{tool.name}
												</span>
											</button>
										)
									})}
								</div>
							</div>
						) : (
							/* Mobile Panel Content */
							<div className="">
								{/* Panel Header */}
									<div className="flex items-center gap-3 mb-4">
										<Button variant="outline" size="sm" onClick={handleMobileBack}>
											<ArrowLeft className="w-4 h-4 mr-1" />
											Back to tools
										</Button>
									</div>

								{/* Panel Content */}
								<div className="bg-white">
									<ScrollArea className="max-h-96">
										<div className="p-0">
											{renderTabContent(activeTab)}
										</div>
										<ScrollBar orientation="vertical" />
									</ScrollArea>
								</div>
							</div>
						)}
					</div>

					{/* Desktop: Left Sidebar - Tool Selector */}
					<div className="hidden lg:block w-32 border-r h-screen overflow-y-scroll no-scrollbar pb-8">
						<div className="p-0">
							{editorTools.map((tool) => {
								const Icon = tool.icon
								const isActive = activeTab === tool.id
								return (
									<button
										key={tool.id}
										onClick={() => handleTabChange(tool.id)}
										className={`w-full cursor-pointer h-32 flex flex-col items-center justify-center gap-2 p-3 transition-colors ${
											isActive 
												? 'bg-blue-100 text-blue-600 border-2 border-blue-200' 
												: 'bg-white hover:bg-gray-100 border-b border-gray-200'
										}`}
									>
										<div className={`p-2 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
											<Icon className="w-6 h-6" />
										</div>
										<span className="text-sm font-medium text-center leading-tight">
											{tool.name}
										</span>
									</button>
								)
							})}
						</div>
					</div>

					{/* Desktop: Right Content Area */}
					<div className="hidden lg:block flex-1">
						<ScrollArea className="max-h-screen h-full">
							<div className="p-0">
								{renderTabContent(activeTab)}
							</div>
							<ScrollBar orientation="vertical" />
						</ScrollArea>
					</div>
				</div>
			</div>
		</div>
	)
} 