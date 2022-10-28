import { Tab } from '@headlessui/react'
import React from 'react'
import { Breadcrumbs } from '../../atoms/Breadcrumbs/Breadcrumbs'
import Layout from '../../organisms/Layout/Layout'
import { TableTickets } from '../../organisms/Table/TableTickets'

export const Playground = () => {
  return (
    <div className='flex flex-col h-screen md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='p-8 w-full flex flex-col gap-20'>
				<Breadcrumbs crumbs={['Playground']}/>
        		<TableTickets />
			</div>
		</div>
  )
}
