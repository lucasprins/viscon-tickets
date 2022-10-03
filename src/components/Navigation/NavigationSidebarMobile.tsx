import React from 'react';
import { NavigationSidebar } from './NavigationSidebar';

type NavigationSidebarMobileType = {
	state: boolean
}

export function NavigationSidebarMobile({ state }: NavigationSidebarMobileType) {

	return (
		<aside className={state
			? "h-screen w-72 transition-all duration-500 fixed inset-0 z-50 flex md:hidden flex-col justify-between border-r py-8 bg-white dark:border-dark-500 dark:bg-dark-700"
			: "-translate-x-full transition-all duration-500 h-screen w-72 fixed inset-0 z-50 border-r md:hidden flex flex-col justify-between py-8 bg-white dark:border-dark-500 dark:bg-dark-700"
		}>
			<NavigationSidebar />
		</aside>
	);
}
