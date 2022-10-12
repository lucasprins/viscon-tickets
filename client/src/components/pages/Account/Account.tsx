import React, { useEffect } from 'react';
import { Breadcrumbs } from '../../atoms/Breadcrumbs/Breadcrumbs';
import Layout from '../../organisms/Layout/Layout';
import { getLanguageModal, toggleLanguageModal } from '../../../features/modal/modalSlice';
import { getCurrentLanguage, setLanguage } from '../../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';

export function Account() {
	return (
		<div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='p-8 flex flex-col gap-4'>
				<Breadcrumbs crumbs={['Account']}/>
			</div>
		</div>
	);
}
