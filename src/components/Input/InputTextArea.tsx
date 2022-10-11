import React, { useState } from "react";

type InputTextArea = {
	placeholder?: string
};

export function InputTextArea({ placeholder }: InputTextArea) {
	const [value, setValue] = useState<string>('');

	return (
		<textarea
			className='h-48 w-full bg-white border rounded-lg placeholder:text-gray-500 border-gray-300 outline-primary-300 text-gray-900 drop-shadow-sm px-3.5 py-3 text-md font-normal dark:bg-dark-700 dark:text-gray-300 dark:border-dark-500'
			placeholder={placeholder}
			value={value}
			onChange={x => {
				setValue(x.target.value)
				// console.log({ value: value})
			}}
		>
		</textarea>
	);
};