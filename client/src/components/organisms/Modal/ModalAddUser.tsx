import { Transition, Dialog } from "@headlessui/react";
import { Formik, Form } from "formik";
import React, { Fragment } from "react";
import { useAppContext } from "../../../utils/hooks";
import { emailExists, validateCompanyName, validateTextInput } from "../../../utils/input-validation";
import { ButtonIcon } from "../../atoms/Button/ButtonIcon";
import { IconClose } from "../../atoms/Icons/Icons";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";
import InputSelectAutoComplete from "../../atoms/Input/InputSelectAutoComplete";
import { countries } from "../../../utils/countries";
import { Button } from "../../atoms/Button/Button";
import { Spinner } from "../../atoms/Spinner/Spinner";
import axios from "axios";
import CompanyService from "../../../features/customers/companyService";
import { companyType, userType } from "../../../utils/types";
import UserService from "../../../features/user/userService";

type formValues = {
  firstName: string;
  lastName: string;
  email: string;
};

var translations = require("../../../translations/allTranslations.json");

const ModalAddUser = ({
  state,
  onClose,
  setUsers,
  company,
}: {
  state: boolean;
  onClose: () => void;
  setUsers: React.Dispatch<React.SetStateAction<userType[] | undefined>>;
  company: companyType;
}) => {
  const { appState } = useAppContext();
  const language = appState.language;

  const [addingUser, setAddingUser] = React.useState(false);

  const formValues: formValues = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const submitAddUser = async (values: formValues) => {
    setAddingUser(true);
    const role = company.name === "Viscon" ? "VisconEmployee" : "CustomerEmployee";
    await UserService.addUser(values.firstName, values.lastName, values.email, role, company.id || "").then(
      (response) => {
        if (response.data.success) {
          setUsers(response.data.data);
          onClose();
        }
      }
    );

    setAddingUser(false);
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
                {translations[language]["admin.users.add-user-modal.title"]}
              </Dialog.Title>
              <ButtonIcon
                icon={<IconClose size='20' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                onclick={onClose}
              />
            </div>
            <div className='flex flex-col w-full gap-4'>
              <Formik
                initialValues={formValues}
                onSubmit={(values) => submitAddUser(values)}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({ errors, touched, isValidating }) => (
                  <Form className='flex flex-col'>
                    {/* Inputs */}
                    <div className='flex flex-col gap-4'>
                      <div className='flex flex-col gap-1.5'>
                        <InputLabel htmlFor='firstName' text={translations[language].First_name} />
                        <InputField
                          style='iconless'
                          type='text'
                          validate={(input) => validateCompanyName(input, language)}
                          placeholder='John'
                          id='firstName'
                          name='firstName'
                        />
                        <InputErrorMessage name='firstName' />
                      </div>
                      <div className='flex flex-col gap-1.5'>
                        <InputLabel htmlFor='lastName' text={translations[language].Last_name} />
                        <InputField
                          style='iconless'
                          type='text'
                          validate={(input) => validateTextInput(input, language)}
                          placeholder='Doe'
                          id='lastName'
                          name='lastName'
                        />
                        <InputErrorMessage name='lastName' />
                      </div>
                      <div className='flex flex-col gap-1.5'>
                        <InputLabel htmlFor='email' text={translations[language].email} />
                        <InputField
                          style='iconless'
                          type='text'
                          validate={(input) => emailExists(input, language)}
                          placeholder='admin@ad.min'
                          id='email'
                          name='email'
                        />
                        <InputErrorMessage name='email' />
                      </div>
                      <div className='flex flex-col gap-4 pt-4 md:flex-row-reverse'>
                        <Button
                          formType='submit'
                          size='medium'
                          width='full'
                          type='primary'
                          text={translations[language].add}
                          disabled={addingUser}
                          icon={
                            addingUser ? (
                              <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />
                            ) : undefined
                          }
                        />
                        <Button
                          size='medium'
                          width='full'
                          type='secondary-gray'
                          text={translations[language].cancel}
                          onclick={onClose}
                          disabled={addingUser}
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

export default ModalAddUser;
