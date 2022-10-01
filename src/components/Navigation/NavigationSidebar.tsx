import React from 'react'
import { IconBell } from '../Icons/IconBell'
import { IconBook } from '../Icons/IconBook'
import { IconCube } from '../Icons/IconCube'
import { IconGlobe } from '../Icons/IconGlobe'
import { IconHome } from '../Icons/IconHome'
import { IconMoon } from '../Icons/IconMoon'
import { IconSun } from '../Icons/IconSun'
import { IconTicket } from '../Icons/IconTicket'
import { IconUser } from '../Icons/IconUser'
import { NavigationHeader } from './NavigationHeader'
import { NavigationItem } from './NavigationItem'

var translations = require('../../pages/Dashboard/DashboardTranslations.json');

export function NavigationSidebar() {
    const [ language, setLanguage ] = React.useState('en');
    const root = document.getElementsByTagName('html')[0];

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
                    <NavigationItem name={translations[language].dashboard} url='' icon={<IconHome size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />
                    <NavigationItem name={translations[language].tickets} url='tickets' icon={<IconTicket size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />
                    <NavigationItem name={translations[language].knowledgebase} url='knowledgebase' icon={<IconBook size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />
                    <NavigationItem name="Playground" url='playground' icon={<IconCube size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />
                </ul>
            </div>
            {/* Navigation Footer */}
            <div className='flex flex-col gap-y-6 px-4'>
                <ul className='flex flex-col gap-y-2'>
                    <NavigationItem name={translations[language].language} url='language' icon={<IconGlobe size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />
                    <NavigationItem name={translations[language].notifications} url='notifications' icon={<IconBell size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />
                    <NavigationItem name={translations[language].account} url='account' icon={<IconUser size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />
                </ul>
                <div className='flex p-1 border border-gray-200 dark:border-dark-500 gap-x-1 rounded-lg'>
                    {/* Enable Lightmode */}
                    <button
                        className='text-gray-700 dark:text-gray-400 dark:bg-dark-700 bg-gray-100 flex justify-center items-center gap-x-1.5 w-full rounded-lg py-3 dark:hover:bg-dark-600 dark:hover:text-white'
                        onClick={toggleLightMode}>
                        <IconSun size={'20'} color='stroke-gray-700 dark:stroke-gray-400' fill='fill-gray-500' />
                        <span className='font-semibold dark:font-medium'>Light</span>
                    </button>
                    {/* Enable Darkmode */}
                    <button
                        className='text-gray-500 dark:text-white flex justify-center items-center gap-x-1.5 w-full rounded-lg dark:bg-dark-600 hover:bg-gray-100 hover:text-gray-700'
                        onClick={toggleDarkMode}>
                        <IconMoon size={'18'} color='stroke-gray-500 dark:stroke-gray-200' fill='fill-gray-500' />
                        <span className='font-semibold dark:font-medium'>Dark</span>
                    </button>
                </div>
            </div>
        </>
	);
}