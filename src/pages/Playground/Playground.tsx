import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Button, ButtonSize, ButtonType, ButtonWidth } from '../../components/Button/Button';
import { ButtonLink, ButtonLinkSize, ButtonLinkType } from '../../components/Button/ButtonLink';
import { IconAlert } from '../../components/Icons/IconAlert';
import { IconImage } from '../../components/Icons/IconImage';
import { IconPhone } from '../../components/Icons/IconPhone';
import { IconTicket } from '../../components/Icons/IconTicket';
import { IconTrash } from '../../components/Icons/IconTrash';
import { IconUpload } from '../../components/Icons/IconUpload';
import Layout from '../../components/Layout/Layout';

export function Playground() {

	return (
		<div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='p-8 flex w-full  flex-col gap-y-12'>
				<Breadcrumbs crumbs={['Playground']} />
				<div className='w-72 flex gap-2'>
					<IconTrash size='24' color='stroke-primary-500 dark:stroke-gray-300' fill='fill-primary-500' />
				</div>
			</div>
		</div>
	);
}