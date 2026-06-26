import React from 'react'
import { RecentEdit } from '@/actions/editor-actions'
import EditedImage from './edited-image'

interface EditedImagesListProps {
    editedImages: RecentEdit[]
}

const EditedImagesList = ({editedImages}: EditedImagesListProps) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 relative">
        {editedImages.map((image, index) => (
            <EditedImage key={image.id} image={image} allImages={editedImages} currentIndex={index} />
        ))}
    </div>
  )
}

export default EditedImagesList