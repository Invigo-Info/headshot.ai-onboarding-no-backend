 'use client'

 import React, { useCallback, useMemo, useState } from 'react'
 import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
 import { ArrowLeftRightIcon, ImageIcon, PaintbrushIcon, ScanFaceIcon, SearchIcon, TrendingUpIcon, TypeIcon, Wand2Icon, WrenchIcon, ZapIcon } from 'lucide-react'

 interface EditorTool {
 	label: string
 	icon: React.ReactNode
 	beforeSrc: string
 	afterSrc: string
 }

 function PhotoEditorComparePanel () {
 	const tools: EditorTool[] = useMemo(() => [
 		{
 			label: 'Background Changer',
 			icon: <ImageIcon className='size-4' />,
 			beforeSrc: '/assets/editor-page/background-changer/1b.webp',
 			afterSrc: '/assets/editor-page/background-changer/1a.jpg',
 		},
 		{
 			label: 'Blemish Remover',
 			icon: <ZapIcon className='size-4' />,
 			beforeSrc: '/assets/editor-page/blemish-remover/1b.webp',
 			afterSrc: '/assets/editor-page/blemish-remover/1a.jpg',
 		},
 		{
 			label: 'Magic Eraser',
 			icon: <Wand2Icon className='size-4' />,
 			beforeSrc: '/assets/editor-page/magic-eraser/1b.webp',
 			afterSrc: '/assets/editor-page/magic-eraser/1a.jpg',
 		},
 		{
 			label: 'Image Extender',
 			icon: <ArrowLeftRightIcon className='size-4' />,
 			beforeSrc: '/assets/editor-page/image-extender/1a.jpg',
 			afterSrc: '/assets/editor-page/image-extender/1b.webp',
 		},
 		{
 			label: 'Image Upscaler',
 			icon: <TrendingUpIcon className='size-4' />,
 			beforeSrc: '/assets/editor-page/image-upscaler/1a.jpg',
 			afterSrc: '/assets/editor-page/image-upscaler/1b.webp',
 		},
 		{
 			label: 'Text Remover',
 			icon: <TypeIcon className='size-4' />,
 			beforeSrc: '/assets/editor-page/text-remover/1b.webp',
 			afterSrc: '/assets/editor-page/text-remover/1a.jpg',
 		},
		{
			label: 'Face Restorer',
			icon: <ScanFaceIcon className='size-4' />,
			beforeSrc: '/assets/editor-page/face-restorer/1b.webp',
			afterSrc: '/assets/editor-page/face-restorer/1a.png',
		},
 		{
 			label: 'Unblur Image',
 			icon: <SearchIcon className='size-4' />,
 			beforeSrc: '/assets/editor-page/unblur-image/1b.png',
 			afterSrc: '/assets/editor-page/unblur-image/1a.webp',
 		},
 		{
 			label: 'Photo Restoration',
 			icon: <WrenchIcon className='size-4' />,
 			beforeSrc: '/assets/editor-page/photo-restoration/1b.webp',
 			afterSrc: '/assets/editor-page/photo-restoration/1a.jpg',
 		},
 		{
 			label: 'Color Correction',
 			icon: <PaintbrushIcon className='size-4' />,
 			beforeSrc: '/assets/editor-page/color-correction/1b.jpg',
 			afterSrc: '/assets/editor-page/color-correction/1a.webp',
 		},
 	], [])

 	const [activeIndex, setActiveIndex] = useState<number>(0)

 	const activeTool = tools[activeIndex]

 	const handleSelect = useCallback((index: number) => {
 		setActiveIndex(index)
 	}, [])

 	return (
 		<div className='w-full lg:w-1/2 lg:max-h-[90vh] aspect-[4/5] relative flex flex-col items-start sm:items-center justify-center'>
 			<ReactCompareSlider
 				className='w-full h-full object-top'
 				itemOne={
 					<ReactCompareSliderImage
 						src={activeTool.beforeSrc}
 						alt='before'
 						className='!object-top object-cover w-full h-full'
 					/>
 				}
 				itemTwo={
 					<ReactCompareSliderImage
 						src={activeTool.afterSrc}
 						alt='after'
 						className='!object-top object-cover w-full h-full'
 					/>
 				}
 			/>
 			<article className='absolute bottom-4 left-4 right-4 flex'>
 				<div className='w-full flex items-center justify-start gap-4 overflow-x-auto bg-gray-100/80 backdrop-blur-sm rounded-xl p-4 no-scrollbar'>
 					{tools.map((tool, index) => {
 						const isActive = index === activeIndex
 						return (
 							<button
 								key={tool.label}
 								type='button'
 								aria-pressed={isActive}
 								onClick={() => handleSelect(index)}
 								className={
 									`flex text-sm font-medium items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full transition-colors ` +
 									(isActive
 										? 'bg-blue-500 text-white'
 										: 'bg-[#636363] text-white hover:bg-[#4f4f4f] cursor-pointer')
 								}
 							>
 								{tool.icon}
 								{tool.label}
 							</button>
 						)
 					})}
 				</div>
 			</article>
 		</div>
 	)
 }

 export default PhotoEditorComparePanel


