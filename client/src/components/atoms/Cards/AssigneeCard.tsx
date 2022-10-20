import React from "react";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppSelector } from "../../../utils/hooks";
import { getInitials } from "../../../utils/stringUtil";
import { FeaturedIcon } from "../Icons/FeaturedIcon";
import { IconAlert } from "../Icons/Icons";

var translations = require("../../../translations/ticketTranslations.json");

type AssigneeCardProps = {
    name: string | undefined,
    subtitle?: string,
};

export function AssigneeCard({ name, subtitle }: AssigneeCardProps) {
    const language = useAppSelector(getCurrentLanguage);

    return (
        <>
            {name !== undefined ? (
                <div className='flex gap-4 p-3 md:p-4 w-full drop-shadow-sm bg-white dark:bg-dark-700 border items-center border-gray-300 dark:border-dark-500 rounded-xl'>
                    <div>
                        <div className='h-14 w-14 bg-primary-100 dark:bg-primary-400 dark:bg-opacity-10 rounded-full flex items-center justify-center text-xl text-primary-600 dark:text-primary-500 font-medium'>
                            {getInitials(name)}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <h5 className='text-gray-700 text-lg font-semibold dark:text-white'>{name}</h5>
                        <span className='text-md text-gray-600 dark:text-dark-300'>{subtitle}</span>
                    </div>
                </div>
            ) : (
            <div className='flex flex-col gap-2 p-4 w-full drop-shadow-sm bg-white dark:bg-dark-800 border items-center text-center border-gray-300 dark:border-dark-500 rounded-xl'>
                <span className="flex">
                    <FeaturedIcon size="md" type="gray" icon={<IconAlert size='22' fill='fill-gray-600 dark:fill-gray-300' color='stroke-gray-600 dark:stroke-gray-300' />} />
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{translations[language].not_claimed}</span>
            </div>
            )}
        </>
    );
}
