import React from "react";

type PageHeaderProps = {
    title: string;
    subtitle?: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <>
            {subtitle ? (
                <div className='flex flex-col w-full gap-1.5'>
                    <h1 className='text-display_sm font-semibold text-gray-800 dark:text-white'>{title}</h1>
                    <p className='text-md text-gray-600 dark:text-dark-300'>{subtitle}</p>
                </div>
            ) : (
                <div className='flex flex-col w-fulls'>
                    <h1 className='text-display_sm font-semibold text-gray-800 dark:text-white'>{title}</h1>
                </div>
            )}
        </>
    );
}
