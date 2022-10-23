import React from "react";
import { useSelector } from "react-redux";
import { toggleBackdrop, toggleLanguageModal } from "../../../features/modal/modalSlice";
import { getCurrentLanguage, getUser } from "../../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { IconFlag } from "../../atoms/Icons/IconsFlags";
import { NavigationAdminMenu } from "./NavigationAdminMenu";
import { NavigationHeader } from "./NavigationHeader";
import { NavigationItem } from "./NavigationItem";
import { IconBell, IconBook, IconCube, IconHome, IconLogout, IconMoon, IconSun, IconTicket, IconTranslate, IconUser } from "../../atoms/Icons/Icons";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { Divider } from "../../atoms/Divider/Divider";
import { Link } from "react-router-dom";
import { ButtonIcon } from "../../atoms/Button/ButtonIcon";

var translations = require("../../../translations/sidebarTranslations.json");

export function NavigationSidebar() {
    const dispatch = useAppDispatch();
    const language: string = useSelector(getCurrentLanguage);
    const root = document.getElementsByTagName("html")[0];
    const user = useAppSelector(getUser);

    const openLanguageModal = () => {
        dispatch(toggleBackdrop());
        dispatch(toggleLanguageModal());
    };

    const toggleLightMode = () => {
        root.removeAttribute("class");
        localStorage.theme = "light";
    };

    const toggleDarkMode = () => {
        root.setAttribute("class", "dark");
        localStorage.theme = "dark";
    };

    return (
        <>
            {/* Navigation Header */}
            <div className='flex flex-col gap-y-6'>
                <div className='px-6'>
                    <NavigationHeader />
                </div>
                <ul className='flex flex-col gap-y-2 px-4'>
                    <NavigationItem
                        name={translations[language].dashboard}
                        url='dashboard'
                        icon={<IconHome size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                    />
                    <NavigationItem
                        name={translations[language].tickets}
                        url='tickets'
                        icon={
                            <IconTicket size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />
                        }
                    />
                    <NavigationItem
                        name={translations[language].knowledgebase}
                        url='knowledgebase'
                        icon={<IconBook size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                    />
                    <NavigationItem
                        name='Playground'
                        url='playground'
                        icon={<IconCube size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                    />
                    <NavigationAdminMenu />
                </ul>
            </div>
            {/* Navigation Footer */}
            <div className='flex flex-col gap-y-6 px-4'>
                <ul className='flex flex-col gap-y-2'>
                    <NavigationItem
                        name={translations[language].language}
                        onclick={openLanguageModal}
                        icon={<IconTranslate size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                    />
                    <NavigationItem
                        name={translations[language].notifications}
                        url='notifications'
                        icon={<IconBell size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                    />
                    {/* <NavigationItem
                        name={translations[language].account}
                        url='account'
                        icon={<IconUser size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                    /> */}
                </ul>
                <Divider />
                <div className='flex justify-between'>
                    <Link to='/account' className='flex ml-2 gap-3 items-center'>
                        <Avatar name='Lucas Prins' color='gray' />
                        <div className='flex flex-col'>
                            <span className='text-gray-700 text-sm font-semibold'>
                                {user.preposition
                                    ? `${user.firstName} ${user.preposition} ${user.lastName}`
                                    : `${user.firstName} ${user.lastName}`}
                            </span>
                            <span className='text-gray-500 text-sm'>{user.company.name}</span>
                        </div>
                    </Link>
                    <ButtonIcon onclick={() => console.log("Add logout functionality")} icon={<IconLogout size="20" color="stroke-gray-500" fill="fill-gray-500" />} />
                </div>

                {/* <div className='flex p-1 border w-full border-gray-300 dark:border-dark-500 gap-x-1 rounded-lg'>
                    <button
                        className='text-gray-700 dark:text-gray-400 dark:bg-dark-700 bg-gray-100 flex justify-center items-center gap-x-1.5 w-full rounded-lg py-3 dark:hover:bg-dark-600 dark:hover:text-white'
                        onClick={toggleLightMode}
                    >
                        <IconSun size={"20"} color='stroke-gray-700 dark:stroke-gray-400' fill='fill-gray-500' />
                        <span className='font-semibold dark:font-medium'>{translations[language].light}</span>
                    </button>
                    <button
                        className='text-gray-500 dark:text-white flex justify-center items-center gap-x-1.5 w-full rounded-lg dark:bg-dark-600 hover:bg-gray-100 hover:text-gray-700'
                        onClick={toggleDarkMode}
                    >
                        <IconMoon size={"18"} color='stroke-gray-500 dark:stroke-gray-200' fill='fill-gray-500' />
                        <span className='font-semibold dark:font-medium'>{translations[language].dark}</span>
                    </button>
                </div> */}
            </div>
        </>
    );
}
