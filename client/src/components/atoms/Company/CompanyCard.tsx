import React from "react";
import { companyType } from "../../../utils/types";
import { Button } from "../Button/Button";
import { FeaturedIcon } from "../Icons/FeaturedIcon";
import { IconBuilding } from "../Icons/Icons";

const CompanyCard = ({ company }: { company: companyType }) => {
  return (
    <div className='flex overflow-clip flex-col drop-shadow-sm dark:drop-shadow-md border bg-white dark:bg-dark-800 dark:border-dark-600 border-gray-200 rounded-md w-full'>
      <div className='flex p-5 gap-4 items-center'>
        <span>
          <FeaturedIcon
            size='lg'
            type='primary'
            icon={
              <IconBuilding
                size='24'
                fill='fill-primary-500 dark:fill-white'
                color='stroke-primary-500'
              />
            }
          />
        </span>
        <div className='flex flex-col'>
          <h4 className='text-gray-800 dark:text-white text-lg font-semibold'>{company.name}</h4>
          <span className='text-gray-600 dark:text-dark-300'>{company.country}</span>
        </div>
      </div>
      <div className='border-t border-gray-200 dark:border-dark-600 px-5 py-4 flex gap-3'>
        <Button size='medium' width='full' type='secondary-color' text='Edit company' />
        <Button size='medium' width='full' type='secondary-gray' text='Deactivate' />
      </div>
    </div>
  );
};

export default CompanyCard;
