import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonIcon } from '../Button/ButtonIcon'
import { IconMenu } from '../Icons/IconMenu'

type NavigationMobileTypes = {
	openSidebar: () => any
}

export const NavigationMobile = ({ openSidebar }: NavigationMobileTypes) => {

	return (
		<>
			<div className='z-50 drop-shadow-sm sticky inset-0 bg-white dark:bg-dark-700 dark:border-dark-500 flex items-center md:hidden justify-between py-3 pr-3 pl-6 border-b border-gray-200'>
				<Link to='/'>
					<h2 className='text-lg text-gray-900 font-semibold dark:font-medium dark:text-white'>Viscon Tickets</h2>
				</Link>
				<ButtonIcon onclick={openSidebar} icon={<IconMenu size='24' color='stroke-gray-500 dark:stroke-gray-400' fill='fill-gray-500' />} />
			</div>
		</>
	)
}
