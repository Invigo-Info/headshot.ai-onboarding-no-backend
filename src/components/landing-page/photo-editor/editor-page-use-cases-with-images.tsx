"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

interface EditorPageUseCaseItem {
	title: string
	description: string
	beforeSrc: string
	afterSrc: string
	useCaseSlug: string
}

interface EditorPageUseCasesProps {
	title: string
	description: string
	useCases: EditorPageUseCaseItem[]
}

function EditorPageUseCasesWithImages ({
	title,
	description,
	useCases,
}: EditorPageUseCasesProps) {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const selected = useCases[selectedIndex]

	return (
		<section className='py-12 md:py-16 max-w-7xl mx-auto'>
			<div className='container mx-auto px-4'>
				<h2 className='text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-8'>
					{title}
				</h2>
				<p className='text-center text-gray-600 mb-10'>
					{description}
				</p>
				<div className='flex flex-wrap gap-3 items-center justify-center'>
					{useCases.map((usage, id) => {
						const isActive = id === selectedIndex
						return (
							<Button
								key={id}
								onClick={() => setSelectedIndex(id)}
								className={cn(
									"p-2 px-4 py-2 rounded-full text-sm transition-colors cursor-pointer",
									isActive ? 'bg-black text-white' : 'bg-black/10 hover:bg-gray-200 text-gray-800'
								)}
								aria-pressed={isActive}
							>
								{usage.useCaseSlug}
							</Button>
						)
					})}
				</div>
			</div>

			<div className='container mx-auto px-4 flex flex-col items-center justify-center text-center gap-4 w-full mt-8'>
				<div className='aspect-square max-w-2xl mx-auto rounded-xl overflow-hidden'>
					<ReactCompareSlider
						className='w-full h-full object-top'
						itemOne={
							<ReactCompareSliderImage
								src={selected.beforeSrc}
								alt='before'
								className='!object-top object-cover w-full h-full'
							/>
						}
						itemTwo={
							<ReactCompareSliderImage
								src={selected.afterSrc}
								alt='after'
								className='!object-top object-cover w-full h-full'
							/>
						}
					/>
				</div>
				<h3 className='text-2xl font-semibold'>{selected.title}</h3>
				<p className='text-gray-600 text-sm sm:text-base'>{selected.description}</p>
			</div>
		</section>
	)
}

export default EditorPageUseCasesWithImages
