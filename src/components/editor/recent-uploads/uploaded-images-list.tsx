import React from 'react'
import { RecentUpload } from '@/actions/editor-actions'
import UploadedImage from './uploaded-image'

interface UploadedImagesListProps {
    uploads: RecentUpload[]
}

const UploadedImagesList = ({uploads}: UploadedImagesListProps) => {

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {uploads.map((upload, index) => (
            <UploadedImage key={upload.id} upload={upload} allUploads={uploads} currentIndex={index} />
        ))}
    </div>
  )
}

export default UploadedImagesList