'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

interface EditorLayoutProps {
	editorTool: string
	imageSrc?: string
	children: ReactNode
	width?: number
	height?: number
}

export function EditorLayout({ editorTool, imageSrc = '/placeholder.svg', children, width, height }: EditorLayoutProps) {

	return (
		<div className="flex flex-col">
			{/* Main Content */}
			<div className="flex-1 flex flex-col lg:flex-row relative w-full">
			<Button variant="outline" className="absolute top-8 left-0 lg:left-8 z-10" asChild>
			<Link href={`/editor/${editorTool}`} className="inline-flex items-center">
						<ArrowLeft className="w-4 h-4 mr-1" />
						Back
					</Link>
			</Button>
				{/* Image Section */}
				<div className="flex-1 flex items-center justify-center pt-24 pb-8 lg:p-8">
					<div className="relative max-w-2xl w-full">
						<div className="relative w-full mx-auto max-w-lg" style={{aspectRatio: width && height ? width / height : 4 / 3}}>
							<Image
								src={imageSrc}
								alt="Image to edit"
								fill
								className="object-contain rounded-lg"
								priority
							/>
						</div>
					</div>
				</div>

				{/* Right Panel */}
				<ScrollArea className="max-h-full lg:max-h-screen h-full">
					<div className="max-w-full lg:max-w-sm bg-white lg:border-l">
					{children}
					</div>
					<ScrollBar orientation="vertical" />
				</ScrollArea>
			</div>
		</div>
	)
} 