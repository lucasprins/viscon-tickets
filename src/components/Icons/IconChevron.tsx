import React from 'react'

import { IconProps } from '../../types/IconProps'

export const IconChevron = ({ size, fill, color, strokeWidth = 2, direction }: IconProps) => {
    switch (direction) {
        case 'down':
            return (
                <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'up':
            return (
                <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <path d="M18 15L12 9L6 15" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
    }
    // Return a chevron pointing right by default
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}