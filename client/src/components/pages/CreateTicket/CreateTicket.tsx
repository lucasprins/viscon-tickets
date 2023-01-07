import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../atoms/Button/Button";
import { Divider } from "../../atoms/Divider/Divider";
import { IconFlag } from "../../atoms/Icons/IconsFlags";
import { IconArrow, IconBuilding, IconPhone } from "../../atoms/Icons/Icons";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";
import { InputTextArea } from "../../atoms/Input/InputTextArea";
import { NavigationHeader } from "../../organisms/Navigation/NavigationHeader";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import { ProgressStep } from "../../atoms/Progress/ProgressStep";
import { useAppContext, useAuthentication, useModalContext } from "../../../utils/hooks";
import { validatePhoneNumber, validateTextInput } from "../../../utils/input-validation";
import { FileDropzone, UploadableFile } from "../../molecules/FileUpload/FileDropzone";
import { companyMachineType, createTicketType, MachineType, TicketIssueType, userType } from "../../../utils/types";
import { ButtonLink } from "../../atoms/Button/ButtonLink";
import { Navigate, useNavigate } from "react-router-dom";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { Modal } from "../../organisms/Modal/Modal";
import axios from "axios";
import MachineService from "../../../features/machines/machinesService";
import { KnowledgebaseIssuesList } from "../../molecules/MachineSolution/KnowledgebaseIssuesList";
import InputDropdownAutoComplete from "../../atoms/Input/InputDropdownAutoComplete";
import TicketService from "../../../features/tickets/ticketsService";
import FileService from "../../../services/file-upload/fileService";

var translations = require("../../../translations/allTranslations.json");

