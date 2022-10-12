import React from 'react'

interface InputLabelprops {
    htmlFor: string,
    text: string
}

export function InputLabel({ htmlFor, text }: InputLabelprops) {
  return (
    <label className="text-md text-gray-700 font-medium dark:text-white" htmlFor={htmlFor}>{text}</label>
  )
}
