import React from 'react';

type FeaturedIconProps = {
    size: "xl" | "lg" | "md" | "sm",
    type: "primary" | "gray" | "error" | "success",
    icon: JSX.Element
}

export function FeaturedIcon({ size, type, icon }: FeaturedIconProps) {
    let featuredIconSize = "";
    let featuredIconType = "";

    switch (size) {
        case "xl":
            featuredIconSize = "p-3 border-8";
            break;
        case "lg":
            featuredIconSize = "p-2.5 border-8";
            break;
        case "md":
            featuredIconSize = "p-2 border-8";
            break;
        case "sm":
            featuredIconSize = "p-1.5 border-8";
            break;
    }

    switch (type) {
        case "primary":
            featuredIconType = "bg-primary-100 border-primary-50 dark:border-dark-700 dark:bg-dark-600";
            break;
        case "gray":
            featuredIconType = "bg-gray-100 border-gray-50 dark:border-dark-700 dark:bg-dark-600";
            break;
        case "error":
            featuredIconType = "bg-error-100 border-error-50 dark:border-dark-700 dark:bg-dark-600";
            break;
        case "success":
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
