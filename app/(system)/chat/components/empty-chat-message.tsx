import React from 'react'

const EmptyChatMessage = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-2 p-6 text-center text-gray-500">
      <img src="/llm_sparkles.svg" alt="Doctor Reborn Logo" className="w-16" />
      <h2 className="text-primary mb-2 text-xl font-medium">{title}</h2>
      <p className="max-w-md">{description}</p>
    </div>
  )
}

export default EmptyChatMessage
