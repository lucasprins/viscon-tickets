import React from 'react'

type AvatarCardsProps = {
    title: string,
    subtitle: string,
    style: "flag" | "initials",
    flag?: JSX.Element
}

export function AvatarCard({ title, subtitle, style, flag }: AvatarCardsProps) {
  return (
    <div className='flex gap-4 p-4'>
        <div>
            {/* Flag or Initials */}
        </div>
        <div className='flex flex-col'>
            <h5 className='text-gray-700 text-lg font-semibold'>{title}</h5>
            <span className='text-md text-gray-600'>{subtitle}</span>
        </div>
    </div>
  )
}
