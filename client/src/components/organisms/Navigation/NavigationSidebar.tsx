import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppContext, useAppDispatch, useAppSelector, useModalContext } from "../../../utils/hooks";
import { NavigationHeader } from "./NavigationHeader";
import { NavigationItem } from "./NavigationItem";
import {
  IconBell,
  IconBook,
  IconCube,
  IconHome,
  IconKey,
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
import AuthService from "../../../features/auth/authService";

var translations = require("../../../translations/allTranslations.json");

export function NavigationSidebar() {
  const { appState, appDispatch } = useAppContext();
  const { modalDispatch } = useModalContext();
  const user = appState.user;

  const dispatch = useAppDispatch();
  const language: string = appState.language;
  const root = document.getElementsByTagName("html")[0];

  const openLanguageModal = () => {
    modalDispatch({ type: "TOGGLE_LANGUAGE"});
    modalDispatch({ type: "TOGGLE_BACKDROP"});
  };

  const toggleAppearance = () => {
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
      root.classList.remove("dark");
      root.classList.remove("dark-scrollbar");
    } else {
      localStorage.setItem("theme", "dark");
      root.classList.add("dark");
      root.classList.add("dark-scrollbar");
    }
  };

  const handleLogout = useCallback(() => {
    AuthService.logout();
    appDispatch({ type: "USER_LOGOUT" });

  }, [dispatch]);

  return (
    <>
      {/* Navigation Header */}
      <div className='flex flex-col gap-y-6'>
        <div className='pl-6 pr-4'>
          <NavigationHeader />
        </div>
        <ul className='flex flex-col px-4 gap-y-2'>
          {/* <NavigationItem
            name={translations[language].dashboard}
            url='dashboard'
            icon={<IconHome size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
          /> */}
          <NavigationItem
            name={translations[language].tickets}
            url='tickets'
            icon={<IconTicket size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
          />
          <NavigationItem
            name={translations[language].knowledgebase}
            url='knowledgebase'
            icon={<IconBook size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
          />

          <NavigationItem
            name={translations[language].account}
            url='account'
            icon={<IconUser size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
          />

          {user?.role === "VisconAdmin" || user?.role === "CustomerAdmin" ? <NavigationItem
            name='Admin'
            url='admin'
            icon={<IconKey size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
          /> : null}
        </ul>
      </div>

      {/* Navigation Footer */}
      <div className='flex flex-col px-4 gap-y-6'>
        <ul className='flex flex-col gap-y-2'>
          <NavigationItem
            name={translations[language].appearance}
            onclick={toggleAppearance}
            icon={<IconSun size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
          />
          <NavigationItem
            name={translations[language].language}
            onclick={openLanguageModal}
            icon={<IconTranslate size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
          />
        </ul>

        <Divider />
        <div className='flex justify-between'>
          <Link to='/account' className='flex items-center gap-3 ml-2'>
            <Avatar name={user?.firstName + " " + user?.lastName} color='gray' />
            <div className='flex flex-col'>
              <span className='text-sm font-semibold text-gray-700 dark:text-white'>
                {`${user?.firstName} ${user?.lastName}`}
              </span>
              <span className='text-sm text-gray-500 dark:text-dark-300'>{user?.company.name}</span>
            </div>
          </Link>
          <ButtonIcon
            onclick={handleLogout}
            icon={<IconLogout size='20' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
          />
        </div>
      </div>
    </>
  );
}
