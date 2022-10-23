import React , { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { getLanguageModal, toggleBackdrop, toggleLanguageModal } from '../../../features/modal/modalSlice'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import { getCurrentLanguage, setLanguage } from '../../../features/user/userSlice';
import { Button } from '../../atoms/Button/Button';
import { ButtonIcon } from '../../atoms/Button/ButtonIcon';
import { IconFlag } from '../../atoms/Icons/IconsFlags';
import { IconCheck, IconClose } from '../../atoms/Icons/Icons';

var translations = require('../../../translations/modalTranslations.json');

export function ModalChangeLanguage() {
    const dispatch = useAppDispatch();
    const language = useAppSelector(getCurrentLanguage);
    let isOpen = useAppSelector(getLanguageModal);

    const closeModal = () => {
        dispatch(toggleBackdrop());
        dispatch(toggleLanguageModal());
    }

    const changeLanguage = (language: string) => {
        dispatch(setLanguage(language));
    };

    return (
        <Transition
            appear show={isOpen}
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">

            <Dialog className='z-50 absolute inset-0 flex items-center p-6 lg:p-0 justify-center' open={isOpen} onClose={closeModal}>
                <Dialog.Panel className='bg-white dark:bg-dark-800 w-full lg:w-96 flex flex-col items-center gap-6 p-6 rounded-xl drop-shadow'>
                    <div className='flex justify-between items-center w-full'>
                        <Dialog.Title className='text-gray-900 dark:text-white text-xl font-semibold'>{translations[language].selectLanguage}</Dialog.Title>
                        <ButtonIcon icon={<IconClose size='20' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} onclick={closeModal} />
                    </div>
                    <div className='flex flex-col w-full gap-4'>
                        <div className='flex items-center gap-4'>
                            <IconFlag language='nl' size='32' />
                            <Button
                                size='medium'
                                width='full'
                                type={language === 'nl' ? 'secondary-color' : 'tertiary-gray'}
                                text="Nederlands"
                                icon={language === 'nl' ? <IconCheck size='20' color='stroke-primary-500 dark:stroke-white' fill='fill-gray-500' /> : undefined}
                                onclick={() => changeLanguage('nl')}
                            />
                        </div>
                        <div className='flex items-center gap-4'>
                            <IconFlag language='en' size='32' />
                            <Button
                                size='medium'
                                width='full'
                                type={language === 'en' ? 'secondary-color' : 'tertiary-gray'}
                                text="English"
                                icon={language === 'en' ? <IconCheck size='20' color='stroke-primary-500 dark:stroke-white' fill='fill-gray-500' /> : undefined}
                                onclick={() => changeLanguage('en')}
                            />
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    )
}