import React from 'react';
import { NavigationSidebar } from './NavigationSidebar';

export function NavigationSidebarDesktop() {
	return (
		<aside className='ease-in duration-200 hidden md:flex flex-col justify-between h-screen w-72 bg-white border-r border-gray-200 py-8 dark:border-dark-500 dark:bg-dark-700'>
			<NavigationSidebar />
		</aside>
	);
}
