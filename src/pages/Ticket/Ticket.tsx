import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

export function Ticket() {
	// Get the ticketID from the URL.
	const { ticketID } = useParams();

	return (
		<div className='flex flex-col md:flex-row dark:bg-dark-900 dark:text-white'>
			<Layout />
			<h1>Ticket: {ticketID}</h1>
		</div>
	);
}
