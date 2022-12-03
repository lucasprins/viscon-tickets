import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useAppContext, useAppSelector } from "../../../utils/hooks";
import { Button } from "../../atoms/Button/Button";
import { ButtonLink } from "../../atoms/Button/ButtonLink";
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconArrow, IconKey, IconMail } from "../../atoms/Icons/Icons";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";

export function ForgotPassword() {
    const language = useAppContext().appState.language;

    // "enterEmail" | "enterCode" | "enterPassword"
    const currentStep = useState("enterEmail");
    
    const [email, setEmail] = useState({
        email: "",
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
                            {"Forgot password?"}
                        </h1>
                        <p className='text-center text-gray-600 text-md dark:text-dark-400'>
                            {"No worries, we'll send you reset instructions."}
                        </p>
                    </div>
                </div>

                <Formik initialValues={email} onSubmit={() => console.log("Submitting login")}>
                    {({ errors, touched, isValidating }) => (
                        <Form className='flex flex-col w-full gap-6'>
                            <div className='flex flex-col gap-1.5 w-full'>
                                    <InputLabel htmlFor='email' text='Email' />
                                    <InputField
                                        style='icon'
                                        type='email'
                                        placeholder='Enter your email'
                                        icon={<IconMail size='20' color='stroke-gray-500' fill='stroke-gray-500' />}
                                        id='email'
                                        name='email'
                                    />
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
                    size="medium"
                    type="gray"
                    url="/login"
                    icon={<IconArrow size='20' color='stroke-gray-500' fill='stroke-gray-500' direction='left' />}
                    text='Back to log in'
                />
            </div>
        </div>
    );
}
