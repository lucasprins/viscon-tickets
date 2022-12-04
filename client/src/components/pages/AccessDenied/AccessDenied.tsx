import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext, useAuthentication } from '../../../utils/hooks';
import { Button } from '../../atoms/Button/Button';
import { FeaturedIcon } from '../../atoms/Icons/FeaturedIcon';
import { IconAlert, IconTicket } from '../../atoms/Icons/Icons';

var translations = require('../../../translations/allTranslations.json');

export function AccessDenied() {
	const { appState } = useAppContext();
	const user = appState.user;
	const language = appState.language;

	
	if(!useAuthentication()) {
		return <Navigate to="/login" />
	}

	return (
		<div className='flex items-center justify-center w-screen h-screen p-6 lg:p-8 dark:bg-dark-800'>
			<div className='flex flex-col gap-12'>
				{/* Heading and icons */}
				<div className='flex flex-col items-center gap-6'>
					<FeaturedIcon type="primary" size="xl" icon={<IconAlert size='24' color='stroke-primary-500' fill='fill-primary-500' />} />
					<div className='flex flex-col items-center gap-6'>
						<h1 className='font-semibold text-center text-gray-900 text-display_md lg:text-display_xl dark:text-white'>{translations[language].titleDenied}</h1>
						<p className='text-xl text-center text-gray-600 dark:text-dark-400'>{translations[language].subtitleDenied}</p>
					</div>
				</div>
				{/* Actions Desktop */}
				<div className='justify-center hidden gap-3 lg:flex'>
					<Button size='large' width='content' type='secondary-gray' text={translations[language].button_secondaryDenied} url="/tickets" icon={<IconTicket size='20' color='stroke-gray-800 dark:stroke-white' fill='' />} />
					<Button size='large' width='content' type='primary' text={translations[language].button_primaryDenied} url="/" />
				</div>
				{/* Actions Mobile */}
				<div className='flex flex-col justify-center gap-3 lg:hidden'>
					<Button size='large' width='full' type='primary' text={translations[language].button_primaryDenied} url="/" />
					<Button size='large' width='full' type='secondary-gray' text={translations[language].button_secondaryDenied} url="/tickets" icon={<IconTicket size='20' color='stroke-gray-800 dark:stroke-white' fill='' />} />
				</div>
			</div>
		</div>
	);
}
