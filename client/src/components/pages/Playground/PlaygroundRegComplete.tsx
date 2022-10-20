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

export function Playground() {
    const language = useAppSelector(getCurrentLanguage);
    const registrationState = useState({
        password1: "",
        password2: "",
    });

    return (
        <div className='h-screen w-screen flex justify-center p-6 lg:py-24 dark:bg-dark-800'>
            <div className='flex flex-col items-center gap-6'>
                <FeaturedIcon type="success" size="xl" icon={<IconCheck size='24' color='stroke-success-600' fill='' />} />
                <div className='flex flex-col items-center gap-3 w-96'>
                    <h1 className='lg:text-display_sm text-gray-900 dark:text-white font-semibold text-center'>{"Registration completed!"}</h1>
                    <p className='text-md text-gray-600 dark:text-dark-400 text-center'>{"Your password has been successfully set. Click below to continue to the login page."}</p>
                </div>

                <div className="py-2.5">
                    <Button
                        formType='button'
                        size='large'
                        width='full'
                        type='primary'
                        text='Continue'
                        onclick={() => console.log("Clicked on Login")}
                    />
                </div>
            </div>
        </div>
    );
}
