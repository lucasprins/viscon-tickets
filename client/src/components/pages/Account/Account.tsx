import React, { useEffect } from 'react';
import { Breadcrumbs } from '../../atoms/Breadcrumbs/Breadcrumbs';
import Layout from '../../organisms/Layout/Layout';
import { useAppSelector, useAuthentication } from '../../../utils/hooks';
import { Navigate } from 'react-router-dom';

export function Account() {	
	if (!useAuthentication()) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='flex flex-col gap-4 p-8'>
				<Breadcrumbs crumbs={['Account']}/>
			</div>
		</div>
	);
}
