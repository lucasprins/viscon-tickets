import React from 'react'
import { useSelector } from 'react-redux'
import { toggleBackdrop, toggleLanguageModal } from '../../features/modal/modalSlice'
import { getCurrentLanguage } from '../../features/user/userSlice'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { IconFlag } from '../Icons/IconFlag'
import { IconBell } from '../Icons/IconBell'
import { IconBook } from '../Icons/IconBook'
import { IconCube } from '../Icons/IconCube'
import { IconGlobe } from '../Icons/IconGlobe'
import { IconHome } from '../Icons/IconHome'
import { IconMoon } from '../Icons/IconMoon'
import { IconSun } from '../Icons/IconSun'
import { IconTicket } from '../Icons/IconTicket'
import { IconUser } from '../Icons/IconUser'
import { NavigationAdminMenu } from './NavigationAdminMenu'
import { NavigationHeader } from './NavigationHeader'
import { NavigationItem } from './NavigationItem'

export enum LanguagesEnum {
    NL
}

var translations = require('../../translations/SidebarTranslations.json');

export function NavigationSidebar() {
    const dispatch = useAppDispatch();
    const language: string = useSelector(getCurrentLanguage);
    const root = document.getElementsByTagName('html')[0];

	const openLanguageModal = () => {
        dispatch(toggleBackdrop());
		dispatch(toggleLanguageModal());
	}

    const toggleLightMode = () => {
        root.removeAttribute('class');
        localStorage.theme = 'light';
    };

    const toggleDarkMode = () => {
        root.setAttribute('class', 'dark');
        localStorage.theme = 'dark';
    }

	return (
        <>
            {/* Navigation Header */}
            <div className='flex flex-col gap-y-6'>
                <NavigationHeader />
                <ul className='flex flex-col gap-y-2 px-4'>
                    <NavigationItem name={translations[language].dashboard} url='dashboard' icon={<IconHome size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />
                    <NavigationItem name={translations[language].tickets} url='tickets' icon={<IconTicket size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />
                    <NavigationItem name={translations[language].knowledgebase} url='knowledgebase' icon={<IconBook size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />
                    <NavigationItem name="Playground" url='playground' icon={<IconCube size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />
                    <NavigationAdminMenu />
                </ul>
            </div>
            {/* Navigation Footer */}
            <div className='flex flex-col gap-y-6 px-4'>
                <ul className='flex flex-col gap-y-2'>
                    <NavigationItem name={translations[language].language} onclick={openLanguageModal} icon={<IconFlag language={language} size='24' />} />
                    <NavigationItem name={translations[language].notifications} url='notifications' icon={<IconBell size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />
                    <NavigationItem name={translations[language].account} url='account' icon={<IconUser size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />
                </ul>
                <div className='flex p-1 border w-full border-gray-300 dark:border-dark-500 gap-x-1 rounded-lg'>
                    {/* Enable Lightmode */}
                    <button
                        className='text-gray-700 dark:text-gray-400 dark:bg-dark-700 bg-gray-100 flex justify-center items-center gap-x-1.5 w-full rounded-lg py-3 dark:hover:bg-dark-600 dark:hover:text-white'
                        onClick={toggleLightMode}>
                        <IconSun size={'20'} color='stroke-gray-700 dark:stroke-gray-400' fill='fill-gray-500' />
                        <span className='font-semibold dark:font-medium'>{translations[language].light}</span>
                    </button>
                    {/* Enable Darkmode */}
                    <button
                        className='text-gray-500 dark:text-white flex justify-center items-center gap-x-1.5 w-full rounded-lg dark:bg-dark-600 hover:bg-gray-100 hover:text-gray-700'
                        onClick={toggleDarkMode}>
                        <IconMoon size={'18'} color='stroke-gray-500 dark:stroke-gray-200' fill='fill-gray-500' />
                        <span className='font-semibold dark:font-medium'>{translations[language].dark}</span>
                    </button>
                </div>
            </div>
        </>
	);
}