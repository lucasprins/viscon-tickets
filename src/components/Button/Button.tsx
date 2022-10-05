import React from 'react'
import { Link } from 'react-router-dom';

export enum ButtonSize {
    SMALL,
    MEDIUM,
    LARGE
}

export enum ButtonWidth {
    FULL,
    CONTENT
}

export enum ButtonType {
    PRIMARY,
    SECONDARY_GRAY,
    SECONDARY_COLOR,
    TERTIARY_GRAY,
    TERTIARY_COLOR,
}

type ButtonProps = {
    size: ButtonSize,
    type: ButtonType,
    text: string,
    icon?: JSX.Element,
    width: ButtonWidth,
    url?: string,
    onclick?: () => any
}

export function Button({ size, width, type, text, icon, url, onclick }: ButtonProps) {

    const buttonWidthStyle = width === ButtonWidth.FULL ? "w-full" : "";
    let buttonSizeStyle = "";
    let buttonTypeStyle = "";

    switch (size) {
        case ButtonSize.LARGE:
            buttonSizeStyle = "py-2.5 px-5 font-semibold";
            break;
        case ButtonSize.MEDIUM:
            buttonSizeStyle = "py-2.5 px-4 font-semibold text-sm";
            break;
        case ButtonSize.SMALL:
            buttonSizeStyle = "py-2 px-3.5 font-semibold text-sm";
            break;
    }

    switch (type) {
        case ButtonType.PRIMARY:
            buttonTypeStyle = "shadow-sm bg-primary-600 text-white";
            break;
        case ButtonType.SECONDARY_GRAY:
            buttonTypeStyle = "shadow-sm text-gray-700 border border-gray-300 dark:border-dark-500 dark:text-white";
            break;
        case ButtonType.SECONDARY_COLOR:
            buttonTypeStyle = "shadow-sm text-primary-700 bg-primary-50 dark:bg-dark-700";
            break;
        case ButtonType.TERTIARY_GRAY:
            buttonTypeStyle = "text-gray-700";
            break;
        case ButtonType.TERTIARY_COLOR:
            buttonTypeStyle = "text-primary-700";
            break;
    };

    return (
        <>
            {url
                ?
                <Link to={url}>
                    <button onClick={onclick} className={`${buttonTypeStyle} ${buttonWidthStyle} ${buttonSizeStyle}
                        flex justify-center items-center gap-x-2.5 rounded-lg`}>
                        {icon}
                        {text}
                    </button>
                </Link>
                :
                <button onClick={onclick} className={`${buttonTypeStyle} ${buttonWidthStyle} ${buttonSizeStyle}
                flex justify-center gap-x-2 rounded-lg`}>
                    {icon}
                    {text}
                </button>
            }
        </>
    )
}
