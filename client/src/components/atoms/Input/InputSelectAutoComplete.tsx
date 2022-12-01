import { Combobox } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { countries as items } from "../../../utils/countries";
import { IconCheck } from "../Icons/Icons";

interface Props {
  label: string;
  options: string[];
  onChange: (payload: string) => void;
}

const InputSelectAutoComplete = ({ label, options, onChange }: Props) => {
  const [selectedItem, setSelectedItem] = useState(options[0]);
  const [query, setQuery] = useState("");

  const onChangeInput = (payload: string) => {
    onChange(payload);
    setSelectedItem(payload);
  };

  const filteredItems =
    query === ""
      ? options
      : options.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className='w-full'>
      <Combobox value={selectedItem} onChange={(value) => onChangeInput(value)}>
        <div className='relative'>
          <div className='mb-1.5'>
            <Combobox.Label className='font-medium text-gray-700 dark:text-dark-300'>{label}</Combobox.Label>
          </div>
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            className='hover:bg-gray-50 dark:hover:bg-dark-600 focus:outline-4 dark:outline-0 outline-primary-200 w-full rounded-lg mb-2 flex border bg-white text-gray-800 drop-shadow-sm border-gray-200 py-2.5 px-3.5 dark:text-white dark:font-normal dark:border-dark-600 dark:bg-dark-700'
          />
          <Combobox.Options className='w-full absolute bg-white z-40 focus:outline-4 outline-primary-200 dark:outline-0 cursor-pointer overflow-y-scroll no-scrollbar p-1.5 max-h-72 rounded-lg drop-shadow-sm dark:bg-dark-700 text-gray-800 flex flex-col gap-1 border border-gray-200 dark:text-white dark:font-normal dark:border-dark-600'>
            {filteredItems.map((item) => (
              <Combobox.Option key={item} value={item} as={Fragment}>
                {({ active }) => (
                  <div
                    className={`${active ? "bg-gray-50 dark:bg-dark-600" : undefined} ${
                      selectedItem == item ? "bg-gray-50 dark:bg-dark-600" : undefined
                    } rounded-lg flex justify-between px-2 py-2.5`}
                  >
                    <>
                      {item}

                      {item == selectedItem && (
                        <IconCheck size='24' color='stroke-primary-600' fill='stroke-primary-600' />
                      )}
                    </>
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
};

export default InputSelectAutoComplete;
