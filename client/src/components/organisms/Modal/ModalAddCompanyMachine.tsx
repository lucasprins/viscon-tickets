import { Transition, Dialog } from "@headlessui/react";
import { Formik, Form } from "formik";
import React, { Fragment, useEffect } from "react";
import { useAppContext } from "../../../utils/hooks";
import { companyMachineExists, emailExists, validateCompanyName, validateName } from "../../../utils/input-validation";
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
import { CompanyMachineJoined, companyType, MachineType } from "../../../utils/types";
import MachineService from "../../../features/machines/machinesService";
import { InputDropdown } from "../../atoms/Input/InputDropdown";

type formValues = {
  name: string;
};

var translations = require("../../../translations/allTranslations.json");

const ModalAddCompanyMachine = ({
  state,
  onClose,
  company,
  setCompanyMachines
}: {
  state: boolean;
  onClose: () => void;
  company: companyType;
  setCompanyMachines: React.Dispatch<React.SetStateAction<CompanyMachineJoined[] | undefined>>
}) => {
  const { appState } = useAppContext();
  const language = appState.language;

  const [addingCompanyMachine, setAddingCompanyMachine] = React.useState(false);
  const [machines, setMachines] = React.useState<MachineType[]>();
  const [selectedMachine, setSelectedMachine] = React.useState<MachineType>();

  let cancelToken = axios.CancelToken;
  let source = cancelToken.source();

  const handleChange = (payload: MachineType) => {
    setSelectedMachine(payload);
  };

  const formValues: formValues = {
    name: "",
  };

  const submitAddCompanyMachine = async (values: formValues) => {
    setAddingCompanyMachine(true);
    if (selectedMachine) {
      const response = await MachineService.addCompanyMachine(values.name, company.id, selectedMachine.id);
      console.log(response);
      
      if (response.data.success) {
        onClose();
        setCompanyMachines(response.data.data);
      }
    }

    setAddingCompanyMachine(false);
  };

  const fetchMachines = async () => {
    const response = await MachineService.getAllMachines(source.token);
    if (response.data.success) {
      setMachines(response.data.data);
    }
    setSelectedMachine(response.data.data[0]);
  };

  useEffect(() => {
    fetchMachines();

    return () => {
      source.cancel();
    };
  }, []);

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
          className='absolute inset-0 z-50 flex items-center justify-center p-5 md:p-0'
          open={state}
          onClose={onClose}
        >
          <Dialog.Panel className='flex flex-col items-center h-full w-full max-h-[28.825rem] gap-4 p-5 overflow-y-scroll bg-white no-scrollbar dark:bg-dark-800 md:w-96 rounded-xl drop-shadow'>
            <div className='flex items-center justify-between w-full'>
              <Dialog.Title className='text-xl font-semibold text-gray-900 dark:text-white'>{translations[language].addAMachine}</Dialog.Title>
              <ButtonIcon
                icon={<IconClose size='20' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                onclick={onClose}
              />
            </div>
            <div className='flex flex-col w-full h-full gap-4'>
              <Formik
                initialValues={formValues}
                onSubmit={(values) => submitAddCompanyMachine(values)}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({ errors, touched, isValidating }) => (
                  <Form className='flex flex-col h-full '>
                    {/* Inputs */}
                    <div className='flex flex-col justify-between h-full gap-4'>
                      <div>
                        {machines !== undefined && selectedMachine !== undefined ? (
                          <InputDropdown
                            label={translations[language].machines}
                            options={machines}
                            selectedOption={selectedMachine}
                            selectedKey={"type"}
                            onchange={handleChange}
                            identifier={"id"}
                          />
                        ) : undefined}
                        <div className='flex flex-col gap-1.5'>
                          <InputLabel htmlFor='name' text={translations[language].name} />
                          <InputField
                            style='iconless'
                            type='text'
                            validate={(input) => companyMachineExists(company.id, input, language)}
                            placeholder='John'
                            id='name'
                            name='name'
                          />
                          <InputErrorMessage name='name' />
                        </div>
                      </div>

                      <div className='flex flex-col gap-4 pt-4 md:flex-row-reverse'>
                        <Button
                          formType='submit'
                          size='medium'
                          width='full'
                          type='primary'
                          text={translations[language].add}
                          disabled={addingCompanyMachine}
                          icon={
                            addingCompanyMachine ? (
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
                          disabled={addingCompanyMachine}
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

export default ModalAddCompanyMachine;
