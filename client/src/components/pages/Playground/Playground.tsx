import React from 'react';
import { Breadcrumbs } from '../../atoms/Breadcrumbs/Breadcrumbs';
import Layout from '../../organisms/Layout/Layout';


export function Playground() {

	return (
		<div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='p-8 flex flex-col gap-y-5'>
				<Breadcrumbs crumbs={['Playground']} />

				{/* <PageHeader title="Create a ticket" />

				<Divider />

				<div className='flex gap-x-8'>
					<text className='text-md font-medium text-gray-700 w-64'>
						Full Name
					</text>

					<div className='flex gap-x-6 w-full'>
						<InputField disabled={true} disabled_value={'John'} type={InputType.ICONLESS} />
						<InputField disabled={true} disabled_value={'Doe'} type={InputType.ICONLESS} />
					</div>
				</div>

				<Divider />
				
				<div className='flex gap-x-8'>
					<text className='text-md font-medium text-gray-700 w-64'>
						Company
					</text>

					<div className='w-full'>
						<InputField disabled={true} disabled_value={'Microsoft'} type={InputType.ICON} icon={<IconBuilding size='20' color='stroke-gray-500 dark:stroke-white' fill='' />} />
					</div>
				</div>

				<Divider />

				<div className='flex gap-x-8'>
					<text className='text-md font-medium text-gray-700 w-64'>
						Phone Number
					</text>

					<div className='w-full'>
						<InputField type={InputType.ICON} icon={<IconPhone size='20' color='stroke-gray-500 dark:stroke-white' fill='' />} />
					</div>
				</div>

				<Divider />
				
				<div className='flex gap-x-8'>
					<text className='text-md font-medium text-gray-700 w-64'>
						Machine
					</text>

					<div className='w-full'>
						<InputField type={InputType.ICONLESS} />
					</div>
				</div>

				<Divider />

				<div className='flex gap-x-8'>
					<div className='flex flex-col'>
						<text className='text-md font-medium text-gray-700 w-64'>
							What do you see that is going wrong?
						</text>
						<text className='text-md font-normal text-gray-600 w-64'>
							Please describe carefully what is going wrong and what you are seeing. What is the issue?
						</text>

					</div>

					<div className='w-full'>
						<InputTextArea />
					</div>
				</div>

				<Divider />

				<div className='flex gap-x-8'>
					<div className='flex flex-col'>
						<text className='text-md font-medium text-gray-700 w-64'>
							What did you try already to fix the problem?
						</text>
						<text className='text-md font-normal text-gray-600 w-64'>
							Have you tried any solutions from the knowledge base yet?
						</text>

					</div>

					<div className='w-full'>
						<InputTextArea />
					</div>
				</div>

				<Divider /> */}

				{/* <div className='w-72 flex gap-2'>
					<IconVideo size='24' color='stroke-primary-500 dark:stroke-gray-300' fill='fill-primary-500' />
				</div>
				<div className='w-72 flex gap-2 items-center'>
					<FeaturedIcon type={FeaturedIconType.PRIMARY} size={FeaturedIconSize.SM} icon={<IconVideo size='15' color='stroke-primary-500' fill='fill-primary-500' />} />
					<FeaturedIcon type={FeaturedIconType.PRIMARY} size={FeaturedIconSize.MD} icon={<IconVideo size='17' color='stroke-primary-500' fill='fill-primary-500' />} />
					<FeaturedIcon type={FeaturedIconType.PRIMARY} size={FeaturedIconSize.LG} icon={<IconVideo size='21' color='stroke-primary-500' fill='fill-primary-500' />} />
					<FeaturedIcon type={FeaturedIconType.PRIMARY} size={FeaturedIconSize.XL} icon={<IconVideo size='24' color='stroke-primary-500' fill='fill-primary-500' />} />
				</div>

				<div className='flex gap-x-2'>
					<InputField disabled={true} disabled_value={'Microsoft'} type={InputType.ICON} placeholder='First Name' icon={<IconBuilding size='20' color='stroke-gray-500 dark:stroke-white' fill='' />} />
					<InputField type={InputType.ICONLESS} placeholder='Last Name' />
				</div>

				<div>
					<InputTextArea placeholder='Enter some text...' />
				</div> */}

			</div>
		</div>
	);
}