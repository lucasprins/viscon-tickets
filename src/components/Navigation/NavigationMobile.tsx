import React from 'react'
import { ButtonOnlyIcon } from '../Button/ButtonOnlyIcon'
import { IconMenu } from '../Icons/IconMenu'

type NavigationMobileTypes = {
	openSidebar: () => any
}

export const NavigationMobile = ({openSidebar}: NavigationMobileTypes) => {

	return (
		<>
			<div className='dark:bg-dark-800 dark:border-dark-600 flex items-center md:hidden transition-all justify-between py-3 pr-3 pl-6 border-b border-gray-200'>
				<h2 className='text-lg text-gray-900 font-semibold dark:font-medium dark:text-white'>Viscon Tickets</h2>
				<ButtonOnlyIcon onclick={openSidebar} icon={<IconMenu size='24' color='stroke-gray-500 dark:stroke-gray-400' fill='fill-gray-500' />} />
			</div>
		</>
	)
}