import React from 'react';
import { NavigationSidebar } from './NavigationSidebar';

type NavigationSidebarMobileType = {
	state: boolean
}

export function NavigationSidebarMobile({ state }: NavigationSidebarMobileType) {

	return (
		<aside className={state
			? "h-screen w-72 fixed inset-0 z-50 duration-500 transition-all flex md:hidden flex-col justify-between border-r py-8 bg-white dark:border-dark-500 dark:bg-dark-700"
			: "-translate-x-full h-screen w-72 fixed inset-0 z-50 duration-500 border-r md:hidden transition-all flex flex-col justify-between py-8 bg-white dark:border-dark-500 dark:bg-dark-700"
		}>
			<NavigationSidebar />
		</aside>
	);
}
