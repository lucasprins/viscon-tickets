import { Transition, Dialog } from "@headlessui/react";
import { Formik, Form } from "formik";
import React, { Fragment } from "react";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppSelector } from "../../../utils/hooks";
import { validateCompanyName, validateEmail, validatePassword } from "../../../utils/input-validation";
import { ButtonIcon } from "../../atoms/Button/ButtonIcon";
import { Divider } from "../../atoms/Divider/Divider";
import { IconClose, IconKey, IconMail } from "../../atoms/Icons/Icons";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";

const ModalAddCompany = ({ state, onClose }: { state: boolean; onClose: () => void }) => {
  const language = useAppSelector(getCurrentLanguage);

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
          className='z-50 absolute inset-0 flex items-center p-5 lg:p-0 justify-center'
          open={state}
          onClose={onClose}
        >
          <Dialog.Panel className='bg-white dark:bg-dark-800 w-full p-5 lg:w-96 flex flex-col items-center gap-4 rounded-xl drop-shadow'>
            <div className='flex justify-between items-center w-full'>
              <Dialog.Title className='text-gray-900 dark:text-white text-xl font-semibold'>Add a company</Dialog.Title>
              <ButtonIcon
                icon={<IconClose size='20' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                onclick={onClose}
              />
            </div>
            <div className='flex flex-col w-full gap-4'>
              <Formik initialValues={{}} onSubmit={() => console.log()}>
                {({ errors, touched, isValidating }) => (
                  <Form className='flex flex-col'>
                    {/* Inputs */}
                    <div className='flex flex-col gap-4'>
                      <div className='flex flex-col gap-1.5'>
                        <InputLabel htmlFor='companyName' text='Company name' />
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
                      <div className='flex flex-col gap-1.5'>
                        <InputLabel htmlFor='companyName' text='Company name' />
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
