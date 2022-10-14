import { Field } from "formik";
import React, { useState } from "react";

type InputFieldProps = {
  style: "icon" | "iconless";
  type: "date" | "email" | "password" | "file" | "tel" | "text";
  placeholder?: string;
  icon?: JSX.Element;
  disabled?: boolean;
  // Formik props
  id: string;
  name: string;
  validate?: (value: string) => any;
  error?: string | undefined;
  touched?: boolean | undefined;
};

export function InputField({ style, type, placeholder, icon, disabled, id, name, validate, error, touched }: InputFieldProps) {
  let inputFieldIconStyle = "";
  let inputFieldStyle = "";
  let inputFieldBorderStyle = "";

  // If we have an error we want to apply the red border and outline style
  if(error && touched) {
    inputFieldBorderStyle = "border-error-500 focus:outline outline-2 outline-error-600"
  } else {
    inputFieldBorderStyle = "border-gray-300 dark:border-dark-500 focus:outline outline-2 outline-primary-500 dark:outline-primary-600";
  }
  
  // If there is an icon given we want to enable some extra padding
  if(style === "icon") {
    inputFieldIconStyle = "p-3 absolute pointer-events-none flex items-center";
      inputFieldStyle = "pl-10";
  }

  return (
    <>
      {disabled ? (
        <div className="relative flex items-center text-gray-900 w-full drop-shadow-sm">
          <div className={inputFieldIconStyle}>{icon}</div>
          <Field
            validate={validate}
            disabled
            type={type}
            placeholder={placeholder}
            id={id}
            name={name}
            className={`${inputFieldStyle} ${inputFieldBorderStyle} cursor-not-allowed text-gray-500 w-full bg-gray-100 border rounded-lg placeholder:text-dark-300 px-3.5 py-2.5 text-md font-normal dark:bg-dark-800 dark:text-gray-200 opacity-50 dark:opacity-40`}
          ></Field>
        </div>
      ) : (
        <div className="relative flex items-center text-gray-900 w-full drop-shadow-sm">
          <div className={inputFieldIconStyle}>{icon}</div>
          <Field
            validate={validate}
            type={type}
            placeholder={placeholder}
            id={id}
            name={name}
            className={`${inputFieldStyle} ${inputFieldBorderStyle} w-full bg-white border rounded-lg placeholder:text-dark-300 px-3.5 py-2.5 text-md font-normal dark:bg-dark-800 dark:text-white`}
          ></Field>
        </div>
      )}
    </>
  );
}
