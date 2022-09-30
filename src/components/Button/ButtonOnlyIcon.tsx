import React from 'react'

type ButtonOnlyIconProps = {
    icon: JSX.Element
}

export const ButtonOnlyIcon = ({ icon }: ButtonOnlyIconProps) => {
    return (
        <button className='flex h-min items-center justify-center p-2 hover:bg-gray-100 rounded-md'>
            {icon}
        </button>
    )
}
