import { Formik, Form } from "formik";
import React, { useState } from "react";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppSelector } from "../../../utils/hooks";
import { validateEmail } from "../../../utils/validateInput";
import { Button } from "../../atoms/Button/Button";
import { ButtonLink } from "../../atoms/Button/ButtonLink";
import { IconBell, IconKey, IconMail } from "../../atoms/Icons/Icons";
import { InputCheckbox } from "../../atoms/Input/InputCheckbox";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import { NavigationHeader } from "../../organisms/Navigation/NavigationHeader";

var translations = require("../../../translations/authenticationTranslations.json");

export function Login() {
    const language = useAppSelector(getCurrentLanguage);
    const logo = require("../../../assets/viscon-login.jpg");
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    return (
        <div className='flex dark:bg-dark-800 dark:text-white w-full lg:h-screen'>
            <div className='hidden lg:flex lg:absolute p-8'>
                <NavigationHeader />
            </div>
            {/* Left Side */}
            <div className='w-full lg:w-1/2 p-6 lg:p-0 flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-8 w-full lg:w-96'>
                    <div className="lg:hidden"><NavigationHeader /></div>
                    <PageHeader
                        title='Log in'
                        subtitle='Welcome back to the Viscon ticketsystem! Please enter your details.'
                    />
                    <Formik initialValues={login} onSubmit={() => console.log("Submitting login")}>
                        {({ errors, touched, isValidating }) => (
                            <Form className='flex flex-col gap-6'>
                                {/* Inputs */}
                                <div className='flex flex-col gap-5'>
                                    <div className='flex flex-col gap-1.5'>
                                        <InputLabel htmlFor='email' text='Email' />
                                        <InputField
                                            style='icon'
                                            type='email'
                                            validate={(input) => validateEmail(input, language)}
                                            placeholder='Enter your email'
                                            icon={<IconMail size='20' color='stroke-gray-500' fill='stroke-gray-500' />}
                                            id='email'
                                            name='email'
                                        />
                                        <InputErrorMessage name='email' />
                                    </div>

                                    <div className='flex flex-col w-full gap-1.5'>
                                        <InputLabel htmlFor='password' text='Password' />
                                        <InputField
                                            style='icon'
                                            type='password'
                                            placeholder='Enter your password'
                                            icon={<IconKey size='20' color='stroke-gray-500' fill='stroke-gray-500' />}
                                            id='password'
                                            name='password'
                                        />
                                    </div>
                                </div>

                                {/* Row */}
                                <div className='flex items-center justify-between'>
                                    <InputCheckbox text='Remember for 30 days' />
                                    <ButtonLink
                                        url='/forgot-password'
                                        size='medium'
                                        type='color'
                                        text={translations[language].forgotPassword}
                                    />
                                </div>

                                {/* Button */}
                                <Button
                                    formType='submit'
                                    size='medium'
                                    width='full'
                                    type='primary'
                                    text='Sign in'
                                    url='/'
                                    onclick={() => console.log("Clicked on Login")}
                                />
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

            <div className='w-full hidden lg:flex lg:w-1/2'>
                <img className=' min-w-full min-h-full object-cover' src={logo} />
            </div>
        </div>
    );
}
