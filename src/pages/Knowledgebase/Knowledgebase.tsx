import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ButtonSize, ButtonType } from '../../components/Button/Button';
import { InlineCTA } from '../../components/CTA/InlineCTA';
import { Divider } from '../../components/Divider/Divider';
import { InputDropdownSelectMachine } from '../../components/Input/InputDropdownSelect';
import Layout from '../../components/Layout/Layout';
import { MachineSolutionList } from '../../components/MachineSolution/MachineSolutionList';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { getMachines, setSelectedMachine } from '../../features/machines/machinesSlice';
import { getCurrentLanguage } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

var translations = require('./KnowledgebaseTranslations.json');

export function Knowledgebase() {
	const language = useAppSelector(getCurrentLanguage);
	const machines = useAppSelector(getMachines);

	return (
		<div className='flex flex-col md:flex-row md:h-screen dark:bg-dark-800 dark:text-white overflow-x-hidden'>
			<Layout />
			{/* Sidebar */}
			<div className='flex flex-col w-full lg:w-min gap-4 lg:gap-6 px-6 pt-6 lg:p-8 md:border-r border-gray-300 dark:border-dark-500'>
				<PageHeader
					title={translations[language].knowledgebase}
					subtitle={translations[language].knowledgebase_subtitle} />
				<Divider />
				<InputDropdownSelectMachine label={translations[language].search_machine} />
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
			<div className='flex flex-col w-full gap-6 px-6 pb-6 md:pt-6 lg:p-8'>
				<div className=''>
					<Breadcrumbs crumbs={['Knowledgebase']} />
				</div>
				<Divider />
				<MachineSolutionList />
			</div>
		</div>
	);
}