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
import { IconAlert, IconBell, IconMenu } from "../../atoms/Icons/Icons";
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
                <FeaturedIcon type="primary" size="xl" icon={<IconBell size='24' color='stroke-primary-500' fill='fill-primary-500' />} />
                <div className='flex flex-col items-center gap-3 w-96'>
                    <h1 className='lg:text-display_sm text-gray-900 dark:text-white font-semibold text-center'>{"Set new password"}</h1>
                    <p className='text-md text-gray-600 dark:text-dark-400 text-center'>{"Your new password must be atleast 8 characters long."}</p>
                </div>

                <Formik initialValues={registrationState} onSubmit={() => console.log("Submitting login")}>
                        {({ errors, touched, isValidating }) => (
                            <Form className='flex flex-col gap-5 w-full'>
                                <div className='flex flex-col gap-4 w-full'>
                                    <div className='flex flex-col w-full gap-1.5'>
                                        <InputLabel htmlFor='password' text='Password' />
                                        <InputField
                                            style='iconless'
                                            type='password'
                                            placeholder="••••••••"
                                            id='password1'
                                            name='password1'
                                            // validate={(input) => validatePhoneNumber(input, language)}
                                        />
                                        {/* <InputErrorMessage name='firstName' /> */}
                                        <div className="font-normal text-sm text-gray-600">
                                            <p>Must be at least 8 characters.</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col w-full gap-1.5'>
                                        <InputLabel htmlFor='password' text='Password' />
                                        <InputField
                                            style='iconless'
                                            type='password'
                                            placeholder="••••••••"
                                            id='password2'
                                            name='password2'
                                            // validate={(input) => validatePhoneNumber(input, language)}
                                        />
                                        {/* <InputErrorMessage name='firstName' /> */}
                                    </div>
                                </div>

                                <div className="py-2.5">
                                    <Button
                                        formType='submit'
                                        size='large'
                                        width='full'
                                        type='primary'
                                        text='Set password'
                                        onclick={() => console.log("Clicked on Login")}
                                    />
                                </div>

                                <div className="w-full flex flex-col">
                                    <ButtonLink
                                        size={0}
                                        type={1}
                                        text="Back to log in"
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
            </div>
        </div>
    );
}
