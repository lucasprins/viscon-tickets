import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Button } from '../Button/Button';
import { FeaturedIcon } from '../FeaturedIcon/FeaturedIcon';
import { IconAlert } from '../Icons/IconAlert';
import { IconCheck } from '../Icons/IconCheck';

type ModalProps = {
	type: 'primary' | 'error' | 'success',
	title: string,
	subtitle?: string,
	is_open: boolean,
	close_modal: () => any,
	button_primary_text: string,
	button_secondary_text: string,
	button_primary_onclick?: () => any,
	button_secondary_onclick?: () => any
}

export function Modal({ type, title, subtitle, is_open, close_modal, button_primary_text, button_secondary_text, button_primary_onclick, button_secondary_onclick }: ModalProps) {
	let modalIconType: "primary" | "gray" | "error" | "success";
	let modalIcon;
	let modalButtonColor: 'primary' | 'secondary-gray' | 'secondary-color' | 'tertiary-gray' | 'tertiary-color' | 'error';

	switch (type) {
		//PRIMARY asks the user if they are sure about choice
		case 'primary':
			modalIcon = <IconAlert size='24' color='stroke-primary-500' fill='fill-primary-500' />;
			modalIconType = "primary";
			modalButtonColor = 'primary';
			break;
		//ERROR is used when error appears or if user is going to quit (premature) without saving it ;)
		case 'error':
			modalIcon = <IconAlert size='24' color='stroke-error-500' fill='fill-error-500' />;
			modalIconType = "error";
			modalButtonColor = 'error';
			break;
		//SUCCES is used when an interaction from user has been succesfull completed. Like sending filled in ticket
		case 'success':
			modalIcon = <IconCheck size='24' color='stroke-success-500' fill='fill-succes-500' />;
			modalIconType = "success";
			modalButtonColor = 'primary';
			break;
	}

	return (
		<Transition
			appear show={is_open}
			as={Fragment}
			enter="ease-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100"
			leaveTo="opacity-0">

			<Dialog className="z-50 absolute inset-0 flex items-center p-6 justify-center" open={is_open} onClose={close_modal}>
				<Dialog.Panel className="w-full lg:w-96 flex flex-col items-center justify-center rounded-2xl bg-white p-6 gap-8 dark:bg-dark-800 drop-shadow transition-all">
					<div className='flex flex-col justify-center items-center gap-5'>
						<FeaturedIcon type={modalIconType} size="md" icon={modalIcon} />
						<div className='flex flex-col text-center gap-2'>
							<h3 className="text-gray-900 dark:text-white text-lg font-semibold">{title}</h3>
							<p className='text-sm text-gray-600 dark:text-dark-300'>{subtitle}</p>
						</div>
					</div>
					{/* Modal Actions */}
					<div className='flex w-full gap-3'>
						<Button
							size='medium'
							type='secondary-gray'
							text={button_secondary_text}
							width='full'
							onclick={button_secondary_onclick}
						/>
						<Button
							size='medium'
							type={modalButtonColor}
							text={button_primary_text}
							width='full'
							onclick={button_primary_onclick}
						/>
					</div>
				</Dialog.Panel>
			</Dialog>
		</Transition>
	)
}