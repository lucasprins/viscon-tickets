import { Transition, Dialog } from "@headlessui/react";
import { Formik, Form } from "formik";
import React, { Fragment, useEffect } from "react";
import { useAppContext } from "../../../utils/hooks";
import { companyMachineExists, validateTextInput } from "../../../utils/input-validation";
import { ButtonIcon } from "../../atoms/Button/ButtonIcon";
import { IconClose } from "../../atoms/Icons/Icons";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { Button } from "../../atoms/Button/Button";
import { Spinner } from "../../atoms/Spinner/Spinner";
import axios from "axios";
import { CompanyMachineJoined, companyType, IssueType, MachineType } from "../../../utils/types";
import MachineService from "../../../features/machines/machinesService";
import InputDropdownAutoComplete from "../../atoms/Input/InputDropdownAutoComplete";
import { InputLabel } from "../../atoms/Input/InputLabel";
import IssueService from "../../../services/issueService";
import { InputTextArea } from "../../atoms/Input/InputTextArea";

type formValues = {
  description: string;
};

var translations = require("../../../translations/allTranslations.json");

const ModalAddIssue = ({
  state,
  onClose,
  setIssues,
}: {
  state: boolean;
  onClose: () => void;
  setIssues: React.Dispatch<React.SetStateAction<IssueType[]>>;
}) => {
  const { appState } = useAppContext();
  const language = appState.language;

  const [addingIssue, setAddingIssue] = React.useState(false);
  const [machines, setMachines] = React.useState<MachineType[]>();
  const [selectedMachine, setSelectedMachine] = React.useState<MachineType>();

  let cancelToken = axios.CancelToken;
  let source = cancelToken.source();

  const handleChange = (payload: MachineType) => {
    setSelectedMachine(payload);
  };

  const formValues: formValues = {
    description: "",
  };

  const submitAddIssue = async (values: formValues) => {
    setAddingIssue(true);
    if (selectedMachine) {
      await IssueService.addIssue(selectedMachine.id, values.description).then((response) => {
        if (response.data.success) {
          onClose();
          setIssues(response.data.data);
        }
      });
    }

    setAddingIssue(false);
  };

  const fetchMachines = async () => {
    try {
      const response = await MachineService.getAllMachines(source.token);
      if (response.data.success) {
        setMachines(response.data.data);
      }
      setSelectedMachine(response.data.data[0]);
    } catch (error) {
      // MODAL RENDEREN MET ERROR
    }
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
              <Dialog.Title className='text-xl font-semibold text-gray-900 dark:text-white'>
                {translations[language]["admin.issues.add-issue-modal.title"]}
              </Dialog.Title>
              <ButtonIcon
                icon={<IconClose size='20' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                onclick={onClose}
              />
            </div>
            <div className='flex flex-col w-full h-full gap-4'>
              <Formik
                initialValues={formValues}
                onSubmit={(values) => submitAddIssue(values)}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({ errors, touched, isValidating }) => (
                  <Form className='flex flex-col h-full '>
                    {/* Inputs */}
                    <div className='flex flex-col justify-between h-full gap-4'>
                      <div className='flex flex-col gap-4'>
                        {machines !== undefined && selectedMachine !== undefined ? (
                          <InputDropdownAutoComplete
                            label={translations[language].search_machine}
                            options={machines}
                            selectedOption={selectedMachine}
                            selectedKey={"type"}
                            onchange={handleChange}
                            identifier={"type"}
                          />
                        ) : undefined}
                        <div className='flex flex-col gap-1.5'>
                          <InputLabel htmlFor='description' text={translations[language]["general.description"]} />
                          <InputTextArea
                            touched={touched.description}
                            error={errors.description}
                            validate={(input) => validateTextInput(input, language)}
                            id='description'
                            name='description'
                            placeholder={translations[language]["admin.issues.add-issue-modal.placeholder"]}
                          />
                          <InputErrorMessage name='description' />
                        </div>
                      </div>

                      <div className='flex flex-col gap-4 pt-4 md:flex-row-reverse'>
                        <Button
                          formType='submit'
                          size='medium'
                          width='full'
                          type='primary'
                          text={translations[language].add}
                          disabled={addingIssue}
                          icon={
                            addingIssue ? (
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
                          disabled={addingIssue}
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

export default ModalAddIssue;
