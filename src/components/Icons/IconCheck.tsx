import React from 'react'
import { IconProps } from '../../types/IconProps'

export const IconCheck = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
