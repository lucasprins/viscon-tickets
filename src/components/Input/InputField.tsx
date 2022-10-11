import React, { useState } from "react";

export enum InputType {
    ICON,
    ICONLESS
}

type InputFieldProps = {
    type: InputType,
    placeholder?: string,
    icon?: JSX.Element,
    disabled_value?: string,
    disabled?: boolean
};

export function InputField({ type, placeholder, icon, disabled, disabled_value }: InputFieldProps) {
    const [value, setValue] = useState<string>('')
    let iconStyling = "";
    let inputStyling = "";

    switch (type) {
        case InputType.ICON:
            iconStyling = "p-3 absolute pointer-events-none flex items-center";
            inputStyling = "pl-10";
            break;
    }

    return (
        <>
            {disabled
                ? <div className="relative flex items-center text-gray-900 w-full drop-shadow-sm">
                    <div className={iconStyling}>
                        {icon}
                    </div>
                    <input
                        type='text'
                        className={`${inputStyling} w-full bg-gray-50 border rounded-lg placeholder:text-gray-500 border-gray-300 outline-primary-300 px-3.5 py-2.5 text-md font-normal dark:bg-dark-700 dark:text-gray-300 dark:border-dark-500`}
                        placeholder={placeholder}
                        value={disabled_value}
                        disabled
                    >
                    </input>
                </div>
                :
                <div className="relative flex items-center text-gray-900 w-full drop-shadow-sm">
                    <div className={iconStyling}>
                        {icon}
                    </div>
                    <input
                        type='text'
                        className={`${inputStyling} w-full bg-white border rounded-lg placeholder:text-gray-500 border-gray-300 outline-primary-300 px-3.5 py-2.5 text-md font-normal dark:bg-dark-700 dark:text-gray-300 dark:border-dark-500`}
                        placeholder={placeholder}
                        value={value}
                        onChange={x => setValue(x.target.value)}
                    >
                    </input>
                </div>
            }
        </>
    );
};