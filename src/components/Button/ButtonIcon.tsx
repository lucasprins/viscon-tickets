import React from 'react'

type ButtonOnlyIconProps = {
    icon: JSX.Element
    onclick: () => any
}

export const ButtonIcon = ({ icon, onclick }: ButtonOnlyIconProps) => {
    return (
        <button onClick={onclick} className='flex h-min items-center justify-center p-2 dark:hover:bg-dark-600 hover:bg-gray-100 rounded-md'>
            {icon}
        </button>
    )
}
