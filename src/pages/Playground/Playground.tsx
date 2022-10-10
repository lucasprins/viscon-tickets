import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { FeaturedIcon, FeaturedIconSize, FeaturedIconType } from '../../components/FeaturedIcon/FeaturedIcon';
import { IconAlert } from '../../components/Icons/IconAlert';
import { IconVideo } from '../../components/Icons/IconVideo';
import Layout from '../../components/Layout/Layout';
import { Modal } from '../../components/Modal/Modal';


export function Playground() {

	return (
		<div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='p-8 flex w-full  flex-col gap-y-12'>
				<Breadcrumbs crumbs={['Playground']} />
				<div className='w-72 flex gap-2'>
					<IconVideo size='24' color='stroke-primary-500 dark:stroke-gray-300' fill='fill-primary-500' />
				</div>
				<div className='w-72 flex gap-2 items-center'>
					<FeaturedIcon type={FeaturedIconType.PRIMARY} size={FeaturedIconSize.SM} icon={<IconVideo size='15' color='stroke-primary-500' fill='fill-primary-500' />} />
					<FeaturedIcon type={FeaturedIconType.PRIMARY} size={FeaturedIconSize.MD} icon={<IconVideo size='17' color='stroke-primary-500' fill='fill-primary-500' />} />
					<FeaturedIcon type={FeaturedIconType.PRIMARY} size={FeaturedIconSize.LG} icon={<IconVideo size='21' color='stroke-primary-500' fill='fill-primary-500' />} />
					<FeaturedIcon type={FeaturedIconType.PRIMARY} size={FeaturedIconSize.XL} icon={<IconVideo size='24' color='stroke-primary-500' fill='fill-primary-500' />} />
				</div>

				{/* Modals */}
				{/* <div className="flex flex-row">
					<Modal
						type='error'
						title={"Are you sure you want to leave?"}
						subtitle={"If you leave this page, any progress will be lost."}
						button_primary_text={"Yes"}
						button_secondary_text={"No"}
					/>
					<Modal
						type='success'
						title={"Perfect! Your ticket has been created."}
						button_primary_text={"Dashboard"}
						button_secondary_text={"View ticket"}
					/>
					<Modal
						type='primary'
						title={"Are you sure your problem is not in the knowledgebase?"}
						button_primary_text={"Yes"}
						button_secondary_text={"No"}
					/>
				</div> */}
			</div>
		</div>
	);
}