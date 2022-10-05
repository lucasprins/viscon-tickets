import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Button, ButtonSize, ButtonType, ButtonWidth } from '../../components/Button/Button';
import { IconTicket } from '../../components/Icons/IconTicket';
import Layout from '../../components/Layout/Layout';

export function Playground() {

	return (
		<div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='p-8 flex w-full  flex-col gap-y-12'>
				<Breadcrumbs crumbs={['Playground']} />
				<div className='w-72'>
					<Button
						size={ButtonSize.MEDIUM}
						type={ButtonType.PRIMARY}
						text="Create a ticket"
						width={ButtonWidth.CONTENT}
						icon={<IconTicket size='18' color='stroke-white dark:stroke-gray-300' fill='fill-gray-500' />}
						url="/knowledgebase/create-ticket"
					/>
				</div>
			</div>
		</div>
	);
}