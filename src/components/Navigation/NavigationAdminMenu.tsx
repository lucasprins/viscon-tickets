import React, { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { IconBuilding } from '../Icons/IconBuilding';
import { IconGear } from '../Icons/IconGear';
import { IconLightbulb } from '../Icons/IconLightbulb';
import { IconUsers } from '../Icons/IconUsers';
import { NavigationItem } from './NavigationItem';
import { IconChevron } from '../Icons/IconChevron';

var translations = require('../../translations/SidebarTranslations.json');

export function NavigationAdminMenu() {
    const [language, setLanguage] = useState('en');
    const [userType, setUserType] = useState('viscon');
    const [userIsAdmin, setUserIsAdmin] = useState(true);

    let navigationItems: JSX.Element[] = [];

    if (userType === 'customer') {
        navigationItems = [
            <NavigationItem name={translations[language].manage_users} url='admin/users' icon={<IconUsers size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />
        ]
    } else if (userType === 'viscon') {
        navigationItems = [
            <NavigationItem name={translations[language].manage_users} url='admin/users' icon={<IconUsers size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />,
            <NavigationItem name={translations[language].manage_customers} url='admin/customers' icon={<IconBuilding size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />,
            <NavigationItem name={translations[language].manage_machines} url='admin/machines' icon={<IconGear size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />,
            <NavigationItem name={translations[language].manage_solutions} url='admin/solutions' icon={<IconLightbulb size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />} />
        ]
    };

    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <div className='w-100 flex hover:bg-gray-100 dark:hover:bg-dark-600 rounded-md'>
                        <Disclosure.Button className='flex items-center px-3 py-2 w-72 justify-between'>
                            <h1 className='font-semibold text-gray-700 dark:text-white'>Admin</h1>
                            <IconChevron size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' direction={open ? 'down' : 'up'} />
                        </Disclosure.Button>
                    </div>
                    <Disclosure.Panel>
                        <div className='absolute bg-gray-100 md:bg-white dark:bg-dark-600 md:dark:bg-dark-700 rounded-md py-1.5 w-64 flex flex-col gap-y-3'>
                            <div className='flex flex-col gap-y-2'>
                                {navigationItems.map((item) => (
                                    <div key={item.props.name}>{item}</div>
                                ))}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
