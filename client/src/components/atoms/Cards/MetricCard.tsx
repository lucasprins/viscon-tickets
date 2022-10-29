import React from 'react'

export const MetricCard = ({ number, title }: { number: string, title: string }) => {
  return (
    <div className='flex flex-col gap-2 p-6 w-full rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 drop-shadow-sm'>
        <span className='text-gray-600 dark:text-dark-300 text-sm font-medium'>{title}</span>
        <h4 className='text-gray-900 dark:text-white text-display_md font-semibold'>{number}</h4>
    </div>
  )
}
