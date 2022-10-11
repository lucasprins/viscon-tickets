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
};

export function InputField({
  style,
  type,
  placeholder,
  icon,
  disabled,
  id,
  name,
  validate,
  error
}: InputFieldProps) {
  const [value, setValue] = useState<string>("");
  let iconStyling = "";
  let inputStyling = "";
  let borderStyling = "";

  if(error) {
    borderStyling = "border-error-500 focus:outline outline-2 outline-primary-300 dark:outline-error-600";
  } else {
    borderStyling = "border-gray-300 dark:border-dark-500 focus:outline outline-2 outline-primary-300 dark:outline-primary-600";
  }

  switch (style) {
    case "icon":
      iconStyling = "p-3 absolute pointer-events-none flex items-center";
      inputStyling = "pl-10";
      break;
  }

  return (
    <>
      {disabled ? (
        <div className="relative flex items-center text-gray-900 w-full drop-shadow-sm">
          <div className={iconStyling}>{icon}</div>
          <Field
            validate={validate}
            disabled
            type={type}
            placeholder={placeholder}
            id={id}
            name={name}
            className={`${inputStyling} ${borderStyling} cursor-not-allowed text-gray-500 w-full bg-gray-100 border rounded-lg placeholder:text-gray-500 px-3.5 py-2.5 text-md font-normal dark:bg-dark-700 dark:text-gray-200 opacity-40`}
          ></Field>
        </div>
      ) : (
        <div className="relative flex items-center text-gray-900 w-full drop-shadow-sm">
          <div className={iconStyling}>{icon}</div>
          <Field
            validate={validate}
            type={type}
            placeholder={placeholder}
            id={id}
            name={name}
            className={`${inputStyling} ${borderStyling} w-full bg-white border rounded-lg placeholder:text-gray-500 px-3.5 py-2.5 text-md font-normal dark:bg-dark-700 dark:text-white`}
          ></Field>
        </div>
      )}
    </>
  );
}
