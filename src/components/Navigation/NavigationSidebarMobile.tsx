import React from 'react';
import { NavigationSidebar } from './NavigationSidebar';

type NavigationSidebarMobileType = {
	state: boolean
}

export function NavigationSidebarMobile({ state }: NavigationSidebarMobileType) {

	return (
		<aside className={state
			? "h-screen w-72 absolute inset-0 z-50 drop-shadow duration-500 transition-all flex md:hidden flex-col justify-between py-8 bg-white dark:border-dark-600 dark:bg-dark-800"
			: "-translate-x-full h-screen w-72 absolute inset-0 z-50 drop-shadow duration-500 md:hidden transition-all flex flex-col justify-between py-8 dark:border-dark-600 bg-white dark:bg-dark-800"
		}>
			<NavigationSidebar />
		</aside>
	);
}
