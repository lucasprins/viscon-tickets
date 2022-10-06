import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ButtonSize, ButtonType } from '../../components/Button/Button';
import { InlineCTA } from '../../components/CTA/InlineCTA';
import { Divider } from '../../components/Divider/Divider';
import { DropdownSelectMachine } from '../../components/Dropdown/DropdownSelect';
import Layout from '../../components/Layout/Layout';
import { MachineSolutionList } from '../../components/MachineSolution/MachineSolutionList';
import { PageHeader } from '../../components/PageHeader/PageHeader';

var translations = require('./KnowledgebaseTranslations.json');

export function Knowledgebase() {
	const [language, setLanguage] = React.useState('en');

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
			<div className='flex flex-col w-min gap-6 p-8 border-r border-gray-300 dark:border-dark-500'>
				{/* Page Header Placeholder */}
				<PageHeader
					title={translations[language].knowledgebase}
					subtitle={translations[language].knowledgebase_subtitle} />
				<Divider />
				<DropdownSelectMachine machines={machines} label={translations[language].search_machine} />
				<InlineCTA
					title={translations[language].cant_find_solution_title}
					text={translations[language].cant_find_solution_text}
					url="/knowledgebase/create-ticket"
					button_text={translations[language].create_ticket}
					button_size={ButtonSize.MEDIUM}
					button_type={ButtonType.PRIMARY}
				/>
			</div>
			{/* Solutions */}
			<div className='flex flex-col w-full gap-6 p-8'>
				<div className=''>
					<Breadcrumbs crumbs={['Knowledgebase']} />
				</div>
				<Divider />
				<MachineSolutionList />
			</div>
		</div>
	);
}
