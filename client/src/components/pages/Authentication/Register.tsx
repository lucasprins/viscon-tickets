import { Formik, Form } from "formik";
import React, { useState } from "react";
import { toggleBackdrop, toggleLanguageModal } from "../../../features/modal/modalSlice";
import { useAppContext, useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { Button } from "../../atoms/Button/Button";
import { ButtonLink } from "../../atoms/Button/ButtonLink";
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconKey, IconMail, IconArrow } from "../../atoms/Icons/Icons";
import { IconFlag } from "../../atoms/Icons/IconsFlags";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";

export function Register() {
    const language = useAppContext().appState.language;
    const [newPassword, setNewPassword] = useState({
        passwordOne: "",
        passwordTwo: "",
    });

    return (
        <div className='flex justify-center w-screen h-screen p-6 lg:py-24 dark:bg-dark-800'>
            <div className='flex flex-col items-center gap-8'>
                <div className='flex flex-col items-center gap-6 w-96'>
                    <FeaturedIcon
                        type='primary'
                        size='xl'
                        icon={<IconKey size='26' color='stroke-primary-500' fill='fill-primary-500' />}
                    />
                    <div className='flex flex-col gap-3'>
                        <h1 className='font-semibold text-center text-gray-900 text-display_sm dark:text-white'>
                            {"Set up your password"}
                        </h1>
                        <p className='text-center text-gray-600 text-md dark:text-dark-400'>
                            {"Before you can login you will need to set up a password."}
                        </p>
                    </div>
                </div>

                <Formik initialValues={newPassword} onSubmit={() => console.log("Submitting login")}>
                    {({ errors, touched, isValidating }) => (
                        <Form className='flex flex-col w-full gap-6'>
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
                                text='Submit'
                                onclick={() => console.log("Clicked on Login")}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
