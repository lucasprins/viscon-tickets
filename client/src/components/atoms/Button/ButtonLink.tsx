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
    size: ButtonLinkSize,
    type: ButtonLinkType,
    text: string,
    icon?: JSX.Element,
    url?: string,
    onclick?: () => any
}

export function ButtonLink({ size, type, text, icon, url, onclick }: ButtonLinkProps) {
    const buttonTypeStyle = type === ButtonLinkType.COLOR ? "text-primary-600 hover:text-primary-500" : "text-gray-600 hover:text-gray-400";
    const buttonSizeStyle = size === ButtonLinkSize.MEDIUM ? "text-sm" : "";

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
