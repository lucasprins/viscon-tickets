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
import MachineService from "../../../features/machines/machinesService";
import { MachineType } from "../../../utils/types";

type formValues = {
  type: string;
  blueprintNumber: string;
};

var translations = require("../../../translations/allTranslations.json");

const ModalAddMachine = ({
  state,
  onClose,
  setMachines,
}: {
  state: boolean;
  onClose: () => void;
  setMachines: React.Dispatch<React.SetStateAction<MachineType[] | undefined>>;
}) => {
  const { appState } = useAppContext();
  const language = appState.language;

  const [addingMachine, setAddingMachine] = React.useState(false);

  let cancelToken = axios.CancelToken;
  let source = cancelToken.source();

  const formValues: formValues = {
    type: "",
    blueprintNumber: "",
  };

  const submitAddMachine = async (values: formValues) => {
    setAddingMachine(true);
    const response = await MachineService.addMachine(source.token, values.type, values.blueprintNumber);

    setAddingMachine(false);

    if (response.data.success) {
      setMachines(response.data.data);
      onClose();
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
              <Dialog.Title className='text-xl font-semibold text-gray-900 dark:text-white'>{translations[language].machineType}</Dialog.Title>
              <ButtonIcon
                icon={<IconClose size='20' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                onclick={onClose}
              />
            </div>
            <div className='flex flex-col w-full gap-4'>
              <Formik
                initialValues={formValues}
                onSubmit={(values) => submitAddMachine(values)}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({ errors, touched, isValidating }) => (
                  <Form className='flex flex-col'>
                    {/* Inputs */}
                    <div className='flex flex-col gap-4'>
                      <div className='flex flex-col gap-1.5'>
                        <InputLabel htmlFor='type' text={translations[language].typeName} />
                        <InputField
                          style='iconless'
                          type='text'
                          validate={(input) => validateTextInput(input, language)}
                          placeholder='Satteliet shuttle'
                          id='type'
                          name='type'
                        />
                        <InputErrorMessage name='adminFirstName' />
                      </div>
                      <div className='flex flex-col gap-1.5'>
                        <InputLabel htmlFor='blueprintNumber' text={translations[language].blueprint_number} />
                        <InputField
                          style='iconless'
                          type='text'
                          validate={(input) => validateTextInput(input, language)}
                          placeholder='0294240'
                          id='blueprintNumber'
                          name='blueprintNumber'
                        />
                        <InputErrorMessage name='adminLastName' />
                      </div>
                      <div className='flex flex-col gap-4 pt-4 md:flex-row-reverse'>
                        <Button
                          formType='submit'
                          size='medium'
                          width='full'
                          type='primary'
                          text={translations[language].add}
                          disabled={addingMachine}
                          icon={
                            addingMachine ? (
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
                          disabled={addingMachine}
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

export default ModalAddMachine;
