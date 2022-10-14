import React from "react";

type BadgeProps = {
    size: "sm" | "md" | "lg";
    color: "gray" | "primary" | "error" | "success";
    icon?: JSX.Element;
    text: string;
};

export function Badge({ size, color, icon, text }: BadgeProps) {
    let badgeSizeStyle = "";
    let badgeColorStyle = "";

    switch (size) {
        case "sm":
            badgeSizeStyle = "py-0.5 pl-1.5 pr-2 text-xs";
            break;
        case "md":
            badgeSizeStyle = "py-0.5 pl-2 pr-2.5 text-sm";
            break;
        case "lg":
            badgeSizeStyle = "py-1 pl-2.5 pr-3 text-sm";
            break;
    }

    switch (color) {
        case "gray":
            badgeColorStyle = "text-gray-700 bg-gray-100 dark:bg-gray-400 dark:bg-opacity-10 dark:text-gray-300";
            break;
        case "primary":
            badgeColorStyle = "text-primary-500 bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10";
            break;
        case "error":
            badgeColorStyle = "text-error-500 bg-error-50 dark:bg-error-400 dark:text-error-400 dark:bg-opacity-10";
            break;
        case "success":
            badgeColorStyle = "text-success-500 bg-success-50 dark:bg-success-400 dark:bg-opacity-10";
            break;
    }

    return (
        <div className={`${badgeSizeStyle} ${badgeColorStyle} flex rounded-full font-medium items-center gap-1`}>
            {icon}
            <span>{text}</span>
        </div>
    );
}
