import React from 'react'
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs'
import Layout from '../../components/Layout/Layout'

export function AdminCustomers() {
	return (
		<div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<div className='p-8'>
				<Breadcrumbs crumbs={['Admin', 'Customers']} />
			</div>
		</div>
	)
}
