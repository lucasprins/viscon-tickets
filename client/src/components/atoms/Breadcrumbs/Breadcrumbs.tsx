import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { IconChevron, IconHome } from '../Icons/Icons'

type BreadcrumbsProps = {
    crumbs: Array<string>
}

export function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
    return (
        <div className='hidden w-full md:flex gap-x-2 items-center'>
            <Link to='/'>
                <IconHome size='24' color='stroke-gray-400 dark:stroke-gray-500' fill='fill-gray-400' />
            </Link>
            <IconChevron size='18' color='stroke-gray-300 dark:stroke-gray-500' fill='fill-gray-300' />
            {crumbs.map((crumb, index) => (
                <div className='flex gap-x-2 items-center' key={index}>
                    <Link to={crumb === 'Dashboard' ? '/' : '/' + crumb.toLowerCase()}>
                        <button className='bg-gray-50 dark:bg-dark-600 dark:font-medium dark:text-white py-1 px-2 rounded-md text-sm text-gray-700 font-semibold'>{crumb}</button>
                    </Link>
                    {!(index === crumbs.length - 1)
                        ? <IconChevron size='18' color='stroke-gray-300 dark:stroke-gray-500' fill='fill-gray-300' />
                        : undefined
                    }
                </div>
            ))}
        </div>
    )
}
