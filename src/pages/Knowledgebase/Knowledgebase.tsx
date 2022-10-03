import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Divider } from '../../components/Divider/Divider';
import { DropdownSelectMachine } from '../../components/Dropdown/DropdownSelect';
import Layout from '../../components/Layout/Layout';
import { MachineSolutionList } from '../../components/MachineSolution/MachineSolutionList';

export function Knowledgebase() {
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
		<div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			{/* Sidebar */}
			<div className='flex flex-col gap-6 p-8 border-r border-gray-200 dark:border-dark-500'>
				{/* Page Header Placeholder */}
				<div>
					<h1>Knowledgebase</h1>
					<p>Search for a machine and view all of the common problems and solutions</p>
				</div>
				<Divider />
				<DropdownSelectMachine machines={machines} label='Search for a machine' />
			</div>
			{/* Solutions */}
			<div className='flex flex-col gap-6 p-8'>
				<div className=''>
					<Breadcrumbs crumbs={['Knowledgebase']} />
				</div>
				<Divider />
				<MachineSolutionList />
			</div>
		</div>
	);
}
