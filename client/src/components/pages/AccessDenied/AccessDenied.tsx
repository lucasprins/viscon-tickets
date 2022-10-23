import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../../../features/auth/authSlice';
import { useAppSelector } from '../../../utils/hooks';
import { Button } from '../../atoms/Button/Button';
import { FeaturedIcon } from '../../atoms/Icons/FeaturedIcon';
import { IconAlert, IconTicket } from '../../atoms/Icons/Icons';

var translations = require('../../../translations/accessDeniedTranslations.json');

export function AccessDenied() {
	const [language, seLanguage] = useState('nl');
	const currentUser = useAppSelector(getUser);
	
	if(!currentUser) {
		return <Navigate to="/login" />
	}

	return (
		<div className='h-screen w-screen flex items-center justify-center p-6 lg:p-8 dark:bg-dark-800'>
			<div className='flex flex-col gap-12'>
				{/* Heading and icons */}
				<div className='flex flex-col items-center gap-6'>
					<FeaturedIcon type="primary" size="xl" icon={<IconAlert size='24' color='stroke-primary-500' fill='fill-primary-500' />} />
					<div className='flex flex-col items-center gap-6'>
						<h1 className='text-display_md lg:text-display_xl text-gray-900 dark:text-white font-semibold text-center'>{translations[language].title}</h1>
						<p className='text-xl text-gray-600 dark:text-dark-400 text-center'>{translations[language].subtitle}</p>
					</div>
				</div>
				{/* Actions Desktop */}
				<div className='hidden lg:flex justify-center gap-3'>
					<Button size='large' width='content' type='secondary-gray' text={translations[language].button_secondary} url="/tickets" icon={<IconTicket size='20' color='stroke-gray-800 dark:stroke-white' fill='' />} />
					<Button size='large' width='content' type='primary' text={translations[language].button_primary} url="/" />
				</div>
				{/* Actions Mobile */}
				<div className='flex lg:hidden flex-col justify-center gap-3'>
					<Button size='large' width='full' type='primary' text={translations[language].button_primary} url="/" />
					<Button size='large' width='full' type='secondary-gray' text={translations[language].button_secondary} url="/tickets" icon={<IconTicket size='20' color='stroke-gray-800 dark:stroke-white' fill='' />} />
				</div>
			</div>
		</div>
	);
}
