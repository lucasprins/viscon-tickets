import React from 'react';
import { NavigationSidebar } from './NavigationSidebar';

type NavigationSidebarMobileType = {
	state: boolean
}

export function NavigationSidebarMobile({ state }: NavigationSidebarMobileType) {
	const root = document.getElementsByName('html')[0];

	return (
		<aside className={state
			? "h-full w-72 transition-all duration-500 fixed inset-0 z-30 flex md:hidden flex-col justify-between border-r py-8 bg-white dark:border-dark-600 dark:bg-dark-800"
			: "-translate-x-full transition-all duration-500 h-full w-72 fixed inset-0 z-50 border-r md:hidden flex flex-col justify-between py-8 bg-white dark:border-dark-600 dark:bg-dark-800"
		}>
			<NavigationSidebar />
		</aside>
	);
}
