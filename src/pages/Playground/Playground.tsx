import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { DropdownSelectMachine } from '../../components/Dropdown/DropdownSelect';
import Layout from '../../components/Layout/Layout';
import { Tag } from '../../components/Tag/Tag';

export function Playground() {

	return (
		<div className='flex flex-col w-full md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='p-8 flex w-full  flex-col gap-y-12'>
				<Breadcrumbs crumbs={['Playground']} />
				<div className='w-72'>
					
				</div>
			</div>
		</div>
	);
}
