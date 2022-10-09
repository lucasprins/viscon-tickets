import React from 'react'
import { getBackdropState } from '../../features/modal/modalSlice';
import { useAppSelector } from '../../hooks/reduxHooks';

type BackkdropType = {
	state: boolean,
	z_index: string, // Should be a TailwindCSS z-index property
	close?: () => any
}

export default function Backdrop({ state, z_index, close }: BackkdropType) {
	return (
		<div
			onClick={close}
			className={state
				? `${z_index} fixed inset-0 w-100 h-100 bg-dark-900 opacity-40 dark:opacity-70`
				: 'hidden'
			}>
		</div>
	)
}
