import React from 'react'

type ConnectorProps = {
    color: string // Has to be a Tailwind bg-color class
}

export function Connector({ color }: ConnectorProps) {
  return (
    <div className={`w-0.5 h-full rounded-sm ${color}`}></div>
  )
}
