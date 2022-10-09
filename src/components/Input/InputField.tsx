import React, { useState } from "react";

export enum InputType {
    ICON,
    ICONLESS
}

type InputFieldProps = {
    type: InputType,
	text: string,
    icon?: JSX.Element
};

export function InputField({ type, text, icon }: InputFieldProps) {
    let iconStyling = "";
    let inputStyling = "";

    switch (type) {
        case InputType.ICON:
            iconStyling = "p-3 absolute pointer-events-none";
            inputStyling = "pr-3 pl-10";
            break;
    }

    const [value, setValue] = useState<string>('')

	return (
		<form
            className="w-full"
            onSubmit={x => {
            x.preventDefault()
            console.log({ value: value })
        }}
        >
            <div className="relative flex items-center text-gray-900">
                <div className={iconStyling}>
                    {icon}
                </div>
                <input
                    type='text'
                    className={`${inputStyling} w-full bg-white border rounded-lg stroke-gray-300 px-3.5 py-2.5 text-md font-normal dark:bg-dark-700 dark:text-gray-300 dark:border-dark-500`}
                    placeholder={text}
                    value={value}
                    onChange={x => setValue(x.target.value)}
                    >
                </input>
            </div>
        </form>
	);
};