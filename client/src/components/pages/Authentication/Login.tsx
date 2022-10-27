import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getIsLoggedIn, login } from "../../../features/auth/authSlice";
import { clearMessage } from "../../../features/auth/messageSlice";
import { toggleBackdrop, toggleLanguageModal } from "../../../features/modal/modalSlice";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { validateEmail, validatePassword } from "../../../utils/validateInput";
import { Button } from "../../atoms/Button/Button";
import { ButtonLink } from "../../atoms/Button/ButtonLink";
import { IconKey, IconMail, IconTranslate } from "../../atoms/Icons/Icons";
import { IconFlag } from "../../atoms/Icons/IconsFlags";
import { InputCheckbox } from "../../atoms/Input/InputCheckbox";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { NavigationHeader } from "../../organisms/Navigation/NavigationHeader";
import { NavigationItem } from "../../organisms/Navigation/NavigationItem";

var translations = require("../../../translations/authenticationTranslations.json");

export function Login() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const isLoggedIn = useAppSelector(getIsLoggedIn);
    const { message } = useAppSelector((state) => state.message);

    const language: string = useAppSelector(getCurrentLanguage);
    const logo = require("../../../assets/viscon-login.jpg");

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        email: "",
        password: "",
    };

    const handleLogin = (formValue: { email: string; password: string }) => {
        const { email, password } = formValue;
        setLoading(true);

        if (email && password) {
            dispatch(login({ email, password }))
                .unwrap()
                .catch(() => {
                    setLoading(false);
                });
        }
    };

    if (isLoggedIn) {
        return <Navigate to='/' />;
    }

    return (
        <div className='flex dark:bg-dark-800 dark:text-white w-full lg:h-screen'>
            <div className='hidden lg:flex lg:absolute p-8'>
                <NavigationHeader />
            </div>
            {/* Left Side */}
            <div className='w-full lg:w-1/2 p-6 lg:p-0 flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-8 w-full lg:w-96'>
                    <div className='lg:hidden'>
                        <NavigationHeader />
                    </div>
                    <PageHeader
                        title='Log in'
                        subtitle='Welcome back to the Viscon ticketsystem! Please enter your details.'
                    />
                    <Formik initialValues={initialValues} onSubmit={(values) => handleLogin(values)}>
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
                                            validate={(input) => validatePassword(input, language)}
                                            icon={<IconKey size='20' color='stroke-gray-500' fill='stroke-gray-500' />}
                                            id='password'
                                            name='password'
                                        />
                                        <InputErrorMessage name='password' />
                                    </div>
                                </div>

                                {/* Row
                                <div className='flex items-center justify-between'>
                                    <InputCheckbox text='Remember for 30 days' />
                                    <ButtonLink
                                        url='/forgot-password'
                                        size='medium'
                                        type='color'
                                        text={translations[language].forgotPassword}
                                    />
                                </div> */}
                                <div className="flex flex-col gap-3">
                                    {/* Button */}
                                    {loading ? (
                                        <Button
                                            disabled={loading}
                                            formType='submit'
                                            size='medium'
                                            width='full'
                                            type='primary'
                                            text={translations[language].loggingIn}
                                            icon={<Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />}
                                        />
                                    ) : (
                                        <Button
                                            formType='submit'
                                            size='medium'
                                            width='full'
                                            type='primary'
                                            text='Sign in'
                                        />
                                    )}
                                    <Button
                                        disabled={loading}
                                        formType='button'
                                        size='medium'
                                        url="/forgot-password"
                                        width='full'
                                        type='secondary-gray'
                                        text={translations[language].forgotPassword}
                                    />
                                </div>
                                {/* Error message */}
                                {message && (
                                    <div className='flex justify-center'>
                                        <span className='text-error-500'>{message}</span>
                                    </div>
                                )}
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
