import { Transition } from '@headlessui/react';
import React, { Fragment } from 'react'
import { getBackdropState } from '../../../features/modal/modalSlice';
import { useAppSelector } from '../../../utils/hooks';

type BackkdropType = {
	state: boolean,
	z_index: string, // Should be a TailwindCSS z-index property
	close?: () => any
}

export default function Backdrop({ state, z_index, close }: BackkdropType) {
	return (
		<Transition
			appear show={state}
			as={Fragment}
			enter="ease-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-60"
			leave="ease-in duration-200"
			leaveFrom="opacity-60"
			leaveTo="opacity-0">
			<div
				onClick={close}
				className={state
					? `${z_index} fixed inset-0 w-100 h-100 bg-dark-900 opacity-40 dark:opacity-70`
					: 'hidden'
				}>
			</div>

		</Transition>
	)
}
