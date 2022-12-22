import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useModalContext } from "../../../utils/hooks";

/**
 *
 * @param state - Boolean to determine if the backdrop should be visible or not
 * @param z_index - TailwindCSS z-index property
 * @param close - Function to close the backdrop
 * @returns JSX.Element
 */
export default function Backdrop({ close }: { close?: () => any }) {
  const { modalState } = useModalContext();
  const active = modalState.backdrop;
  
  return (
    <Transition
      appear
      show={active}
      as={Fragment}
      enter='ease-out duration-300'
      enterFrom='opacity-0'
      enterTo='opacity-60'
      leave='ease-in duration-200'
      leaveFrom='opacity-60'
      leaveTo='opacity-0'
    >
      <div
        onClick={close}
        className={active ? `${modalState.backdropIndex} fixed inset-0 w-100 h-100 bg-dark-900 opacity-40 dark:opacity-70` : "hidden"}
      ></div>
    </Transition>
  );
}
