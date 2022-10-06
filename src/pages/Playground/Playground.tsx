import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Button, ButtonSize, ButtonType, ButtonWidth } from '../../components/Button/Button';
import { ButtonLink, ButtonLinkSize, ButtonLinkType } from '../../components/Button/ButtonLink';
import { IconTicket } from '../../components/Icons/IconTicket';
import Layout from '../../components/Layout/Layout';

export function Playground() {

	return (
		<div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='p-8 flex w-full  flex-col gap-y-12'>
				<Breadcrumbs crumbs={['Playground']} />
				<div className='w-72 flex gap-2'>
					{/* <ButtonLink
						size={ButtonLinkSize.MEDIUM}
						type={ButtonLinkType.COLOR}
						text="Create a ticket"
						url="/knowledgebase/create-ticket"
					/> */}
					<Button
						size={ButtonSize.MEDIUM}
						type={ButtonType.TERTIARY_COLOR}
						text="No"
						width={ButtonWidth.FULL}
					/>
					<Button
						size={ButtonSize.MEDIUM}
						type={ButtonType.PRIMARY}
						text="Yes"
						width={ButtonWidth.FULL}
					/>
				</div>
			</div>
		</div>
	);
}