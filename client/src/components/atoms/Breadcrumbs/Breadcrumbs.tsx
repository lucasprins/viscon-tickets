import React from "react";
import { Link, useParams } from "react-router-dom";
import { IconChevron, IconHome } from "../Icons/Icons";

export function Breadcrumbs({ crumbs }: { crumbs: Array<string> }) {
  return (
    <div className='items-center hidden w-full md:flex gap-x-2'>
      <Link to='/'>
        <IconHome size='24' color='stroke-gray-400 dark:stroke-gray-500' fill='fill-gray-400' />
      </Link>
      <IconChevron size='18' color='stroke-gray-300 dark:stroke-gray-500' fill='fill-gray-300' />
      {crumbs.map((crumb, index) => (
        <div className='flex items-center gap-x-2' key={index}>
          <Link to={crumb === "Dashboard" ? "/" : "/" + crumb.toLowerCase()}>
            <button className='px-2 py-1 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-md dark:border-dark-700 hover:bg-gray-100 dark:hover:bg-dark-500 drop-shadow-sm dark:bg-dark-600 dark:font-medium dark:text-white'>
              {crumb}
            </button>
          </Link>
          {!(index === crumbs.length - 1) ? (
            <IconChevron size='18' color='stroke-gray-300 dark:stroke-gray-500' fill='fill-gray-300' />
          ) : undefined}
        </div>
      ))}
    </div>
  );
}
