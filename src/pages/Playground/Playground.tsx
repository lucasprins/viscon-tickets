import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { FeaturedIcon, FeaturedIconSize, FeaturedIconType } from '../../components/FeaturedIcon/FeaturedIcon';
import { IconAlert } from '../../components/Icons/IconAlert';
import { IconPhone } from '../../components/Icons/IconPhone';
import { IconVideo } from '../../components/Icons/IconVideo';
import { InputField, InputType } from '../../components/Input/InputField';
import { InputTextArea } from '../../components/Input/InputTextArea';
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

				<div className='flex gap-x-2'>
					<InputField disabled={true} disabled_value={'Lucas Prins'} type={InputType.ICON} text='First Name' icon={<IconPhone size='20' color='stroke-gray-500 dark:stroke-white' fill='' />} />
					<InputField type={InputType.ICONLESS} text='Last Name' />
				</div>

				<div>
					<InputTextArea text='Enter some text...' />
				</div>
			</div>
		</div>
	);
}