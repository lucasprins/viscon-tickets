import React from 'react'

type PageHeaderProps = {
  title: string,
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className=' flex-row w-full'>
      <h1 className=' text-display_sm font-semibold drop-shadow-lg text-gray-800 dark:text-dark-400 mb-1'>{title}</h1>
      <p className=' text-md text-gray-600 dark:text-dark-300'>{subtitle}</p>
    </div>
  )
}
