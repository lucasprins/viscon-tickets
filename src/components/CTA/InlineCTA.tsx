import React from 'react'
import { Button, ButtonSize, ButtonType, ButtonWidth } from '../Button/Button'

type InlineCTAProps = {
	title: string,
	text: string,
	url: string,
	button_text: string,
	button_size: ButtonSize,
	button_type: ButtonType
}

export function InlineCTA({ title, text, url, button_text, button_size, button_type }: InlineCTAProps) {
	return (
		<div className='w-96 p-5 flex flex-col gap-5 bg-white dark:bg-dark-700 rounded-xl border border-gray-200 dark:border-dark-500 drop-shadow-sm'>
			<div className='flex flex-col gap-1'>
				<h3 className='text-lg font-semibold text-gray-800 dark:text-white'>{title}</h3>
				<p className=' text-gray-600 dark:text-dark-300'>{text}</p>
			</div>
			<Button
				size={button_size}
				type={button_type}
				text={button_text}
				width={ButtonWidth.FULL}
				url={url}
			/>
		</div>
	)
}
