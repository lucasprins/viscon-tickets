import React from 'react'
import { getInitials } from '../../../utils/textManipulation';

const CompanyLogo = ({ name }: { name: string }) => {
  return (
    <>
      <div className='h-16 w-16 rounded-full bg-primary-50 dark:bg-primary-400 dark:bg-opacity-1 flex items-center justify-center text-xl text-primary-600 dark:text-primary-500 font-medium'>
        {getInitials(name)}
      </div>
  </>
  )
}

export default CompanyLogo
