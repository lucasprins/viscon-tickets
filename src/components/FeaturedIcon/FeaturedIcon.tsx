import React from 'react'

export enum FeaturedIconSize {
    SM,
    MD,
    LG,
    XL
}

export enum FeaturedIconType {
    PRIMARY,
    GRAY,
    ERROR,
    SUCCESS
}

type FeaturedIconProps = {
    size: FeaturedIconSize,
    type: FeaturedIconType,
    icon: JSX.Element
}

export function FeaturedIcon({ size, type, icon }: FeaturedIconProps) {
    let featuredIconSize = "";
    let featuredIconType = "";

    switch (size) {
        case FeaturedIconSize.XL:
            featuredIconSize = "p-3 border-8";
            break;
        case FeaturedIconSize.LG:
            featuredIconSize = "p-2.5 border-8";
            break;
        case FeaturedIconSize.MD:
            featuredIconSize = "p-2 border-8";
            break;
        case FeaturedIconSize.SM:
            featuredIconSize = "p-1.5 border-8";
            break;
    }

    switch (type) {
        case FeaturedIconType.PRIMARY:
            featuredIconType = "bg-primary-100 border-primary-50 dark:border-dark-700 dark:bg-dark-600";
            break;
        case FeaturedIconType.GRAY:
            featuredIconType = "bg-gray-100 border-gray-50 dark:border-dark-700 dark:bg-dark-600";
            break;
        case FeaturedIconType.ERROR:
            featuredIconType = "bg-error-100 border-error-50 dark:border-dark-700 dark:bg-dark-600";
            break;
        case FeaturedIconType.SUCCESS:
            featuredIconType = "bg-success-100 border-success-50 dark:border-dark-700 dark:bg-dark-600";
            break;
    };

    return (
        <div className={`${featuredIconSize} ${featuredIconType}
            flex items-center justify-center rounded-full box-border`}>
            {icon}
        </div>
    )
}
