import React from 'react';
import { Breadcrumbs } from '../../atoms/Breadcrumbs/Breadcrumbs';
import { InlineCTA } from '../../molecules/CTA/InlineCTA';
import { Divider } from '../../atoms/Divider/Divider';
import { InputDropdownMachine } from '../../atoms/InputDropdown/InputDropdownMachine';
import Layout from '../../organisms/Layout/Layout';
import { MachineSolutionList } from '../../molecules/MachineSolution/MachineSolutionList';
import { PageHeader } from '../../atoms/PageHeader/PageHeader';
import { getCurrentLanguage } from '../../../features/user/userSlice';
import { useAppSelector } from '../../../utils/hooks';

var translations = require('../../../translations/knowledgebaseTranslations.json');

export function Knowledgebase() {
	const language = useAppSelector(getCurrentLanguage);

	return (
		<>
			<div className='flex flex-col md:flex-row md:h-screen dark:bg-dark-800 dark:text-white overflow-x-hidden'>
				<Layout />
				{/* Sidebar */}
				<div className='flex flex-col w-full lg:w-min gap-4 lg:gap-6 px-6 pt-6 lg:p-8 md:border-r border-gray-300 dark:border-dark-500'>
					<PageHeader
						title={translations[language].knowledgebase}
						subtitle={translations[language].knowledgebase_subtitle} />
					<Divider />
					<InputDropdownMachine label={translations[language].search_machine} />
					<InlineCTA
						title={translations[language].cant_find_solution_title}
						text={translations[language].cant_find_solution_text}
						url="/knowledgebase/create-ticket"
						button_text={translations[language].create_ticket}
						button_size='medium'
						button_type='primary'
					/>
				</div>
				{/* Solutions */}
				<div className='flex flex-col w-full gap-6 px-6 pb-6 md:pt-6 lg:p-8'>
					<div className=''>
						<Breadcrumbs crumbs={[translations[language].knowledgebase]} />
					</div>
					<Divider />
					<MachineSolutionList />
				</div>
			</div>
		</>

	);
}