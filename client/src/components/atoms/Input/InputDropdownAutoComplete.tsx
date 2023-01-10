import { Combobox } from "@headlessui/react";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useAppContext } from "../../../utils/hooks";
import { IconCheck } from "../Icons/Icons";

type Props<T> = {
  label?: string;
  options: T[];
  selectedOption: T;
  selectedKey: keyof T;
  identifier: keyof T;
  onchange: (payload: T) => void;
};

function InputDropdownAutoComplete<T extends unknown>({
  label,
  options,
  selectedOption,
  selectedKey,
  onchange,
  identifier,
}: Props<T>) {
  const [query, setQuery] = useState("");
  const language = useAppContext().appState.language;

  let filteredItems: T[] = [];
  if (typeof selectedKey === "string") {
    filteredItems = options.filter((item) => {
      const itemValue = `${item[selectedKey]}`;
      if(itemValue === "") {
        return;
      }
      return itemValue.toLowerCase().includes(query.toLowerCase());
    });
  } else {
    throw new Error("selectedKey must be a string");
  }

  return (
    <div className='w-full'>
      <Combobox value={selectedOption} onChange={onchange}>
        <div className='relative'>
          {label !== undefined && (
            <div className='mb-1.5'>
              <Combobox.Label className='text-sm font-medium text-gray-700 dark:text-dark-300'>{label}</Combobox.Label>
            </div>
          )}
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(item: T) => (item ? `${item[selectedKey]}` : "")}
            className='focus:outline-4 font-medium outline-primary-500 dark:outline-0 w-full rounded-lg flex border bg-white text-gray-800 drop-shadow-sm border-gray-200 py-2.5 px-3.5 dark:text-white dark:font-normal dark:border-dark-600 dark:bg-dark-700'
          />
          <Combobox.Options className='w-full absolute bg-white z-40 focus:outline-4 outline-primary-200 dark:outline-0 cursor-pointer overflow-y-scroll no-scrollbar p-1.5 max-h-72 rounded-lg drop-shadow-sm dark:bg-dark-700 text-gray-800 font-medium flex flex-col gap-1 border border-gray-200 dark:text-white dark:font-normal dark:border-dark-600'>
            {filteredItems.map((item) => (
              <Combobox.Option key={`${item[identifier]}`} value={item}>
                {({ active }) => (
                  <div
                    className={`${active ? "bg-gray-50 dark:bg-dark-600" : undefined} ${
                      item[selectedKey] == selectedOption[selectedKey] ? "bg-gray-50 dark:bg-dark-600" : undefined
                    } rounded-lg flex justify-between px-2 py-2.5`}
                  >
                    <>
                      {`${item[selectedKey]}`}

                      {item == selectedOption && (
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
}

export default InputDropdownAutoComplete;
