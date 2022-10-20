import { Field } from "formik";
import React, { useState } from "react";

type InputCheckboxProps = {
    text?: string;
};

export function InputCheckbox({ text }: InputCheckboxProps) {
    return (
        <div className='flex items-center gap-2'>
            <input id="remember" type='checkbox' className="-mt-0.5"/>
            <label htmlFor="remember" className='text-sm font-medium dark:text-dark-300 text-gray-700'>{text}</label>
        </div>
    );
}
