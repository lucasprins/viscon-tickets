import React from 'react'
import { ErrorMessage } from "formik";

interface InputErrorMessageProps {
    name: string
}

export function InputErrorMessage({ name }: InputErrorMessageProps) {
  return (
    <ErrorMessage name={name} component="span" className="text-error-500 text-sm" />
  )
}