export function CreateTicket() {
  const { appState } = useAppContext();
  const { modalDispatch } = useModalContext();
  const user = appState.user;
  const language = appState.language;

  const [currentStep, setCurrentStep] = useState(1);
  const [modalState, setModalState] = useState({
    creationFailed: false,
    creationSuccess: false,
    backToDashboard: false,
  });

  const [creatingTicket, setCreatingTicket] = useState<boolean>(false);
  const navigate = useNavigate();

  const [ticketFiles, setTicketFiles] = useState<UploadableFile[]>([]);

  const [ticket, setTicket] = useState<createTicketType>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    company: user?.company || { name: "", id: "", country: "", isActive: true },
    phoneNumber: user?.phoneNumber || "",
    issueType: TicketIssueType.Hardware,
    issue: "",
    actionExpected: "",
    actionPerformed: "",
    extraInfo: "",
    machine: undefined,
  });

  const [loadingMachines, setLoadingMachines] = useState(true);
  const [machines, setMachines] = useState<MachineType[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<MachineType>();

  const [loadingCompanyMachines, setLoadingCompanyMachines] = useState(true);
  const [companyMachines, setCompanyMachines] = useState<companyMachineType[]>([]);
  const [selectedCompanyMachine, setSelectedCompanyMachine] = useState<companyMachineType>();

  let cancelTokenMachines = axios.CancelToken;
  let sourceMachines = cancelTokenMachines.source();
  let cancelTokenCompanyMachines = axios.CancelToken;
  let sourceCompanyMachines = cancelTokenCompanyMachines.source();

  const handleChangeSelectedMachine = (payload: MachineType) => {
    setSelectedMachine(payload);
  };

  const handleChangeSelectedCompanyMachine = (payload: companyMachineType) => {
    setSelectedCompanyMachine(payload);
    setTicket({ ...ticket, machine: payload });
  };

  const fetchAllMachines = async () => {
    setLoadingMachines(true);
    const response = await MachineService.getAllMachines(sourceMachines.token);
    if (response.data.success) {
      setMachines(response.data.data);
      setSelectedMachine(response.data.data[0]);
    }
    setLoadingMachines(false);
  };

  const fetchAllCompanyMachines = async () => {
    setLoadingCompanyMachines(true);
    const response = await MachineService.getAllCompanyMachines(sourceCompanyMachines.token);
    if (response.data.success) {
      response.data.data.unshift({ id: "", name: "", serialNumber: "", company: { name: "", id: "", country: "" } });
      setCompanyMachines(response.data.data);
      setSelectedCompanyMachine(response.data.data[0]);
      setTicket({ ...ticket, machine: response.data.data[0] });
    }
    setLoadingCompanyMachines(false);
  };

  useEffect(() => {
    fetchAllMachines();
    fetchAllCompanyMachines();

    return () => {
      sourceMachines.cancel();
      sourceCompanyMachines.cancel();
    };
  }, []);


  const addContactInformation = (values: any) => {
    setTicket({ ...ticket, ...values, machine: ticket.machine });
    setCurrentStep(3);
  };

  const addIssueInformation = (values: any) => {
    setTicket({ ...ticket, ...values, issueType: ticket.issueType, machine: ticket.machine });
    setCurrentStep(4);
  };

  const openLanguageModal = () => {
    modalDispatch({ type: "TOGGLE_BACKDROP" });
    modalDispatch({ type: "TOGGLE_LANGUAGE" });
  };

  const submitTicket = async () => {
    setCreatingTicket(true);
    let attachments: { url: string, key: string }[] = [];
    ticketFiles.forEach(file => {
      if(file.key && file.url) {
        attachments.push({ url: file.url, key: file.key });
      }
    })

    if (user) {
      await TicketService.createTicket(ticket, user, attachments)
        .then((res) => {
          if (res.data.success) {
            setModalState({ ...modalState, creationSuccess: true });
          } else {
            setModalState({ ...modalState, creationFailed: true });
          }
        })
        .catch((err) => {
          setModalState({ ...modalState, creationFailed: true });
        });
    }
    setCreatingTicket(false);
  };

  if (!useAuthentication()) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      {modalState.creationFailed && (
        <>
          <Modal
            type='error'
            title={translations[language]["createticket.modal.error.title"]}
            subtitle={translations[language]["createticket.modal.error.subtitle"]}
            is_open={true}
            close_modal={() => {}}
            button_primary_text={translations[language]["createticket.modal.error.button-primary"]}
            button_secondary_text={translations[language]["createticket.modal.error.button-secondary"]}
            button_primary_onclick={() => setModalState({ ...modalState, creationFailed: false })}
            button_secondary_onclick={() => navigate("/tickets")}
          />
        </>
      )}
      {modalState.creationSuccess && (
        <>
          <Modal
            type='success'
            title={translations[language]["createticket.modal.success.title"]}
            is_open={true}
            close_modal={() => {
              navigate("/tickets");
            }}
            button_primary_text={translations[language]["createticket.modal.success.button-primary"]}
            button_secondary_text={translations[language]["createticket.modal.success.button-secondary"]}
            button_primary_onclick={() => navigate("/tickets")}
            button_secondary_onclick={() => navigate("/knowledgebase")}
          />
        </>
      )}
      {modalState.backToDashboard && (
        <>
          <Modal
            type='primary'
            title={translations[language]["createticket.modal.dashboard.title"]}
            is_open={true}
            close_modal={() => {}}
            button_primary_text={translations[language]["createticket.modal.dashboard.button-primary"]}
            button_secondary_text={translations[language]["createticket.modal.dashboard.button-secondary"]}
            button_primary_onclick={() => navigate("/tickets")}
            button_secondary_onclick={() => setModalState({ ...modalState, backToDashboard: false })}
          />
        </>
      )}

      <div className='flex flex-col w-full md:flex-row md:h-screen dark:bg-dark-800 dark:text-white'>
        <div className='flex-col justify-between hidden w-1/3 py-12 pl-12 pr-16 border-r border-gray-200 bg-gray-50 dark:border-dark-600 dark:border dark:bg-dark-700 lg:flex'>
          <div className='flex flex-col gap-20'>
            <NavigationHeader />
            <div>
              <ProgressStep
                title={translations[language].view_solutions}
                subtitle={translations[language].view_solutions_subtitle}
                status={currentStep === 1 ? "current" : currentStep > 1 ? "complete" : "incomplete"}
                connector={false}
              />
              <ProgressStep
                title={translations[language].contact_information}
                subtitle={translations[language].contact_information_subtitle}
                status={currentStep === 2 ? "current" : currentStep > 2 ? "complete" : "incomplete"}
                connector={false}
              />
              <ProgressStep
                title={translations[language].describe_issue}
                subtitle={translations[language].describe_issue_subtitle}
                status={currentStep === 3 ? "current" : currentStep > 3 ? "complete" : "incomplete"}
                connector={false}
              />
              <ProgressStep
                title={translations[language].add_attachments}
                subtitle={translations[language].add_attachments_subtitle}
                status={currentStep === 4 ? "current" : currentStep > 4 ? "complete" : "incomplete"}
                connector={false}
              />
              <ProgressStep
                title={translations[language].review}
                subtitle={translations[language].review_subtitle}
                status={currentStep === 5 ? "current" : currentStep > 5 ? "complete" : "incomplete"}
                connector={false}
              />
            </div>
          </div>
          <button onClick={openLanguageModal}>
            <IconFlag language={language} size='24' />
          </button>
        </div>

        {currentStep === 1 && (
          <div className='flex flex-col items-center w-full px-6 py-6 overflow-y-scroll lg:w-2/3 lg:py-36'>
            <div className='flex flex-col w-full gap-6 lg:w-2/3'>
              <PageHeader
                title={translations[language].view_solutions}
                subtitle={translations[language].view_solutions_subtitle_long}
              />
              {selectedMachine && (
                <InputDropdownAutoComplete
                  label={translations[language].select_machine}
                  options={machines}
                  selectedOption={selectedMachine}
                  selectedKey={"type"}
                  onchange={handleChangeSelectedMachine}
                  identifier={"id"}
                />
              )}
              <Divider />
              {selectedMachine && <KnowledgebaseIssuesList selectedMachine={selectedMachine} />}
              <div className='flex flex-col-reverse gap-4 pt-4 sm:flex-row'>
                <Button
                  size='medium'
                  width='full'
                  type='secondary-gray'
                  text={translations[language].cancel_ticket}
                  url='/'
                />
                <Button
                  size='medium'
                  width='full'
                  type='primary'
                  text={translations[language].continue}
                  onclick={() => {
                    setCurrentStep(2);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className='flex flex-col items-center w-full px-6 py-6 overflow-y-scroll lg:w-2/3 lg:py-36'>
            <div className='flex flex-col items-start w-full gap-6 lg:w-2/3'>
              <ButtonLink
                size='medium'
                type='gray'
                onclick={() => setModalState({ ...modalState, backToDashboard: true })}
                icon={
                  <IconArrow
                    size='20'
                    color='stroke-gray-500 dark:stroke-dark-300'
                    fill='stroke-gray-500'
                    direction='left'
                  />
                }
                text={translations[language].backToDashboard}
              />
              <PageHeader
                title={translations[language].contact_information}
                subtitle={translations[language].contact_information_subtitle}
              />
              <Formik initialValues={ticket} onSubmit={addContactInformation}>
                {({ errors, touched, isValidating }) => (
                  <Form className='flex flex-col items-center w-full gap-5'>
                    <div className='flex w-full gap-4'>
                      <div className='flex flex-col w-full gap-1.5'>
                        <InputLabel htmlFor='firstName' text={translations[language].First_name} />
                        <InputField style='iconless' type='text' id='firstName' name='firstName' disabled={true} />
                      </div>
                      <div className='flex flex-col w-full gap-1.5'>
                        <InputLabel htmlFor='lastName' text={translations[language].Last_name} />
                        <InputField style='iconless' type='text' id='lastName' name='lastName' disabled={true} />
                      </div>
                    </div>
                    <div className='flex flex-col w-full gap-1.5'>
                      <InputLabel htmlFor='company.name' text={translations[language].Company_name} />
                      <InputField
                        style='icon'
                        type='text'
                        id='company.name'
                        name='company.name'
                        disabled={true}
                        icon={<IconBuilding size='20' color='stroke-gray-500' fill='fill-primary-500' />}
                      />
                    </div>
                    <div className='flex flex-col w-full gap-1.5'>
                      <InputLabel htmlFor='phoneNumber' text={translations[language].Phone_number} />
                      <InputField
                        touched={touched.phoneNumber}
                        error={errors.phoneNumber}
                        validate={(input) => validatePhoneNumber(input, language)}
                        style='icon'
                        type='tel'
                        id='phoneNumber'
                        name='phoneNumber'
                        icon={<IconPhone size='20' color='stroke-gray-500' fill='stroke-gray-500' />}
                      />
                      <InputErrorMessage name='phoneNumber' />
                    </div>
                    <div className='flex flex-row w-full gap-4 pt-4'>
                      <Button
                        size='medium'
                        width='full'
                        type='secondary-gray'
                        text={translations[language].back}
                        onclick={() => setCurrentStep(1)}
                      />
                      <Button
                        formType='submit'
                        size='medium'
                        width='full'
                        type='primary'
                        text={translations[language].confirm}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className='flex flex-col items-center w-full px-6 py-6 overflow-y-scroll lg:w-2/3 lg:py-36'>
            <div className='flex flex-col items-start w-full gap-6 lg:w-2/3'>
              <ButtonLink
                size='medium'
                type='gray'
                onclick={() => setModalState({ ...modalState, backToDashboard: true })}
                icon={
                  <IconArrow
                    size='20'
                    color='stroke-gray-500 dark:stroke-dark-300'
                    fill='stroke-gray-500'
                    direction='left'
                  />
                }
                text={translations[language].backToDashboard}
              />
              <PageHeader
                title={translations[language].describe_issue}
                subtitle={translations[language].describe_issue_subtitle}
              />
              {selectedCompanyMachine && (
                <>
                  {/* <InputDropdown
                  label={translations[language].select_company_machine}
                  options={companyMachines}
                  selectedOption={selectedCompanyMachine}
                  selectedKey={"name"}
                  onchange={handleChangeSelectedCompanyMachine}
                  identifier={"id"}
                /> */}
                  <InputDropdownAutoComplete
                    label={translations[language].select_company_machine}
                    options={companyMachines}
                    selectedOption={selectedCompanyMachine}
                    selectedKey={"name"}
                    onchange={handleChangeSelectedCompanyMachine}
                    identifier={"id"}
                  />
                </>
              )}
              <div className='flex w-full gap-3 -mt-3 md:gap-4'>
                <Button
                  size='small'
                  width='full'
                  type={ticket.issueType === "Hardware" ? "primary" : "secondary-gray"}
                  text='Hardware'
                  onclick={() => setTicket({ ...ticket, issueType: TicketIssueType.Hardware })}
                />
                <Button
                  size='small'
                  width='full'
                  type={ticket.issueType === "Software" ? "primary" : "secondary-gray"}
                  text='Software'
                  onclick={() => setTicket({ ...ticket, issueType: TicketIssueType.Software })}
                />
                <Button
                  size='small'
                  width='full'
                  type={ticket.issueType === "Other" ? "primary" : "secondary-gray"}
                  text={translations[language].other}
                  onclick={() => setTicket({ ...ticket, issueType: TicketIssueType.Other })}
                />
              </div>
              <Formik initialValues={ticket} onSubmit={addIssueInformation}>
                {({ errors, touched, isValidating }) => (
                  <Form className='flex flex-col w-full gap-5'>
                    <div className='flex flex-col w-full gap-1.5'>
                      <InputLabel htmlFor='issue' text={translations[language].describe_issue_specific} />
                      <InputTextArea
                        touched={touched.issue}
                        error={errors.issue}
                        validate={(input) => validateTextInput(input, language)}
                        id='issue'
                        name='issue'
                        placeholder={translations[language].describe_placeholder_specific}
                      />
                      <InputErrorMessage name='issue' />
                    </div>
                    <div className='flex flex-col w-full gap-1.5'>
                      <InputLabel htmlFor='actionExpected' text={translations[language].describe_issue_expectation} />
                      <InputTextArea
                        touched={touched.actionExpected}
                        error={errors.actionExpected}
                        validate={(input) => validateTextInput(input, language)}
                        id='actionExpected'
                        name='actionExpected'
                        placeholder={translations[language].describe_placeholder_expectation}
                      />
                      <InputErrorMessage name='actionExpected' />
                    </div>
                    <div className='flex flex-col w-full gap-1.5'>
                      <InputLabel htmlFor='actionPerformed' text={translations[language].describe_issue_tried} />
                      <InputTextArea
                        touched={touched.actionPerformed}
                        error={errors.actionPerformed}
                        validate={(input) => validateTextInput(input, language)}
                        id='actionPerformed'
                        name='actionPerformed'
                        placeholder={translations[language].describe_placeholder_tried}
                      />
                      <InputErrorMessage name='actionPerformed' />
                    </div>
                    <div className='flex flex-col w-full gap-1.5'>
                      <InputLabel htmlFor='extraInformation' text={translations[language].describe_issue_extra_info} />
                      <InputTextArea
                        touched={touched.extraInfo}
                        error={errors.extraInfo}
                        id='extraInformation'
                        name='extraInformation'
                        placeholder={translations[language].describe_placeholder_extra_info}
                      />
                    </div>

                    <div className='flex flex-row gap-4 pt-4'>
                      <Button
                        size='medium'
                        width='full'
                        type='secondary-gray'
                        text={translations[language].back}
                        onclick={() => setCurrentStep(2)}
                      />
                      <Button
                        formType='submit'
                        size='medium'
                        width='full'
                        type='primary'
                        text={translations[language].continue}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className='flex flex-col items-center w-full px-6 py-6 overflow-y-scroll lg:w-2/3 lg:py-36'>
            <div className='flex flex-col items-start w-full gap-6 lg:w-2/3'>
              <ButtonLink
                size='medium'
                type='gray'
                onclick={() => setModalState({ ...modalState, backToDashboard: true })}
                icon={
                  <IconArrow
                    size='20'
                    color='stroke-gray-500 dark:stroke-dark-300'
                    fill='stroke-gray-500'
                    direction='left'
                  />
                }
                text={translations[language].backToDashboard}
              />
              <PageHeader
                title={translations[language].add_attachments}
                subtitle={translations[language].add_attachments_subtitle}
              />
              <FileDropzone files={ticketFiles} setFiles={setTicketFiles} />
              <div className='flex flex-row w-full gap-4 pt-4'>
                <Button
                  size='medium'
                  width='full'
                  type='secondary-gray'
                  text={translations[language].back}
                  onclick={() => setCurrentStep(3)}
                />
                <Button
                  size='medium'
                  width='full'
                  type='primary'
                  text={translations[language].continue}
                  onclick={() => setCurrentStep(5)}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className='flex flex-col items-center w-full px-6 py-6 overflow-y-scroll lg:w-2/3 lg:py-36'>
            <div className='flex flex-col items-start w-full gap-6 lg:w-2/3'>
              <ButtonLink
                size='medium'
                type='gray'
                onclick={() => setModalState({ ...modalState, backToDashboard: true })}
                icon={
                  <IconArrow
                    size='20'
                    color='stroke-gray-500 dark:stroke-dark-300'
                    fill='stroke-gray-500'
                    direction='left'
                  />
                }
                text={translations[language].backToDashboard}
              />
              <PageHeader title={translations[language].review} subtitle={translations[language].review_subtitle} />

              <Formik initialValues={ticket} onSubmit={submitTicket}>
                {({ errors, touched, isValidating }) => (
                  <Form className='flex flex-col w-full gap-5 overflow-y-none'>
                    <div className='flex w-full gap-4 overflow-y-none'>
                      <div className='flex flex-col w-full gap-1.5 overflow-y-none'>
                        <InputLabel htmlFor='firstName' text={translations[language].First_name} />
                        <InputField style='iconless' type='text' id='firstName' name='firstName' disabled={true} />
                      </div>
                      <div className='flex flex-col w-full gap-1.5'>
                        <InputLabel htmlFor='lastName' text={translations[language].Last_name} />
                        <InputField style='iconless' type='text' id='lastName' name='lastName' disabled={true} />
                      </div>
                    </div>
                    <div className='flex flex-col w-full gap-1.5'>
                      <InputLabel htmlFor='company.name' text={translations[language].Company_name} />
                      <InputField
                        style='icon'
                        type='text'
                        disabled={true}
                        id='company.name'
                        name='company.name'
                        icon={<IconBuilding size='20' color='stroke-gray-500' fill='fill-primary-500' />}
                      />
                    </div>
                    <div className='flex flex-col w-full gap-1.5'>
                      <InputLabel htmlFor='phoneNumber' text={translations[language].Phone_number} />
                      <InputField
                        style='icon'
                        type='tel'
                        disabled={true}
                        id='phoneNumber'
                        name='phoneNumber'
                        icon={<IconPhone size='20' color='stroke-gray-500' fill='stroke-gray-500' />}
                      />
                      <InputErrorMessage name='phoneNumber' />
                    </div>
                    <div className='flex flex-col w-full gap-1.5'>
                      <InputLabel htmlFor='machine.name' text={translations[language].machine} />
                      <InputField style='iconless' type='text' disabled={true} id='machine.name' name='machine.name' />
                    </div>
                    <div className='flex flex-col w-full gap-1.5'>
                      <InputLabel htmlFor='issueType' text='Issue type' />
                      <InputField style='iconless' type='text' disabled={true} id='issueType' name='issueType' />
                    </div>
                    <div className='flex flex-col w-full gap-1.5'>
                      <InputLabel htmlFor='issue' text={translations[language].describe_issue_specific} />
                      <InputTextArea
                        id='issue'
                        disabled={true}
                        name='issue'
                        placeholder={translations[language].describe_placeholder_specific}
                      />
                      <InputErrorMessage name='issue' />
                    </div>
                    <div className='flex flex-col w-full gap-1.5'>
                      <InputLabel htmlFor='actionExpected' text={translations[language].describe_issue_expectation} />
                      <InputTextArea
                        id='actionExpected'
                        disabled={true}
                        name='actionExpected'
                        placeholder={translations[language].describe_placeholder_expectation}
                      />
                      <InputErrorMessage name='actionExpected' />
                    </div>
                    <div className='flex flex-col w-full gap-1.5'>
                      <InputLabel htmlFor='actionPerformed' text={translations[language].describe_issue_tried} />
                      <InputTextArea
                        id='actionPerformed'
                        disabled={true}
                        name='actionPerformed'
                        placeholder={translations[language].describe_placeholder_tried}
                      />
                      <InputErrorMessage name='actionPerformed' />
                    </div>
                    <div className='flex flex-col w-full gap-1.5'>
                      <InputLabel htmlFor='extraInformation' text={translations[language].describe_issue_extra_info} />
                      <InputTextArea
                        id='extraInformation'
                        disabled={true}
                        name='extraInformation'
                        placeholder={translations[language].describe_placeholder_extra_info}
                      />
                      <InputErrorMessage name='extraInformation' />
                    </div>
                    <div className='flex flex-col-reverse gap-4 pt-4 md:flex-row'>
                      <Button
                        size='medium'
                        width='full'
                        type='secondary-gray'
                        text={translations[language].back}
                        disabled={creatingTicket}
                        onclick={() => setCurrentStep(4)}
                      />
                      <Button
                        formType='submit'
                        size='medium'
                        width='full'
                        type='primary'
                        disabled={creatingTicket}
                        icon={
                          creatingTicket ? (
                            <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />
                          ) : undefined
                        }
                        text={translations[language].confirm_create_ticket}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
