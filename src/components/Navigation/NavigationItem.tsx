import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconHome } from '../Icons/IconHome';

type NavigationItemProps = {
	name: string,
	url: string,
	icon: JSX.Element
}

export function NavigationItem({ name, icon, url }: NavigationItemProps) {

	return (
		<NavLink to={'/' + url} className={({ isActive }) => isActive ? 'bg-gray-100 rounded-md' : undefined}>
			<li className='flex items-center px-3 py-2 gap-x-2 hover:bg-gray-100 rounded-md ease-in duration-200'>
				{icon}
				<span className='inline-block align-middle text-md font-semibold text-gray-700'>{name}</span>
			</li>
		</NavLink>
	);
}
