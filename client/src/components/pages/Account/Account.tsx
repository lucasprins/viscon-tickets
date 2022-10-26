import React, { useEffect } from 'react';
import { Breadcrumbs } from '../../atoms/Breadcrumbs/Breadcrumbs';
import Layout from '../../organisms/Layout/Layout';
import { useAppSelector } from '../../../utils/hooks';
import { Navigate } from 'react-router-dom';
import { getUser } from '../../../features/auth/authSlice';

export function Account() {
	const currentUser = useAppSelector(getUser);
	
	if (!currentUser) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='p-8 flex flex-col gap-4'>
				<Breadcrumbs crumbs={['Account']}/>
			</div>
		</div>
	);
}
