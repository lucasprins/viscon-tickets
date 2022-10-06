import React from 'react';
import { NavLink } from 'react-router-dom';

type NavigationItemProps = {
	name: string,
	url?: string,
	icon: JSX.Element
	onclick?: () => any
}

export function NavigationItem({ name, icon, url, onclick }: NavigationItemProps) {
	return (
		<>
			{url
				?
				<NavLink to={'/' + url} className={({ isActive }) => isActive ? 'bg-gray-100 rounded-md dark:bg-dark-600' : undefined}>
					<div className='flex items-center px-3 py-2 gap-x-2 hover:bg-gray-100 dark:hover:bg-dark-600 rounded-md'>
						{icon}
						<span className='text-md font-semibold text-gray-700 dark:text-white dark:font-medium'>{name}</span>
					</div>
				</NavLink>
				:
				<button onClick={onclick}>
					<div className='flex items-center px-3 py-2 gap-x-2 hover:bg-gray-100 dark:hover:bg-dark-600 rounded-md'>
						{icon}
						<span className='text-md font-semibold text-gray-700 dark:text-white dark:font-medium'>{name}</span>
					</div>
				</button>
			}
		</>
	);
}
