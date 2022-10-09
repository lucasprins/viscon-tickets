import React, { useState } from "react";

type InputTextArea = {
	text: string
};

export function InputTextArea({ text }: InputTextArea) {

	const [value, setValue] = useState<string>('')

	return (
		<form
			className="w-full"
			onSubmit={x => {
			x.preventDefault()
			console.log({ value: value })
		}}
		>
            <input
				type='text'
				className='pb-40 h-full w-full bg-white border rounded-lg stroke-gray-300 px-3.5 py-3 text-md font-normal dark:bg-dark-700 dark:text-gray-300 dark:border-dark-500'
				placeholder={text}
				value={value}
				onChange={x => setValue(x.target.value)}
				>
			</input>
        </form>
	);
};