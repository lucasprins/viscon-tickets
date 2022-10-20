import { Formik, Form } from "formik";
import React, { useState } from "react";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppSelector } from "../../../utils/hooks";
import { validatePhoneNumber } from "../../../utils/validateInput";
import { Badge } from "../../atoms/Badge/Badge";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { Button } from "../../atoms/Button/Button";
import { ButtonLink } from "../../atoms/Button/ButtonLink";
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconAlert, IconBell, IconCheck, IconMenu } from "../../atoms/Icons/Icons";
import { InputCheckbox } from "../../atoms/Input/InputCheckbox";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import Layout from "../../organisms/Layout/Layout";
import { NavigationHeader } from "../../organisms/Navigation/NavigationHeader";
import { BasicTable } from "../../organisms/Table/basicTable";

export function RegisterCompleted() {
    const language = useAppSelector(getCurrentLanguage);

    return (
        <div className='h-screen flex p-6 md:p-0 md:pt-24 justify-center dark:bg-dark-800'>
            <div className='flex flex-col justify-centerr gap-8 w-full md:w-96'>
                <div className='flex flex-col gap-6 items-center justify-center'>
                    <FeaturedIcon
                        type='success'
                        size='xl'
                        icon={<IconCheck size='24' color='stroke-success-600' fill='' />}
                    />
                    <div className='flex flex-col items-center gap-3 w-full'>
                        <h1 className='text-display_xs md:text-display_sm text-gray-900 dark:text-white font-semibold text-center'>
                            {"Registration completed!"}
                        </h1>
                        <p className='text-md text-gray-600 dark:text-dark-400 text-center'>
                            {"Your password has been successfully set. Click below to continue to the login page."}
                        </p>
                    </div>
                </div>
                <Button formType='button' size='medium' width='full' type='primary' text='Continue' url='/login' />
            </div>
        </div>
    );
}
