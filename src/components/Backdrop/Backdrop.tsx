import React from 'react'

type BackkdropType = {
	state: boolean
	close: () => any
}

export default function Backdrop({ state, close }: BackkdropType) {
	return (
		<div
			onClick={close}
			className={state
				? 'z-40 fixed inset-0 w-100 h-100 bg-dark-900 opacity-30 dark:opacity-60'
				: 'z-40 fixed inset-0 w-100 h-100 bg-dark-900 opacity-30 dark:opacity-60 hidden'
			}>
		</div>
	)
}
