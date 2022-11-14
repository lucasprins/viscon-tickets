import React from 'react'

interface Props<T> {
  label: string;
  options: T[];
  selectedOption: T;
  selectedKey: keyof T;
  onchange: (payload: T) => void;
}

const InputSelectAutoComplete = <T extends unknown>({
  label,
  options,
  selectedOption,
  selectedKey,
  onchange,
}: Props<T>) => {
  return (
    <div>InputSelectAutoComplete</div>
  )
}

export default InputSelectAutoComplete