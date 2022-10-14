import React from "react";
import { getInitials } from "../../../utils/stringUtil";

type AvatarCardsProps = {
    title: string;
    subtitle: string;
};

export function AvatarCard({ title, subtitle }: AvatarCardsProps) {
    return (
        <div className='flex gap-4 p-4 w-full border items-centers border-gray-200 rounded-xl'>
            <div>
                <div className='h-14 w-14 bg-gray-100 rounded-full flex items-center justify-center text-xl text-gray-600 font-medium'>
                    {getInitials(title)}
                </div>
            </div>
            <div className='flex flex-col'>
                <h5 className='text-gray-700 text-lg font-semibold'>{title}</h5>
                <span className='text-md text-gray-600'>{subtitle}</span>
            </div>
        </div>
    );
}
