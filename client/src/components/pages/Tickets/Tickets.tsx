import React from 'react';
import { Breadcrumbs } from '../../atoms/Breadcrumbs/Breadcrumbs';
import Layout from '../../organisms/Layout/Layout';
import { AppTable } from '../../organisms/Table/tanstackTable';

export function Tickets() {

	return (
		<div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='p-8 flex flex-col gap-y-5 w-full'>
				<Breadcrumbs crumbs={['Tickets']}/>
				<AppTable />
			</div>
		</div>
	);
}
