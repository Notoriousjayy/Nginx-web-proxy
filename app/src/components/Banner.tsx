import React from 'react'

interface BannerProps {
  message: string
}

export function Banner({ message }: BannerProps) {
  return (
    <div className="bg-blue-600 text-white py-3 px-4 text-center">
      {message}
    </div>
  )
}
