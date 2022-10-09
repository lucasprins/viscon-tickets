import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { FeaturedIcon, FeaturedIconSize, FeaturedIconType } from '../../components/FeaturedIcon/FeaturedIcon';
import { IconAlert } from '../../components/Icons/IconAlert';
import { IconVideo } from '../../components/Icons/IconVideo';
import Layout from '../../components/Layout/Layout';
import { Button, ButtonSize, ButtonType, ButtonWidth } from '../../components/Button/Button';
import {Modal, ModalType} from '../../components/Modal/ModalButtonClick';


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
				<div className="flex flex-row">
					
					<Modal 
						type={ModalType.ERROR}
						title={"Test"}
						subtitle={"This is error!"}
						text_button_primary={"Succes"}
						text_button_secondary={"Fail"}
					/>
					<Modal 
						type={ModalType.SUCCESS}
						title={"Test"}
						subtitle={"This is succes!"}
						text_button_primary={"Succes"}
						text_button_secondary={"Fail"}
					/>
					<Modal 
						type={ModalType.CHECK}
						title={"Test"}
						subtitle={"This is Check?!"}
						text_button_primary={"Succes"}
						text_button_secondary={"Fail"}
					/>
				</div>
			</div>
		</div>
	);
}