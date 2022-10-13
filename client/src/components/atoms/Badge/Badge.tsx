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
            badgeColorStyle = "text-gray-700 bg-gray-100";
            break;
        case "primary":
            badgeColorStyle = "text-primary-500 bg-primary-50";
            break;
        case "error":
            badgeColorStyle = "text-error-500 bg-error-50";
            break;
        case "success":
            badgeColorStyle = "text-success-500 bg-success-50";
            break;
    }

    return (
        <div className={`${badgeSizeStyle} ${badgeColorStyle} flex w-min rounded-full font-medium items-center gap-1`}>
            {icon}
            <span>{text}</span>
        </div>
    );
}
