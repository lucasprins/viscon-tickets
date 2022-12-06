import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useAppContext, useAppSelector } from "../../../utils/hooks";
import { Button } from "../../atoms/Button/Button";
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconCheck } from "../../atoms/Icons/Icons";


export function RegisterCompleted() {
    const language = useAppContext().appState.language;

    return (
        <div className='flex justify-center h-screen p-6 md:p-0 md:pt-24 dark:bg-dark-800'>
            <div className='flex flex-col w-full gap-8 justify-centerr md:w-96'>
                <div className='flex flex-col items-center justify-center gap-6'>
                    <FeaturedIcon
                        type='success'
                        size='xl'
                        icon={<IconCheck size='24' color='stroke-success-600' fill='' />}
                    />
                    <div className='flex flex-col items-center w-full gap-3'>
                        <h1 className='font-semibold text-center text-gray-900 text-display_xs md:text-display_sm dark:text-white'>
                            {"Registration completed!"}
                        </h1>
                        <p className='text-center text-gray-600 text-md dark:text-dark-400'>
                            {"Your password has been successfully set. Click below to continue to the login page."}
                        </p>
                    </div>
                </div>
                <Button formType='button' size='medium' width='full' type='primary' text='Continue' url='/login' />
            </div>
        </div>
    );
}
