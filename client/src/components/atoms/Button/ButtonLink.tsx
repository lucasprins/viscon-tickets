import React from 'react'
import { Link } from 'react-router-dom';

export enum ButtonLinkSize {
    MEDIUM,
    LARGE,
}

export enum ButtonLinkType {
    COLOR,
    GRAY
}

type ButtonLinkProps = {
    size: "medium" | "large",
    type: "color" | "gray",
    text: string,
    icon?: JSX.Element,
    url?: string,
    onclick?: () => any
}

export function ButtonLink({ size, type, text, icon, url, onclick }: ButtonLinkProps) {
    const buttonTypeStyle = type === "color" ? "text-primary-600 hover:text-primary-500" : "text-gray-600 hover:text-gray-400 dark:text-dark-300 dark:hover:text-gray-200";
    const buttonSizeStyle = size === "medium" ? "text-sm" : "";

    return (
        <>
            {url
                ?
                <Link to={url}>
                    <button onClick={onclick} className={`${buttonTypeStyle} ${buttonSizeStyle}
                        flex justify-center items-center gap-x-2.5 font-semibold`}>
                        {icon}
                        {text}
                    </button>
                </Link>
                :
                <button onClick={onclick} className={`${buttonTypeStyle} ${buttonSizeStyle}
                flex justify-center items-center gap-x-2 font-semibold`}>
                    {icon}
                    {text}
                </button>
            }
        </>
    )
}
