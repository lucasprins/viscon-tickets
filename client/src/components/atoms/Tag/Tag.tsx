import React from "react";

type TagProps = {
	text: string;
};

export function Tag({ text }: TagProps) {
	return (
		<div className='bg-white border rounded-md border-gray-300 flex text-gray-600 text-sm font-medium py-0.5 px-2 dark:bg-dark-700 dark:text-gray-300 dark:border-dark-500'>
			{text}
		</div>
	);
};
