import React from "react";
import { getInitials } from "../../../utils/stringUtil";
import { Avatar } from "../Avatar/Avatar";

type AvatarCardsProps = {
    name: string;
    subtitle: string;
};

export function AvatarCard({ name, subtitle }: AvatarCardsProps) {
    return (
        <div className='flex gap-4 p-3 md:p-4 drop-shadow-sm bg-white dark:bg-dark-700 dark:border-dark-500 w-full border items-centers border-gray-300 rounded-xl'>
            <div>
                <Avatar name={name} color='gray' />
            </div>
            <div className='flex flex-col'>
                <h5 className='text-gray-700 text-lg font-semibold dark:text-white'>{name}</h5>
                <span className='text-md text-gray-600 dark:text-dark-300'>{subtitle}</span>
            </div>
        </div>
    );
}
