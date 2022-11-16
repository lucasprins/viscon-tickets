import { Transition, Dialog } from "@headlessui/react";
import { Formik, Form } from "formik";
import React, { Fragment } from "react";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { emailExists, validateCompanyName, validateEmail, validateName, validatePassword } from "../../../utils/input-validation";
import { ButtonIcon } from "../../atoms/Button/ButtonIcon";
import { Divider } from "../../atoms/Divider/Divider";
import { IconClose, IconKey, IconMail } from "../../atoms/Icons/Icons";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";
import InputSelectAutoComplete from "../../atoms/Input/InputSelectAutoComplete";
import { countries } from "../../../utils/countries";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import { Button } from "../../atoms/Button/Button";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { getAccessToken } from "../../../features/auth/authSlice";
import axios from "axios";
import CompanyService from "../../../features/customers/companyService";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";
import { toggleBackdrop } from "../../../features/modal/modalSlice";

type formValues = {
  companyName: string;
  adminFirstName: string;
  adminPrefix: string;
  adminLastName: string;
  adminEmail: string;
};

const ModalAddCompany = ({ state, onClose }: { state: boolean; onClose: () => void }) => {
  const language = useAppSelector(getCurrentLanguage);
  const accessToken = useAppSelector(getAccessToken) || "";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [selectedCountry, setSelectedCountry] = React.useState(countries[0]);
  const [addingCompany, setAddingCompany] = React.useState(false);
  const [addedCompanySuccess, setAddedCompanySuccess] = React.useState();

  const [companyExists, setCompanyExists] = React.useState(false);

  let cancelToken = axios.CancelToken;
  let source = cancelToken.source();

  const onChange = (payload: string) => {
    setSelectedCountry(payload);
  };

  const formValues: formValues = {
    companyName: "",
    adminFirstName: "",
    adminPrefix: "",
    adminLastName: "",
    adminEmail: "",
  };

  const submitAddCompany = async (values: formValues) => {
    setAddingCompany(true);
    const response = await CompanyService.addCompany(
      accessToken,
      values.companyName,
      selectedCountry,
      values.adminFirstName,
      values.adminPrefix,
      values.adminLastName,
      values.adminEmail,
      source.token
    );

    if (response.data.message == "companyExists") {
      setCompanyExists(true);
    }

    setAddedCompanySuccess(response.data.success);
    setAddingCompany(false);

    if(response.data.success) {
      onClose();
      window.location.reload();
    }
  };

  return (
    <>
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
          className='absolute inset-0 z-50 flex justify-center p-5 lg:items-center lg:p-0'
          open={state}
          onClose={onClose}
        >
          <Dialog.Panel className='flex flex-col items-center w-full gap-4 p-5 overflow-y-scroll bg-white no-scrollbar dark:bg-dark-800 lg:w-96 rounded-xl drop-shadow'>
            <div className='flex items-center justify-between w-full'>
              <Dialog.Title className='text-xl font-semibold text-gray-900 dark:text-white'>Add a company</Dialog.Title>
              <ButtonIcon
                icon={<IconClose size='20' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                onclick={onClose}
              />
            </div>
            <div className='flex flex-col w-full gap-4'>
              <Formik
                initialValues={formValues}
                onSubmit={(values) => submitAddCompany(values)}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({ errors, touched, isValidating }) => (
                  <Form className='flex flex-col'>
                    {/* Inputs */}
                    <div className='flex flex-col gap-4'>
                      <div className='flex flex-col gap-1.5'>
                        <InputLabel htmlFor='companyName' text='Name' />
                        <InputField
                          style='iconless'
                          type='text'
                          validate={(input) => validateCompanyName(input, language)}
                          placeholder='Viscon'
                          id='companyName'
                          name='companyName'
                        />
                        <InputErrorMessage name='companyName' />
                      </div>
                      <InputSelectAutoComplete label='Country' options={countries} onChange={onChange} />
                      <Dialog.Title className='mt-2 text-xl font-semibold text-gray-900 dark:text-white'>
                        Admin account
                      </Dialog.Title>
                      <div className='flex flex-col gap-1.5'>
                        <InputLabel htmlFor='adminFirstName' text='First name' />
                        <InputField
                          style='iconless'
                          type='text'
                          validate={(input) => validateName(input, language)}
                          placeholder='John'
                          id='adminFirstName'
                          name='adminFirstName'
                        />
                        <InputErrorMessage name='adminFirstName' />
                      </div>
                      <div className='flex flex-col gap-1.5'>
                        <InputLabel htmlFor='adminPrefix' text='Prefix' />
                        <InputField
                          style='iconless'
                          type='text'
                          placeholder='van der'
                          id='adminPrefix'
                          name='adminPrefix'
                        />
                        <InputErrorMessage name='adminPrefix' />
                      </div>
                      <div className='flex flex-col gap-1.5'>
                        <InputLabel htmlFor='adminLastName' text='Last name' />
                        <InputField
                          style='iconless'
                          type='text'
                          validate={(input) => validateName(input, language)}
                          placeholder='Heuvel'
                          id='adminLastName'
                          name='adminLastName'
                        />
                        <InputErrorMessage name='adminLastName' />
                      </div>
                      <div className='flex flex-col gap-1.5'>
                        <InputLabel htmlFor='adminEmail' text='Email' />
                        <InputField
                          style='iconless'
                          type='text'
                          validate={(input) => emailExists(input, language)}
                          placeholder='admin@ad.min'
                          id='adminEmail'
                          name='adminEmail'
                        />
                        <InputErrorMessage name='adminEmail' />
                      </div>
                      <div className='flex flex-col-reverse gap-4 pt-4 md:flex-row'>
                        <Button
                          size='medium'
                          width='full'
                          type='secondary-gray'
                          text='Cancel'
                          onclick={onClose}
                          disabled={addingCompany}
                        />
                        <Button
                          formType='submit'
                          size='medium'
                          width='full'
                          type='primary'
                          text='Add'
                          disabled={addingCompany}
                          icon={
                            addingCompany ? (
                              <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />
                            ) : undefined
                          }
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

export default ModalAddCompany;
