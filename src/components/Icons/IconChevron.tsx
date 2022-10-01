import React from 'react'

import { IconProps } from '../../types/IconProps'

export const IconChevron = ({ size, fill, color, strokeWidth = 2, direction }: IconProps) => {
    switch (direction) {
        case 'right':
            return (
                <svg className={color} width={size}height={size} viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
    }
    // Return a chevron pointing right by default
    return (
        <svg className={color} width={size}height={size} viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}