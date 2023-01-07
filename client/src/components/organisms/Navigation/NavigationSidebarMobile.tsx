import { Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import { useModalContext } from "../../../utils/hooks";
import { NavigationSidebar } from "./NavigationSidebar";

type NavigationSidebarMobileType = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

export function NavigationSidebarMobile({ state, setState }: NavigationSidebarMobileType) {
  return (
    <>
      <Transition
        appear
        show={state}
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-60'
        leave='ease-in duration-200'
        leaveFrom='opacity-60'
        leaveTo='opacity-0'
      >
        <div
          onClick={() => setState(false)}
          className={state ? `z-30 fixed inset-0 w-100 h-100 bg-dark-900 opacity-40 dark:opacity-70` : "hidden"}
        ></div>
      </Transition>
      <aside
        className={
          state
            ? "h-full w-72 transition-all duration-500 fixed inset-0 z-30 flex md:hidden flex-col justify-between border-r py-8 bg-white dark:border-dark-600 dark:bg-dark-800"
            : "-translate-x-full transition-all duration-500 h-full w-72 fixed inset-0 z-50 border-r md:hidden flex flex-col justify-between py-8 bg-white dark:border-dark-600 dark:bg-dark-800"
        }
      >
        <NavigationSidebar />
      </aside>
    </>
  );
}
