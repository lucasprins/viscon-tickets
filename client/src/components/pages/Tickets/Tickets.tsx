import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../../../features/auth/authSlice';
import { useAppSelector } from '../../../utils/hooks';
import { Breadcrumbs } from '../../atoms/Breadcrumbs/Breadcrumbs';
import Layout from '../../organisms/Layout/Layout';

export function Tickets() {
	const currentUser = useAppSelector(getUser);

	if (!currentUser) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='p-8'>
				<Breadcrumbs crumbs={['Tickets']}/>
			</div>
		</div>
	);
}
