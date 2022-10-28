import React, { Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { getMachines, getSelectedMachine, setSelectedMachine } from "../../../features/machines/machinesSlice";
import { MachineType } from "../../../utils/types";
import { IconCheck, IconChevron } from "../Icons/Icons";

type DropdownSelectProps = {
    label?: string;
};

export function InputDropdownMachine({ label }: DropdownSelectProps) {
    const machines = useAppSelector(getMachines);
    const selectedMachine = useAppSelector(getSelectedMachine);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSelectedMachine(machines[0]));
    }, [dispatch]);

    const onChange = (payload: MachineType) => {
        dispatch(setSelectedMachine(payload));
    };

    return (
        <div>
            <Listbox value={selectedMachine} onChange={onChange}>
                <div className='relative'>
                    <div className='mb-1.5'>
                        <Listbox.Label className='text-sm font-medium text-gray-700 dark:text-dark-300'>
                            {label}
                        </Listbox.Label>
                    </div>
                    <Listbox.Button className='hover:bg-gray-50 dark:hover:bg-dark-600 focus:outline-4 dark:outline-0 outline-primary-200 w-full rounded-lg mb-2 flex border bg-white text-gray-800 font-medium drop-shadow-sm border-gray-200 py-2.5 px-3.5 dark:text-white dark:font-normal dark:border-dark-600 dark:bg-dark-700'>
                        {({ open }) => (
                            <div className='flex justify-between w-full'>
                                {selectedMachine.name}
                                <IconChevron
                                    size='24'
                                    color='stroke-gray-500 dark:stroke-gray-300'
                                    fill='fill-gray-500'
                                    direction={open ? "down" : "up"}
                                />
                            </div>
                        )}
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Listbox.Options className='w-full absolute bg-white z-40 focus:outline-4 outline-primary-200 dark:outline-0 cursor-pointer overflow-y-scroll no-scrollbar p-1.5 max-h-72 rounded-lg drop-shadow-sm dark:bg-dark-700 text-gray-800 font-medium flex flex-col gap-1 border border-gray-200 dark:text-white dark:font-normal dark:border-dark-600'>
                            {machines.map((machine: MachineType) => (
                                <Listbox.Option key={machine.machineId} value={machine}>
                                    {({ active, selected }) => (
                                        <div
                                            className={`${active ? "bg-gray-50 dark:bg-dark-600" : undefined} ${
                                                selected ? "bg-gray-50 dark:bg-dark-600" : undefined
                                            }
                                                rounded-lg flex justify-between px-2 py-2.5`}
                                        >
                                            {machine.name}
                                            {selected && (
                                                <IconCheck
                                                    size='24'
                                                    color='stroke-primary-600'
                                                    fill='stroke-primary-600'
                                                />
                                            )}
                                        </div>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
