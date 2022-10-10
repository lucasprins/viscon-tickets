import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Button } from '../../components/Button/Button';
import { InlineCTA } from '../../components/CTA/InlineCTA';
import { Divider } from '../../components/Divider/Divider';
import { InputDropdownMachine } from '../../components/Input/InputDropdownMachine';
import Layout from '../../components/Layout/Layout';
import { MachineSolutionList } from '../../components/MachineSolution/MachineSolutionList';
import { Modal } from '../../components/Modal/Modal';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { toggleBackdrop, toggleKnowledgebaseModal } from '../../features/modal/modalSlice';
import { getCurrentLanguage } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

var translations = require('./KnowledgebaseTranslations.json');

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