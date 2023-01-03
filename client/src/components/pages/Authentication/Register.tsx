import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "../../../features/auth/authService";
import TokenService from "../../../services/tokenService";
import { useAppContext, useModalContext, useQuery } from "../../../utils/hooks";
import { validatePassword, validatePhoneNumber } from "../../../utils/input-validation";
import { Button } from "../../atoms/Button/Button";
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconCheck, IconKey, IconPhone } from "../../atoms/Icons/Icons";
import { IconFlag } from "../../atoms/Icons/IconsFlags";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { RegisterModals } from "./RegisterModals";

const translations = require("../../../translations/allTranslations.json");

export function Register() {
  const language = useAppContext().appState.language;
  const query = useQuery();
  const navigate = useNavigate();
  const { modalDispatch } = useModalContext();

  const [token] = useState(() => query.get("token"));
  const [correctPassword, setCorrectPassword] = useState(false);

  const [modals, setModals] = useState({
    password: false,
    registerFailed: false,
  });

  const [tokenVerified, setTokenVerified] = useState(false);
  const [verifyingToken, setVerifyingToken] = useState(true);
  const [verifyFailed, setVerifyFailed] = useState(false);

  const [registering, setRegistering] = useState(false);
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  const initialFormValues = {
    passwordOne: "",
    passwordTwo: "",
    phoneNumber: "",
  };

  const submitRegistration = async (values: typeof initialFormValues) => {
    if (values.passwordOne !== values.passwordTwo) {
      setCorrectPassword(false);
      setModals({ ...modals, password: true });
      return;
    }

    setRegistering(true);
    if (token && values.passwordOne && values.phoneNumber) {
      try {
        const response = await AuthService.register(values.passwordOne, values.phoneNumber, token);

        if (response.data.success) {
          setRegistrationSuccessful(true);
        }
      } catch {
        setModals({ ...modals, registerFailed: true });
      }
    }
    setRegistering(false);
  };

  useEffect(() => {
    (async () => {
      setVerifyingToken(true);
      if (token) {
        try {
          const response = await TokenService.verifyToken(token, "REGISTER");

          if (response.data.success) {
            setTokenVerified(true);
          }
        } catch {
          setTokenVerified(false);
          setVerifyFailed(true);
        }
      }
      setVerifyingToken(false);
    })();
  }, []);

  return (
    <>
      {registrationSuccessful ? (
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
                  {translations[language].registerCompleted}
                </h1>
                <p className='text-center text-gray-600 text-md dark:text-dark-400'>
                  {translations[language].registerCompletedSubtitle}
                </p>
              </div>
            </div>
            <Button formType='button' size='medium' width='full' type='primary' text='Continue' url='/login' />
          </div>
        </div>
      ) : (
        <>
          <RegisterModals registerModals={modals} setRegisterModals={setModals} />

          <button
            className='absolute bottom-8 left-8'
            onClick={() => {
              modalDispatch({ type: "TOGGLE_BACKDROP" });
              modalDispatch({ type: "TOGGLE_LANGUAGE" });
            }}
          >
            <IconFlag language={language} size='24' />
          </button>

          <div className='flex justify-center w-screen h-screen p-6 md:py-24 dark:bg-dark-800'>
            <div className='flex flex-col items-center gap-8'>
              {verifyingToken ? (
                <div className='flex flex-col items-center gap-8'>
                  <Spinner size='w-16 h-16' color='text-gray-200 dark:text-dark-600' fill='fill-primary-600' />
                  <h1 className='font-semibold text-center text-gray-900 text-display_xs dark:text-white'>
                    Please hang on while we verify your registration token...
                  </h1>
                </div>
              ) : tokenVerified ? (
                <>
                  <div className='flex flex-col items-center gap-6 md:w-96'>
                    <FeaturedIcon
                      type='primary'
                      size='xl'
                      icon={<IconKey size='26' color='stroke-primary-500' fill='fill-primary-500' />}
                    />
                    <div className='flex flex-col gap-3'>
                      <h1 className='font-semibold text-center text-gray-900 text-display_sm dark:text-white'>
                        {translations[language].registerTitle}
                      </h1>
                      <p className='text-center text-gray-600 text-md dark:text-dark-400'>
                        {translations[language].registerSubtitle}
                      </p>
                    </div>
                  </div>

                  <Formik initialValues={initialFormValues} onSubmit={(values) => submitRegistration(values)}>
                    {({ errors, touched, isValidating }) => (
                      <Form className='flex flex-col w-full gap-6'>
                        <div className='flex flex-col gap-5'>
                          <div className='flex flex-col gap-1.5 w-full'>
                            <InputLabel htmlFor='passwordOne' text='Password' />
                            <InputField
                              style='iconless'
                              type='password'
                              validate={(input) => validatePassword(input, language)}
                              placeholder={translations[language].passwordPlaceholder}
                              id='passwordOne'
                              name='passwordOne'
                            />
                            <InputErrorMessage name='passwordOne' />
                          </div>
                          <div className='flex flex-col gap-1.5 w-full'>
                            <InputLabel htmlFor='passwordTwo' text='Password' />
                            <InputField
                              style='iconless'
                              type='password'
                              validate={(input) => validatePassword(input, language)}
                              placeholder={translations[language].passwordPlaceholder}
                              id='passwordTwo'
                              name='passwordTwo'
                            />
                            <InputErrorMessage name='passwordTwo' />
                          </div>
                          <div className='flex flex-col gap-1.5 w-full'>
                            <InputLabel htmlFor='phoneNumber' text='Phone number' />
                            <InputField
                              style='icon'
                              icon={
                                <IconPhone
                                  size='18'
                                  color='stroke-gray-500 dark:stroke-gray-400'
                                  fill='fill-gray-500 dark:fill-gray-500'
                                />
                              }
                              type='tel'
                              validate={(input) => validatePhoneNumber(input, language)}
                              placeholder='Ex. 0612345678'
                              id='phoneNumber'
                              name='phoneNumber'
                            />
                            <InputErrorMessage name='phoneNumber' />
                          </div>
                        </div>

                        <Button
                          formType='submit'
                          size='medium'
                          width='full'
                          type='primary'
                          text={translations[language].submit}
                          disabled={registering}
                          icon={
                            registering ? (
                              <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />
                            ) : undefined
                          }
                        />
                      </Form>
                    )}
                  </Formik>
                </>
              ) : verifyFailed ? (
                <div className='flex flex-col items-center gap-8'>
                  <h1 className='font-semibold text-center text-gray-900 text-display_xs dark:text-white'>
                    Verification has failed. Please try again later.
                  </h1>
                </div>
              ) : (
                <div className='flex flex-col items-center gap-8'>
                  <h1 className='font-semibold text-center text-gray-900 text-display_xs dark:text-white'>
                    Unable to verify registration token
                  </h1>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
