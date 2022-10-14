import React from "react";
import { getInitials } from "../../../utils/stringUtil";
import { FeaturedIcon } from "../Icons/FeaturedIcon";
import { IconAlert } from "../Icons/Icons";

type AssigneeCardProps = {
    name: string | undefined;
};

export function AssigneeCard({ name }: AssigneeCardProps) {
    return (
        <>
            {name !== undefined ? (
                <div className='flex gap-4 p-4 w-full drop-shadow-sm bg-white dark:bg-dark-800 border items-center border-gray-300 dark:border-dark-500 rounded-xl'>
                    <div>
                        <div className='h-14 w-14 bg-primary-100 rounded-full flex items-center justify-center text-xl text-primary-600 font-medium'>
                            {getInitials(name)}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <h5 className='text-gray-700 text-lg font-semibold'>{name}</h5>
                        <span className='text-md text-gray-600'>Assignee</span>
                    </div>
                </div>
            ) : (
            <div className='flex flex-col gap-2 p-4 w-full drop-shadow-sm bg-white dark:bg-dark-800 border items-center text-center border-gray-300 dark:border-dark-500 rounded-xl'>
                <span className="flex">
                    <FeaturedIcon size="md" type="gray" icon={<IconAlert size='22' fill='fill-gray-600 dark:fill-gray-300' color='stroke-gray-600 dark:stroke-gray-300' />} />
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">This ticket has not been claimed yet</span>
            </div>
            )}
        </>
    );
}
