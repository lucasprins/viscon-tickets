import React from 'react'

export const MetricCard = ({ content, title }: { content: any, title: string }) => {
  return (
    <div className='flex flex-col w-full gap-1 p-6 bg-white border border-gray-200 rounded-xl dark:border-dark-600 dark:bg-dark-700 drop-shadow-sm'>
        <span className='text-sm font-medium text-gray-600 dark:text-dark-300'>{title}</span>
        <h4 className='font-semibold text-gray-900 dark:text-white text-display_md'>{content}</h4>
    </div>
  )
}
