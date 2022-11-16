import React from 'react'
import { Link } from 'react-router-dom';

type ButtonProps = {
    size: 'small' | 'medium' | 'large',
    width: 'full' | 'content',
    type: 'primary' | 'secondary-gray' | 'secondary-color' | 'tertiary-gray' | 'tertiary-color' | 'error',
    text: string,
    icon?: JSX.Element,
    url?: string,
    onclick?: () => any,
    disabled?: boolean,
    formType?: "submit" | "button" | "reset"
}

export function Button({ size, width, type, text, icon, url, onclick, formType, disabled }: ButtonProps) {
    const buttonWidthStyle = width === 'full' ? "w-full" : "";
    let buttonSizeStyle = "";
    let buttonTypeStyle = "";

    switch (size) {
        case 'large':
            buttonSizeStyle = "py-2.5 px-5 font-semibold";
            break;
        case 'medium':
            buttonSizeStyle = "py-2.5 px-4 font-semibold text-sm";
            break;
        case 'small':
            buttonSizeStyle = "py-2 px-3.5 font-semibold text-sm";
            break;
    }

    switch (type) {
        case 'primary':
            buttonTypeStyle = "shadow-sm bg-primary-600 border border-primary-600 text-white hover:bg-primary-700 focus:outline outline-primary-200 dark:outline-primary-500 hover:border-primary-700";
            break;
        case 'secondary-gray':
            buttonTypeStyle = "shadow-sm text-gray-800 border border-gray-200 dark:border-dark-600 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-700 focus:outline outline-gray-100 dark:outline-dark-600";
            break;
        case 'secondary-color':
            buttonTypeStyle = "text-primary-600 dark:text-white border border-primary-50 dark:border-dark-600 bg-primary-50 dark:bg-dark-600 hover:bg-primary-100";
            break;
        case 'tertiary-gray':
            buttonTypeStyle = "text-gray-800 border border-primary-600 border-opacity-0 hover:bg-gray-50 dark:text-white dark:hover:bg-dark-700";
            break;
        case 'tertiary-color':
            buttonTypeStyle = "text-primary-600 dark:text-gray-300 border border-primary-600 border-opacity-0 hover:bg-primary-50 dark:hover:bg-dark-600";
            break;
        case 'error':
            buttonTypeStyle = "shadow-sm bg-error-600 border border-error-600 text-white hover:bg-error-700 focus:outline outline-error-200 dark:outline-error-500 hover:border-error-700"
    };

    return (
        <>
            {url
                ?
                <Link to={url} className={buttonWidthStyle}>
                    <button disabled={disabled} type={formType} onClick={onclick} className={`${buttonTypeStyle} ${buttonWidthStyle} ${buttonSizeStyle}
                flex justify-center items-center gap-x-2.5 rounded-lg
                ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
                `}>
                        {icon}
                        {text}
                    </button>
                </Link>
                :
                <button disabled={disabled} type={formType} onClick={onclick} className={`${buttonTypeStyle} ${buttonWidthStyle} ${buttonSizeStyle}
                flex justify-center items-center gap-x-2.5 rounded-lg
                ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
                `}>
                    {icon}
                    {text}
                </button>
            }
        </>
    )
}
