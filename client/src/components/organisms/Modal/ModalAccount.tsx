import { Transition, Dialog } from "@headlessui/react";
import { Formik, Form } from "formik";
import React, { Fragment } from "react";
import { useAppContext } from "../../../utils/hooks";
import { emailExists, validateCompanyName, validateEmail, validatePhoneNumber, validateTextInput } from "../../../utils/input-validation";
import { ButtonIcon } from "../../atoms/Button/ButtonIcon";
import { IconClose } from "../../atoms/Icons/Icons";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";
import { Button } from "../../atoms/Button/Button";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { userType } from "../../../utils/types";
import UserService from "../../../features/user/userService";

type formValues = {
  email: string;
  phoneNumber: string;
};

var translations = require("../../../translations/allTranslations.json");

const ModalAccount = ({ state, onClose, user }: { state: boolean; onClose: () => void; user: userType }) => {
  const { appState, appDispatch } = useAppContext();
  const language = appState.language;

  const [changingAccountData, setChangingAccountData] = React.useState(false);

  const formValues: formValues = {
    email: user.email,
    phoneNumber: user.phoneNumber,
  };

  const submitChangeAccountData = async (values: formValues) => {
    setChangingAccountData(true);

    const promiseChangeEmail = UserService.changeEmail(user.id, values.email);
    const promiseChangePhoneNumber = UserService.changePhoneNumber(user.id, values.phoneNumber);

    await Promise.all([promiseChangeEmail, promiseChangePhoneNumber]).then((res) => {
      if (res[0].data.success && res[1].data.success) {
        onClose();
      }

      appDispatch({
        type: "UPDATE_USER",
        payload: { ...user, email: res[0].data.data.email, phoneNumber: res[1].data.data.phoneNumber },
      });
    });

    setChangingAccountData(false);
  };

  return (
    <>
      <Transition
        appear
        show={state}
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-60'
        leave='ease-in duration-200'
        leaveFrom='opacity-60'
        leaveTo='opacity-0'
      >
        <div
          onClick={onClose}
          className={state ? `z-30 fixed inset-0 w-100 h-100 bg-dark-900 opacity-40 dark:opacity-70` : "hidden"}
        ></div>
      </Transition>
      <Transition
        appear
        show={state}
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-300'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Dialog
          className='absolute inset-0 z-50 flex justify-center p-5 md:items-center md:p-0'
          open={state}
          onClose={onClose}
        >
          <Dialog.Panel className='flex flex-col items-center w-full gap-4 p-5 overflow-y-scroll bg-white no-scrollbar dark:bg-dark-800 md:w-96 rounded-xl drop-shadow'>
            <div className='flex items-center justify-between w-full'>
              <Dialog.Title className='text-xl font-semibold text-gray-900 dark:text-white'>
                {translations[language]["account.modal.title"]}
              </Dialog.Title>
              <ButtonIcon
                icon={<IconClose size='20' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                onclick={onClose}
              />
            </div>
            <div className='flex flex-col w-full gap-4'>
              <Formik
                initialValues={formValues}
                onSubmit={(values) => submitChangeAccountData(values)}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({ errors, touched, isValidating }) => (
                  <Form className='flex flex-col'>
                    {/* Inputs */}
                    <div className='flex flex-col gap-4'>
                      <div className='flex flex-col gap-1.5'>
                        <InputLabel htmlFor='email' text={translations[language].email} />
                        <InputField
                          style='iconless'
                          type='email'
                          validate={(input) => validateEmail(input, language)}
                          placeholder='john@doe.com'
                          id='email'
                          name='email'
                        />
                        <InputErrorMessage name='email' />
                      </div>
                      <div className='flex flex-col gap-1.5'>
                        <InputLabel htmlFor='phoneNumber' text={translations[language].Phone_number} />
                        <InputField
                          style='iconless'
                          type='text'
                          validate={(input) => validatePhoneNumber(input, language)}
                          placeholder='012349988'
                          id='phoneNumber'
                          name='phoneNumber'
                        />
                        <InputErrorMessage name='phoneNumber' />
                      </div>
                      <div className='flex flex-col gap-4 pt-4 md:flex-row-reverse'>
                        <Button
                          formType='submit'
                          size='medium'
                          width='full'
                          type='primary'
                          text={translations[language]["account.modal.button-primary"]}
                          disabled={changingAccountData}
                          icon={
                            changingAccountData ? (
                              <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />
                            ) : undefined
                          }
                        />
                        <Button
                          size='medium'
                          width='full'
                          type='secondary-gray'
                          text={translations[language]["general.cancel"]}
                          onclick={onClose}
                          disabled={changingAccountData}
                        />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalAccount;