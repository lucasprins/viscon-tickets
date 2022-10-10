import React, { useState } from "react";

type InputTextArea = {
	text: string
};

export function InputTextArea({ text }: InputTextArea) {
	const [value, setValue] = useState<string>('');

	return (
		<textarea
			className='h-48 w-full bg-white border rounded-lg stroke-gray-300 px-3.5 py-3 text-md font-normal dark:bg-dark-700 dark:text-gray-300 dark:border-dark-500'
			placeholder={text}
			value={value}
			onChange={x => {
				setValue(x.target.value)
				// console.log({ value: value})
			}}
		>
		</textarea>
	);
};