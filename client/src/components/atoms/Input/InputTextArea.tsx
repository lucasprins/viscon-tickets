import { Field } from "formik";
import React, { useState } from "react";

type InputTextAreaProps = {
  placeholder?: string;
  disabled?: boolean;
  // Formik props
  id: string;
  name: string;
  validate?: (value: string) => any;
  error?: string | undefined;
  touched?: boolean | undefined;
};

export function InputTextArea({ placeholder, disabled, id, name, validate, error, touched }: InputTextAreaProps) {
  let inputFieldStyle = "";
  let inputFieldBorderStyle = "";

  // If we have an error we want to apply the red border and outline style
  if(error && touched) {
    inputFieldBorderStyle = "border-error-500 focus:outline outline-2 outline-error-600"
  } else {
    inputFieldBorderStyle = "border-gray-300 dark:border-dark-500 focus:outline outline-2 outline-primary-500 dark:outline-primary-600";
  }
  

  return (
    <>
      {disabled ? (
        <div className="relative flex items-center text-gray-900 w-full drop-shadow-sm">
          <Field
            validate={validate}
            disabled
            placeholder={placeholder}
            id={id}
            name={name}
            as="textarea"
			rows={5}
            className={`${inputFieldStyle} ${inputFieldBorderStyle} cursor-not-allowed text-gray-500 w-full bg-gray-50 border rounded-lg placeholder:text-dark-300 px-3.5 py-2.5 text-md font-normal dark:bg-dark-800 dark:text-gray-200`}
          ></Field>
        </div>
      ) : (
        <div className="relative flex items-center text-gray-900 w-full drop-shadow-sm">
          <Field
            validate={validate}
            placeholder={placeholder}
            id={id}
            name={name}
            as="textarea"
			rows={5}
            className={`${inputFieldStyle} ${inputFieldBorderStyle} w-full bg-white border rounded-lg placeholder:text-gray-300 px-3.5 py-2.5 text-md font-normal dark:bg-dark-700 dark:text-white`}
          ></Field>
        </div>
      )}
    </>
  );
}
