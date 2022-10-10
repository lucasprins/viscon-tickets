import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Button } from '../../components/Button/Button';
import { InlineCTA } from '../../components/CTA/InlineCTA';
import { Divider } from '../../components/Divider/Divider';
import { InputDropdownSelectMachine } from '../../components/Input/InputDropdownSelect';
import Layout from '../../components/Layout/Layout';
import { MachineSolutionList } from '../../components/MachineSolution/MachineSolutionList';
import { Modal } from '../../components/Modal/Modal';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { getKnowledgebaseModal, toggleBackdrop, toggleKnowledgebaseModal } from '../../features/modal/modalSlice';
import { getCurrentLanguage } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

var translations = require('./KnowledgebaseTranslations.json');

export function Knowledgebase() {
	const language = useAppSelector(getCurrentLanguage);
	const isOpen = useAppSelector(getKnowledgebaseModal);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const closeModal = () => {
		dispatch(toggleBackdrop());
		dispatch(toggleKnowledgebaseModal());
	};

	const openModal = () => {
		dispatch(toggleBackdrop());
		dispatch(toggleKnowledgebaseModal());
		console.log('toggled modal');
	};

	const onclickPrimary = () => {
		closeModal();
		navigate('/knowledgebase/create-ticket');
	}

	return (
		<>
			<Modal
				type='error'
				title={"Are you sure you want to leave?"}
				subtitle={"If you leave this page, any progress will be lost."}
				is_open={isOpen}
				close_modal={closeModal}
				button_primary_text={"Yes"}
				button_secondary_text={"No"}
				button_primary_onclick={onclickPrimary}
			/>
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
						button_size='medium'
						button_type='primary'
					/>
					<Button
						size='large'
						type='primary'
						text='asdasd'
						width='full'
						onclick={openModal}
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