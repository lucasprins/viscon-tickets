import { Transition, Dialog } from "@headlessui/react";
import { Formik, Form } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { useAppContext, useAppDispatch, useModalContext } from "../../../utils/hooks";
import { emailExists, validateCompanyName, validateTextInput } from "../../../utils/input-validation";
import { ButtonIcon } from "../../atoms/Button/ButtonIcon";
import { IconClose } from "../../atoms/Icons/Icons";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { Button } from "../../atoms/Button/Button";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { InputTextArea } from "../../atoms/Input/InputTextArea";
import TicketService from "../../../features/tickets/ticketsService";

type formValues = {
  cancelReason: string;
};

const TicketCancelModal = ({ ticketId, state, onClose }: { ticketId: string; state: boolean; onClose: () => void }) => {
  const { appState } = useAppContext();
  const { modalDispatch } = useModalContext();
  const language = appState.language;
  
  const [cancellingTicket, setCancellingTicket] = useState(false);

  const handleSubmit = async (values: formValues) => {
    setCancellingTicket(true);
    const response = await TicketService.cancelTicket(ticketId, values.cancelReason);
    if (response.data.success) {
      handleClose(); // hoisting :)
    }
    setCancellingTicket(false);
    window.location.reload();
  };

  const handleClose = () => {
    onClose();
    modalDispatch({ type: "TOGGLE_BACKDROP"});
  };

  const formValues: formValues = {
    cancelReason: "",
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
          onClose={handleClose}
        >
          <Dialog.Panel className='flex flex-col items-center w-full gap-4 p-5 overflow-y-scroll bg-white no-scrollbar dark:bg-dark-800 md:w-96 rounded-xl drop-shadow'>
            <div className='flex items-center justify-between w-full'>
              <Dialog.Title className='text-xl font-semibold text-gray-900 dark:text-white'>
                Cancellation reason
              </Dialog.Title>
              <ButtonIcon
                icon={<IconClose size='20' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                onclick={handleClose}
              />
            </div>
            <div className='flex flex-col w-full gap-4'>
              <Formik
                initialValues={formValues}
                onSubmit={(values) => handleSubmit(values)}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({ errors, touched, isValidating }) => (
                  <Form className='flex flex-col'>
                    {/* Inputs */}
                    <div className='flex flex-col gap-4'>
                      <div className='flex flex-col gap-1.5'>
                        <InputTextArea
                          touched={touched.cancelReason}
                          error={errors.cancelReason}
                          validate={(input) => validateTextInput(input, language)}
                          placeholder='Enter the reason...'
                          id='cancelReason'
                          name='cancelReason'
                        />
                        <InputErrorMessage name='cancelReason' />
                      </div>
                      <div className='flex flex-col gap-4 pt-4 md:flex-row-reverse'>
                        <Button
                          formType='submit'
                          size='medium'
                          width='full'
                          type='primary'
                          text='Submit reason'
                          disabled={cancellingTicket}
                          icon={
                            cancellingTicket ? (
                              <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />
                            ) : undefined
                          }
                        />
                        <Button
                          size='medium'
                          width='full'
                          type='secondary-gray'
                          text='Cancel'
                          onclick={handleClose}
                          disabled={cancellingTicket}
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

export default TicketCancelModal;
