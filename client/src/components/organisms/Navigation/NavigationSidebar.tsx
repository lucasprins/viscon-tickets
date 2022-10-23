import React from "react";
import { useSelector } from "react-redux";
import { toggleBackdrop, toggleLanguageModal } from "../../../features/modal/modalSlice";
import { getCurrentLanguage, getUser } from "../../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { IconFlag } from "../../atoms/Icons/IconsFlags";
import { NavigationAdminMenu } from "./NavigationAdminMenu";
import { NavigationHeader } from "./NavigationHeader";
import { NavigationItem } from "./NavigationItem";
import {
    IconBell,
    IconBook,
    IconCube,
    IconHome,
    IconLogout,
    IconMoon,
    IconSun,
    IconTicket,
    IconTranslate,
    IconUser,
} from "../../atoms/Icons/Icons";
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

    const toggleAppearance = () => {
        if (localStorage.getItem("theme") === "dark") {
            localStorage.setItem("theme", "light");
            root.classList.remove("dark");
        } else {
            localStorage.setItem("theme", "dark");
            root.classList.add("dark");
        }
    };

    return (
        <>
            {/* Navigation Header */}
            <div className='flex flex-col gap-y-6'>
                <div className='pl-6 pr-4'>
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
                        name={translations[language].appearance}
                        onclick={toggleAppearance}
                        icon={<IconSun size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                    />
                    <NavigationItem
                        name={translations[language].language}
                        onclick={openLanguageModal}
                        icon={
                            <IconTranslate
                                size='24'
                                color='stroke-gray-500 dark:stroke-gray-300'
                                fill='fill-gray-500'
                            />
                        }
                    />
                    <NavigationItem
                        name={translations[language].notifications}
                        url='notifications'
                        icon={<IconBell size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                    />
                </ul>

                <Divider />
                <div className='flex justify-between'>
                    <Link to='/account' className='flex ml-2 gap-3 items-center'>
                        <Avatar name='Lucas Prins' color='gray' />
                        <div className='flex flex-col'>
                            <span className='text-gray-700 dark:text-white text-sm font-semibold'>
                                {user.preposition
                                    ? `${user.firstName} ${user.preposition} ${user.lastName}`
                                    : `${user.firstName} ${user.lastName}`}
                            </span>
                            <span className='text-gray-500 dark:text-dark-300 text-sm'>{user.company.name}</span>
                        </div>
                    </Link>
                    <ButtonIcon
                        onclick={() => console.log("Add logout functionality")}
                        icon={<IconLogout size='20' color='stroke-gray-500' fill='fill-gray-500' />}
                    />
                </div>
            </div>
        </>
    );
}
