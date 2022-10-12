import React from 'react'

type EmptyStateProps = {
    color: 'primary' | 'gray',
    title: string,
    subtitle: string
    featuredIcon: JSX.Element

}

export function EmptyState({ color, title, subtitle, featuredIcon }: EmptyStateProps) {
  return (
    <div className='flex flex-col gap-6 items-center max-w-md'>
        {featuredIcon}
        <div className='flex flex-col gap-1 items-center text-center'>
            <h6 className='text-gray-900 font-semibold text-lg dark:text-white'>{title}</h6>
            <p className='text-gray-600 dark:text-dark-300'>{subtitle}</p>
        </div>
    </div>
  )
}
