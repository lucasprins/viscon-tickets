import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppContext, useModalContext } from "../../../utils/hooks";
import { Button } from "../../atoms/Button/Button";
import { ButtonIcon } from "../../atoms/Button/ButtonIcon";
import { IconFlag } from "../../atoms/Icons/IconsFlags";
import { IconCheck, IconClose } from "../../atoms/Icons/Icons";

var translations = require("../../../translations/allTranslations.json");

export function ModalChangeLanguage() {
  const { appState, appDispatch } = useAppContext();
  const { modalState, modalDispatch } = useModalContext();

  const language = appState.language;
  let isOpen = modalState.language;

  const closeModal = () => {
    modalDispatch({ type: "TOGGLE_LANGUAGE"});
    modalDispatch({ type: "TOGGLE_BACKDROP"});
  };

  const changeLanguage = (language: string) => {
    appDispatch({ type: "CHANGE_LANGUAGE", payload: language });
  };

  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
      enter='ease-out duration-300'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='ease-in duration-300'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <Dialog
        className='absolute inset-0 z-50 flex items-center justify-center p-6 lg:p-0'
        open={isOpen}
        onClose={closeModal}
      >
        <Dialog.Panel className='flex flex-col items-center w-full gap-6 p-6 bg-white dark:bg-dark-800 lg:w-96 rounded-xl drop-shadow'>
          <div className='flex items-center justify-between w-full'>
            <Dialog.Title className='text-xl font-semibold text-gray-900 dark:text-white'>
              {translations[language].selectLanguage}
            </Dialog.Title>
            <ButtonIcon
              icon={<IconClose size='20' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
              onclick={closeModal}
            />
          </div>
          <div className='flex flex-col w-full gap-4'>
            <div className='flex items-center gap-4'>
              <IconFlag language='nl' size='32' />
              <Button
                size='medium'
                width='full'
                type={language === "nl" ? "secondary-color" : "tertiary-gray"}
                text='Nederlands'
                icon={
                  language === "nl" ? (
                    <IconCheck size='20' color='stroke-primary-500 dark:stroke-white' fill='fill-gray-500' />
                  ) : undefined
                }
                onclick={() => changeLanguage("nl")}
              />
            </div>
            <div className='flex items-center gap-4'>
              <IconFlag language='en' size='32' />
              <Button
                size='medium'
                width='full'
                type={language === "en" ? "secondary-color" : "tertiary-gray"}
                text='English'
                icon={
                  language === "en" ? (
                    <IconCheck size='20' color='stroke-primary-500 dark:stroke-white' fill='fill-gray-500' />
                  ) : undefined
                }
                onclick={() => changeLanguage("en")}
              />
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}
