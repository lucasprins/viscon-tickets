import React from 'react'
import { getBackdropState } from '../../features/modal/modalSlice';
import { useAppSelector } from '../../hooks/reduxHooks';

type BackkdropType = {
	state: boolean
	close?: () => any
}

export default function Backdrop({ state, close }: BackkdropType) {
	return (
		<div
			onClick={close}
			className={state
				? 'z-40 fixed inset-0 w-100 h-100 bg-dark-900 opacity-40 dark:opacity-70'
				: 'hidden'
			}>
		</div>
	)
}
