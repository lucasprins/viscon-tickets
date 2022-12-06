import { Transition, Dialog } from "@headlessui/react";
import { Formik, Form } from "formik";
import React, { Fragment } from "react";
import { useAppContext } from "../../../utils/hooks";
import {
  emailExists,
  validateCompanyName,
  validateName,
} from "../../../utils/input-validation";
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

type formValues = {
  companyName: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
};

var translations = require("../../../translations/allTranslations.json");

const ModalAddCompany = ({ state, onClose }: { state: boolean; onClose: () => void }) => {
  const { appState } = useAppContext();
  const language = appState.language;  

  const [selectedCountry, setSelectedCountry] = React.useState(countries[0]);
  const [addingCompany, setAddingCompany] = React.useState(false);

  let cancelToken = axios.CancelToken;
  let source = cancelToken.source();

  const onChange = (payload: string) => {
    setSelectedCountry(payload);
  };

  const formValues: formValues = {
    companyName: "",
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
  };

  const submitAddCompany = async (values: formValues) => {
    setAddingCompany(true);
    const response = await CompanyService.addCompany(
      values.companyName,
      selectedCountry,
      values.adminFirstName,
      values.adminLastName,
      values.adminEmail,
      source.token
    );

    setAddingCompany(false);

    if (response.data.success) {
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
          className='absolute inset-0 z-50 flex justify-center p-5 md:items-center md:p-0'
          open={state}
          onClose={onClose}
        >
          <Dialog.Panel className='flex flex-col items-center w-full gap-4 p-5 overflow-y-scroll bg-white no-scrollbar dark:bg-dark-800 md:w-96 rounded-xl drop-shadow'>
            <div className='flex items-center justify-between w-full'>
              <Dialog.Title className='text-xl font-semibold text-gray-900 dark:text-white'>{translations[language].addACompany}</Dialog.Title>
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
                        <InputLabel htmlFor='companyName' text={translations[language].name} />
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
                      <InputSelectAutoComplete label={translations[language].country} options={countries} onChange={onChange} />
                      <Dialog.Title className='mt-2 text-xl font-semibold text-gray-900 dark:text-white'>
                        {translations[language].adminAccountName}
                      </Dialog.Title>
                      <div className='flex flex-col gap-1.5'>
                        <InputLabel htmlFor='adminFirstName' text={translations[language].First_name} />
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
                        <InputLabel htmlFor='adminLastName' text={translations[language].Last_name} />
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
                        <InputLabel htmlFor='adminEmail' text={translations[language].email} />
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
                      <div className='flex flex-col gap-4 pt-4 md:flex-row-reverse'>
                        <Button
                          formType='submit'
                          size='medium'
                          width='full'
                          type='primary'
                          text={translations[language].add}
                          disabled={addingCompany}
                          icon={
                            addingCompany ? (
                              <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />
                            ) : undefined
                          }
                        />
                        <Button
                          size='medium'
                          width='full'
                          type='secondary-gray'
                          text={translations[language].cancelled}
                          onclick={onClose}
                          disabled={addingCompany}
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
