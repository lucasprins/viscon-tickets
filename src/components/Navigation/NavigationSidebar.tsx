import React, { useState } from 'react';
import { ButtonOnlyIcon } from '../Button/ButtonOnlyIcon';
import { IconBell } from '../Icons/IconBell';
import { IconBook } from '../Icons/IconBook';
import { IconCube } from '../Icons/IconCube';
import { IconHome } from '../Icons/IconHome';
import { IconLogout } from '../Icons/IconLogout';
import { IconTicket } from '../Icons/IconTicket';
import { IconUser } from '../Icons/IconUser';
import { NavigationItem } from './NavigationItem';

export function NavigationSidebar() {
	return (
		<aside className='hidden md:flex flex-col justify-between h-screen w-72 bg-white border-r border-gray-200 py-8'>
			{/* Navigation Header */}
			<div className='flex flex-col gap-y-6'>
				<h2 className='text-lg text-gray-900 font-semibold px-6'>Viscon Tickets</h2>
				<ul className='flex flex-col gap-y-1 px-4'>
					<NavigationItem name='Dashboard' url='dashboard' icon={<IconHome size='24' color='#667085' />} />
					<NavigationItem name='Tickets' url='tickets' icon={<IconTicket size='24' color='#667085' />} />
					<NavigationItem name='Knowledgebase' url='knowledgebase' icon={<IconBook size='24' color='#667085' />} />
					<NavigationItem name='Playground' url='playground' icon={<IconCube size='24' color='#667085' />} />
				</ul>
			</div>
			{/* Navigation Footer */}
			<div className='flex flex-col gap-y-6'>
				<ul className='flex flex-col gap-y-1 px-4'>
					<NavigationItem name='Notifications' url='notifications' icon={<IconBell size='24' color='#667085' />} />
					<NavigationItem name='Account' url='account' icon={<IconUser size='24' color='#667085' />} />
				</ul>
				<div className='flex justify-between px-6'>
					<div className='flex flex-col'>
						<h4 className='text-md font-semibold text-gray-700'>John Doe</h4>
						<span className='text-md text-gray-600'>Company Title</span>
					</div>
					<ButtonOnlyIcon icon={<IconLogout size='22' color='#667085' />}/>
				</div>
			</div>
		</aside>
	);
}
