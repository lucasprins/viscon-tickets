import React from "react";
import { useAppContext, useAppSelector } from "../../../utils/hooks";
import { getInitials } from "../../../utils/textManipulation";
import { Avatar } from "../Avatar/Avatar";
import { FeaturedIcon } from "../Icons/FeaturedIcon";
import { IconAlert } from "../Icons/Icons";

var translations = require("../../../translations/ticketTranslations.json");

type AssigneeCardProps = {
    name: string | undefined,
    subtitle?: string,
};

export function AssigneeCard({ name, subtitle }: AssigneeCardProps) {
    const language = useAppContext().appState.language;

    return (
        <>
            {name !== undefined ? (
                <div className='flex items-center w-full gap-4 p-3 bg-white border border-gray-200 md:p-4 drop-shadow-sm dark:bg-dark-700 dark:border-dark-600 rounded-xl'>
                    <div>
                        <Avatar name={name} color="primary" />
                    </div>
                    <h5 className='text-lg font-semibold text-gray-700 dark:text-white'>{name}</h5>

                </div>
            ) : (
            <div className='flex flex-col items-center w-full gap-2 p-4 text-center bg-white border border-gray-200 drop-shadow-sm dark:bg-dark-800 dark:border-dark-600 rounded-xl'>
                <span className="flex">
                    <FeaturedIcon size="md" type="gray" icon={<IconAlert size='22' fill='fill-gray-600 dark:fill-gray-300' color='stroke-gray-600 dark:stroke-gray-300' />} />
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{translations[language].not_claimed}</span>
            </div>
            )}
        </>
    );
}
