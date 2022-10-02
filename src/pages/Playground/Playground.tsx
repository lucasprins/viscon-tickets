import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { DropdownSelectMachine } from '../../components/Dropdown/DropdownSelect';
import Layout from '../../components/Layout/Layout';

export function Playground() {
	const machines = [
		{ machine_id: '1', name: 'Satteliet shuttle 1', blueprint_number: '02315', type: 'Satteliet shuttle' },
		{ machine_id: '2', name: 'Satteliet shuttle 2', blueprint_number: '02315', type: 'Satteliet shuttle' },
		{ machine_id: '3', name: 'Satteliet shuttle 3', blueprint_number: '02315', type: 'Satteliet shuttle' },
		{ machine_id: '4', name: 'Satteliet shuttle 4', blueprint_number: '02315', type: 'Satteliet shuttle' },
		{ machine_id: '5', name: 'Satteliet shuttle 5', blueprint_number: '02315', type: 'Satteliet shuttle' },
		{ machine_id: '6', name: 'Satteliet shuttle 6', blueprint_number: '02315', type: 'Satteliet shuttle' },
		{ machine_id: '7', name: 'Satteliet shuttle 7', blueprint_number: '02315', type: 'Satteliet shuttle' },
		{ machine_id: '8', name: 'Satteliet shuttle 8', blueprint_number: '02315', type: 'Satteliet shuttle' },
	]

	return (
		<div className='flex flex-col w-full md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='p-8 flex w-full  flex-col gap-y-12'>
				<Breadcrumbs crumbs={['Playground']} />
				<div className='w-72'>
					<DropdownSelectMachine label='Search for a machine' machines={machines} />
				</div>
			</div>
		</div>
	);
}
