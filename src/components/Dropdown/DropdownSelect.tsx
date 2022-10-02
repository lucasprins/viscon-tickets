import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { MachineType } from '../../types/MachineType';
import { IconCheck } from '../Icons/IconCheck';
import '../../index.css';
import { IconChevron } from '../Icons/IconChevron';

type DropdownSelectProps = {
    machines: Array<MachineType> // We get a list of machine names
    label?: string
}

export function DropdownSelectMachine({ machines, label }: DropdownSelectProps) {
    const [selectedMachine, setSelectedMachine] = useState(machines[0]);

    return (
        <Listbox value={selectedMachine} onChange={setSelectedMachine}>
            <div className='mb-1.5'>
                <Listbox.Label className='text-sm font-medium text-gray-700 dark:text-dark-300'>{label}</Listbox.Label>
            </div>
            <Listbox.Button className='w-full rounded-lg mb-2 flex border bg-white text-gray-800 font-medium shadow-sm border-gray-200 py-2.5 px-3.5 dark:text-white dark:font-normal dark:border-dark-500 dark:bg-dark-700'>
                {({ open }) => (
                    <div className='flex justify-between w-full'>
                        {selectedMachine.name}
                        <IconChevron size='24' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' direction={open ? 'down' : 'up'} />
                    </div>
                )}
            </Listbox.Button>
            <Listbox.Options className='z-index cursor-pointer 50 overflow-y-scroll p-1.5 h-64 rounded-lg shadow dark:bg-dark-700 text-gray-800 font-medium flex flex-col gap-1 border border-gray-200 dark:text-white dark:font-normal dark:border-dark-500'>
                {machines.map((machine) => (
                    <Listbox.Option key={machine.machine_id} value={machine}>
                        {({ active, selected }) => (
                            <div className=
                                {`${active ? 'bg-gray-50 dark:bg-dark-600' : undefined} ${selected ? 'bg-gray-50 dark:bg-dark-600' : undefined}
                            rounded-lg flex justify-between px-2 py-2.5`}>
                                {machine.name}
                                {selected && <IconCheck size='24' color='stroke-primary-600' fill='stroke-primary-600' />}
                            </div>
                        )}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    )
}
