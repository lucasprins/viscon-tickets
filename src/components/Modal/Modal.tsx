import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Button, ButtonSize, ButtonType, ButtonWidth } from '../Button/Button';
import { FeaturedIcon, FeaturedIconSize, FeaturedIconType } from '../FeaturedIcon/FeaturedIcon';
import { IconAlert } from '../Icons/IconAlert';
import { IconCheck } from '../Icons/IconCheck';

type ModalProps = {
	type: 'primary' | 'error' | 'success',
	title: string,
	subtitle?: string,
	button_primary_text: string,
	button_secondary_text: string,
	button_primary_onclick?: () => any,
	button_secondary_onclick?: () => any
}

export function Modal({ type, title, subtitle, button_primary_text, button_secondary_text, button_primary_onclick, button_secondary_onclick }: ModalProps) {
	let [isOpen, setIsOpen] = useState(true)
	let modalIconType;
	let modalIcon;
	let modalButtonColor;

	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}

	switch (type) {
		//PRIMARY asks the user if they are sure about choice
		case 'primary':
			modalIcon = <IconAlert size='24' color='stroke-primary-500' fill='fill-primary-500' />;
			modalIconType = FeaturedIconType.PRIMARY;
			modalButtonColor = ButtonType.PRIMARY
			break;
		//ERROR is used when error appears or if user is going to quit (premature) without saving it ;)
		case 'error':
			modalIcon = <IconAlert size='24' color='stroke-error-500' fill='fill-error-500' />;
			modalIconType = FeaturedIconType.ERROR;
			modalButtonColor = ButtonType.SECONDARY_RED;
			break;
		//SUCCES is used when an interaction from user has been succesfull completed. Like sending filled in ticket
		case 'success':
			modalIcon = <IconCheck size='24' color='stroke-success-500' fill='fill-succes-500' />;
			modalIconType = FeaturedIconType.SUCCESS;
			modalButtonColor = ButtonType.PRIMARY;
			break;
	}

	return (
		//This button is pure used to trigger the modal
		<>
			<div className="flex items-center justify-center">
				<Button
					size={ButtonSize.LARGE}
					type={ButtonType.PRIMARY}
					text='test'
					width={ButtonWidth.CONTENT}
					onclick={openModal}
				/>
			</div>

			<Transition
				appear show={isOpen}
				as={Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0">

				<Dialog className="z-50 absolute inset-0 flex items-center p-6 lg:p-0 justify-center" open={isOpen} onClose={closeModal}>
					<Dialog.Panel className="w-full lg:w-96 flex flex-col items-center justify-center rounded-2xl bg-white p-6 gap-8 dark:bg-dark-800 drop-shadow transition-all">
						<div className='flex flex-col justify-center items-center gap-5'>
							<FeaturedIcon type={modalIconType} size={FeaturedIconSize.MD} icon={modalIcon} />
							<div className='flex flex-col text-center gap-2'>
								<h3 className="text-gray-900 dark:text-white text-lg font-semibold">{title}</h3>
								<p className='text-sm text-gray-600 dark:text-dark-300'>{subtitle}</p>
							</div>
						</div>
						{/* Modal Actions */}
						<div className='flex w-full gap-3'>
							<Button
								size={ButtonSize.MEDIUM}
								type={ButtonType.SECONDARY_GRAY}
								text={button_secondary_text}
								width={ButtonWidth.FULL}
								onclick={closeModal}
							/>
							<Button
								size={ButtonSize.MEDIUM}
								type={modalButtonColor}
								text={button_primary_text}
								width={ButtonWidth.FULL}
								onclick={closeModal}
							/>
						</div>
					</Dialog.Panel>
				</Dialog>
			</Transition>
		</>
	)
}