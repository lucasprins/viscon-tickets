import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../../features/auth/authService";
import { useAppContext, useAppSelector, useAuthentication } from "../../../utils/hooks";
import { validateEmail, validatePassword } from "../../../utils/input-validation";
import { Button } from "../../atoms/Button/Button";
import { IconKey, IconMail, IconTranslate } from "../../atoms/Icons/Icons";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { NavigationHeader } from "../../organisms/Navigation/NavigationHeader";

const translations = require("../../../translations/allTranslations.json");

export function Login() {
  const { appState, appDispatch } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const language = appState.language;
  const logo = require("../../../assets/viscon-login.jpg");

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;
    setLoading(true);

    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      if (response.data.success) {
        appDispatch({ type: "USER_LOGIN", payload: response.data.data });
      } else {
        setError(response.data.message);
      }
    } catch {
      console.log("Unable to login");
    }
    setLoading(false);
  };

  useEffect(() => {
    localStorage.removeItem("user");
    appDispatch({ type: "USER_LOGOUT" });
  }, []);

  if (useAuthentication()) {
    return <Navigate to='/tickets' />;
  }

  return (
    <div className='flex w-full dark:bg-dark-800 dark:text-white lg:h-screen'>
      <div className='hidden p-8 lg:flex lg:absolute'>
        <NavigationHeader />
      </div>
      {/* Left Side */}
      <div className='flex flex-col items-center justify-center w-full p-6 lg:w-1/2 lg:p-0'>
        <div className='flex flex-col w-full gap-8 lg:w-96'>
          <div className='lg:hidden'>
            <NavigationHeader />
          </div>
          <PageHeader title={translations[language].login} subtitle={translations[language].loginSubtitle} />
          <Formik initialValues={initialValues} onSubmit={(values) => handleLogin(values)}>
            {({ errors, touched, isValidating }) => (
              <Form className='flex flex-col gap-6'>
                {/* Inputs */}
                <div className='flex flex-col gap-5'>
                  <div className='flex flex-col gap-1.5'>
                    <InputLabel htmlFor='email' text={translations[language].email} />
                    <InputField
                      style='icon'
                      type='email'
                      validate={(input) => validateEmail(input, language)}
                      placeholder={translations[language].emailPlaceholder}
                      icon={<IconMail size='20' color='stroke-gray-500' fill='stroke-gray-500' />}
                      id='email'
                      name='email'
                    />
                    <InputErrorMessage name='email' />
                  </div>

                  <div className='flex flex-col w-full gap-1.5'>
                    <InputLabel htmlFor='password' text={translations[language].password} />
                    <InputField
                      style='icon'
                      type='password'
                      placeholder={translations[language].passwordPlaceholder}
                      icon={<IconKey size='20' color='stroke-gray-500' fill='stroke-gray-500' />}
                      id='password'
                      name='password'
                    />
                    <InputErrorMessage name='password' />
                  </div>
                </div>
                <div className='flex flex-col gap-3'>
                  {/* Button */}
                  <Button
                    disabled={loading}
                    formType='submit'
                    size='medium'
                    width='full'
                    type='primary'
                    text={loading ? translations[language].loggingIn : translations[language].login}
                    icon={loading ? <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' /> : undefined}
                  />
                  {/* <Button
                    disabled={loading}
                    formType='button'
                    size='medium'
                    url='/forgot-password'
                    width='full'
                    type='secondary-gray'
                    text={translations[language].forgotPassword}
                  /> */}
                </div>
                {/* Error message */}
                {error !== "" && (
                  <div className='flex justify-center'>
                    <span className='text-error-500'>{error}</span>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className='hidden w-full lg:flex lg:w-1/2'>
        <img className='object-cover min-w-full min-h-full ' src={logo} />
      </div>
    </div>
  );
}
