import React from "react";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppSelector } from "../../../utils/hooks";
import { getInitials } from "../../../utils/stringUtil";
import { Avatar } from "../Avatar/Avatar";
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
                <div className='flex gap-4 p-3 md:p-4 w-full drop-shadow-sm bg-white dark:bg-dark-700 border items-center border-gray-200 dark:border-dark-600 rounded-xl'>
                    <div>
                        <Avatar name={name} color="primary" />
                    </div>
                    <h5 className='text-gray-700 text-lg font-semibold dark:text-white'>{name}</h5>

                </div>
            ) : (
            <div className='flex flex-col gap-2 p-4 w-full drop-shadow-sm bg-white dark:bg-dark-800 border items-center text-center border-gray-200 dark:border-dark-600 rounded-xl'>
                <span className="flex">
                    <FeaturedIcon size="md" type="gray" icon={<IconAlert size='22' fill='fill-gray-600 dark:fill-gray-300' color='stroke-gray-600 dark:stroke-gray-300' />} />
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{translations[language].not_claimed}</span>
            </div>
            )}
        </>
    );
}
