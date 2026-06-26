import React from 'react'

const LoaingOverlay = () => {
  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex flex-col gap-4 items-center justify-center'>
        <div className="animate-spin rounded-full size-16 border-4 border-t-0 border-b-0 border-blue-500"></div>
        <span className='text-gray-300'>please wait...</span>
    </div>
  )
}

export default LoaingOverlay