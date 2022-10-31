import { Formik, Form } from "formik";
import React, { useState } from "react";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppSelector } from "../../../utils/hooks";
import { Button } from "../../atoms/Button/Button";
import { ButtonLink } from "../../atoms/Button/ButtonLink";
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconKey, IconMail, IconArrow } from "../../atoms/Icons/Icons";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";

export function NewPassword() {
    const language = useAppSelector(getCurrentLanguage);
    const [newPassword, setNewPassword] = useState({
        passwordOne: "",
        passwordTwo: "",
    });

    return (
        <div className='h-screen w-screen flex justify-center p-6 lg:py-24 dark:bg-dark-800'>
            <div className='flex flex-col items-center gap-8'>
                <div className='flex flex-col items-center gap-6 w-96'>
                    <FeaturedIcon
                        type='primary'
                        size='xl'
                        icon={<IconKey size='26' color='stroke-primary-500' fill='fill-primary-500' />}
                    />
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-display_sm text-gray-900 dark:text-white font-semibold text-center'>
                            {"Set a new password"}
                        </h1>
                        <p className='text-md text-gray-600 dark:text-dark-400 text-center'>
                            {"Your new password must be atleast 8 characters long."}
                        </p>
                    </div>
                </div>

                <Formik initialValues={newPassword} onSubmit={() => console.log("Submitting login")}>
                    {({ errors, touched, isValidating }) => (
                        <Form className='flex flex-col gap-6 w-full'>
                            <div className="flex flex-col gap-5">
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <InputLabel htmlFor='passwordOne' text='Password' />
                                    <InputField
                                        style='iconless'
                                        type='password'
                                        placeholder='Enter your new password'
                                        id='passwordOne'
                                        name='passwordOne'
                                    />
                                </div>
                                <div className='flex flex-col gap-1.5 w-full'>
                                    <InputLabel htmlFor='passwordTwo' text='Password' />
                                    <InputField
                                        style='iconless'
                                        type='password'
                                        placeholder='Enter the password again'
                                        id='passwordTwo'
                                        name='passwordTwo'
                                    />
                                </div>
                            </div>

                            <Button
                                formType='submit'
                                size='medium'
                                width='full'
                                type='primary'
                                text='Reset password'
                                onclick={() => console.log("Clicked on Login")}
                            />
                        </Form>
                    )}
                </Formik>
                <ButtonLink
                    size='medium'
                    type='gray'
                    url="/login"
                    icon={<IconArrow size='20' color='stroke-gray-500' fill='stroke-gray-500' direction='left' />}
                    text='Back to log in'
                />
            </div>
        </div>
    );
}
