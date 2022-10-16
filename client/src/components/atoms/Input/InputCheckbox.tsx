import { Field } from "formik";
import React, { useState } from "react";

type InputCheckboxProps = {
  text?: string
}

export function InputCheckbox({ text }: InputCheckboxProps) {
  return (
    <div className="flex justify-content content-center">
      <label className="flex">
        <div>
          <input type="checkbox" />
        </div>
        <div className="pl-2 w-56 text-sm font-medium text-gray-700">
          {text}
        </div>
      </label>
    </div>
  )
}