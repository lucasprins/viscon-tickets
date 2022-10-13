import React from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../atoms/Breadcrumbs/Breadcrumbs';
import { Divider } from '../../atoms/Divider/Divider';
import { PageHeader } from '../../atoms/PageHeader/PageHeader';
import Layout from '../../organisms/Layout/Layout';

export function Ticket() {
	// Get the ticketID from the URL.
	const { ticketID }: any = useParams();

	return (
		<div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='p-8 flex flex-col gap-6 w-full'>
				<div className='flex flex-col gap-5 w-full'>
					<Breadcrumbs crumbs={['Tickets', `Ticket ${ticketID}`]}/>
					<PageHeader title={`Ticket #${ticketID}`} />
					<Divider />
				</div>
			</div>
		</div>
	);
}
