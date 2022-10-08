import { Dialog } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { getLanguageModal, toggleBackdrop, toggleLanguageModal } from '../../features/modal/modalSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {setLanguage } from '../../features/user/userSlice';

export function ModalChangeLanguage() {
    const dispatch = useAppDispatch();
    let isOpen = useAppSelector(getLanguageModal);

	const openModal = () => {
		dispatch(toggleLanguageModal());
	};

    const closeModal = () => {
        dispatch(toggleBackdrop());
        dispatch(toggleLanguageModal());
    }

    const changeLanguage = (language: string) => {
        dispatch(setLanguage(language));
        closeModal();
    };

    return (
        <Dialog className='z-50 absolute inset-0 flex items-center justify-center' open={isOpen} onClose={closeModal}>
            <Dialog.Panel className='bg-white w-max flex flex-col gap-4'>
                <Dialog.Title>Deactivate account</Dialog.Title>
                <Dialog.Description>
                    This will permanently deactivate your account
                </Dialog.Description>

                <button onClick={() => changeLanguage('nl')}>NL</button>
                <button onClick={() => changeLanguage('en')}>EN</button>

                <button onClick={closeModal}>Cancel</button>
            </Dialog.Panel>
        </Dialog>
    )
}