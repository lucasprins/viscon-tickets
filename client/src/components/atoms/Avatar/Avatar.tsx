import React from "react";
import { getInitials } from "../../../utils/textManipulation";

export const Avatar = ({ name, color }: { name: string; color: "primary" | "gray" }) => {
    return (
        <>
            {color === "primary" ? (
                <div className='h-12 w-12 bg-primary-100 dark:bg-primary-400 dark:bg-opacity-10 rounded-full flex items-center justify-center text-xl text-primary-600 dark:text-primary-500 font-medium'>
                    {getInitials(name)}
                </div>
            ) : (
                <div className='h-12 w-12 bg-gray-100 dark:bg-dark-600 rounded-full flex items-center justify-center text-xl text-gray-600 dark:text-gray-300 font-medium'>
                    {getInitials(name)}
                </div>
            )}
        </>
    );
};
