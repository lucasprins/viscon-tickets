import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Button } from '../../components/Button/Button';
import { FeaturedIcon, FeaturedIconSize, FeaturedIconType } from '../../components/FeaturedIcon/FeaturedIcon';
import { IconVideo } from '../../components/Icons/IconVideo';
import Layout from '../../components/Layout/Layout';


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

				<Button
					size='medium'
					width='full'
					type='primary'
					text="English"
				/>
				<Button
					size='medium'
					width='full'
					type='secondary-gray'
					text="English"
				/>
				<Button
					size='medium'
					width='full'
					type='secondary-color'
					text="English"
				/>
				<Button
					size='medium'
					width='full'
					type='tertiary-gray'
					text="English"
				/>
				<Button
					size='medium'
					width='full'
					type='tertiary-color'
					text="English"
				/>
				<Button
					size='medium'
					width='full'
					type='error'
					text="English"
				/>
			</div>
		</div>
	);
}