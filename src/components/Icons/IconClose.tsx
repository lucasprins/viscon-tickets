import React from 'react'
import { IconProps } from '../../types/IconProps'

export const IconClose = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
