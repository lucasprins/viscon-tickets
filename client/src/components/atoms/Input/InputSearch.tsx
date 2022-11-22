import { Field } from "formik";
import React, { useState } from "react";
import { IconSearch } from "../Icons/Icons";

type InputFieldProps = {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputSearch({ value, placeholder, onChange }: InputFieldProps) {
  return (
    <>
      <div className='relative flex items-center w-full text-gray-900 drop-shadow-sm'>
        <div className='absolute flex items-center p-3 pointer-events-none'>
          <IconSearch color='stroke-gray-500' size='20' fill='' />
        </div>
        <input
          type='search'
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className='pl-10 border-gray-200 dark:border-dark-600 focus:outline outline-2 outline-primary-500 dark:outline-primary-600 text-gray-7s00 w-full bg-white border rounded-lg dark:placeholder:text-gray-300 placeholder:text-gray-500 px-3.5 py-2.5 text-md font-normal dark:bg-dark-800 dark:text-gray-200'
        ></input>
      </div>
    </>
  );
}
