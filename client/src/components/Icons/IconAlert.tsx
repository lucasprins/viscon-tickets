import React from 'react'
import { IconProps } from '../../types/IconProps'

export const IconAlert = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill={"none"}>
            <path className={fill} opacity="0.12" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
            <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}
