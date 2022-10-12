import React from 'react'
import { IconProps } from '../../types/IconProps'

export const IconMenu = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21M3 6H21M9 18H21" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}