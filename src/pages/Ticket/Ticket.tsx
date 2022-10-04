import React from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import Layout from '../../components/Layout/Layout';

export function Ticket() {
	// Get the ticketID from the URL.
	const { ticketID } = useParams();

	return (
		<div className='flex flex-col h-screen md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='p-8'>
				<Breadcrumbs crumbs={['Tickets']}/>
			</div>
		</div>
	);
}
