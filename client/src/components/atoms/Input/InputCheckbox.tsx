import { Field } from "formik";
import React, { useState } from "react";

type InputCheckboxProps = {
    text?: string;
};

export function InputCheckbox({ text }: InputCheckboxProps) {
    return (
        <div className='flex items-center gap-2'>
            <input type='checkbox' className="-mt-0.5"/>
            <div className='text-sm font-medium text-gray-700'>{text}</div>
        </div>
    );
}
