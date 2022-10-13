import React, { Fragment, useState } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { NavigationItem } from './NavigationItem';
import { useAppSelector } from '../../../utils/hooks';
import { getCurrentLanguage } from '../../../features/user/userSlice';
import { IconBuilding, IconChevron, IconGear, IconLightbulb, IconUsers } from '../../atoms/Icons/Icons';

var translations = require('../../../translations/sidebarTranslations.json');

export function NavigationAdminMenu() {
    const language: string = useAppSelector(getCurrentLanguage);
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
                    <Transition
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Disclosure.Panel>
                            <div className='absolute backdrop-blur-lg md:bg-white dark:bg-dark-600 md:dark:bg-dark-700 rounded-md py-1.5 w-64 flex flex-col gap-y-3'>
                                <div className='flex flex-col gap-y-2'>
                                    {navigationItems.map((item) => (
                                        <div key={item.props.name}>{item}</div>
                                    ))}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}