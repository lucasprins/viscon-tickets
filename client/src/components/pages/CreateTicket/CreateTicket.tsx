import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "../../atoms/Button/Button";
import { Divider } from "../../atoms/Divider/Divider";
import { IconFlag } from "../../atoms/Icons/IconsFlags";
import { IconArrow, IconBuilding, IconPhone } from "../../atoms/Icons/Icons";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";
import { InputTextArea } from "../../atoms/Input/InputTextArea";
import { MachineSolutionList } from "../../molecules/MachineSolution/MachineSolutionList";
import { NavigationHeader } from "../../organisms/Navigation/NavigationHeader";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import { ProgressStep } from "../../atoms/Progress/ProgressStep";
import { toggleBackdrop, toggleLanguageModal } from "../../../features/modal/modalSlice";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { validatePhoneNumber, validateTextarea } from "../../../utils/input-validation";
import { FileDropzone } from "../../molecules/FileUpload/FileDropzone";
import { createTicketType, MachineType, userType } from "../../../utils/types";
import { getUser } from "../../../features/auth/authSlice";
import { ButtonLink } from "../../atoms/Button/ButtonLink";
import { getMachines, getSelectedMachine, setSelectedMachine } from "../../../features/machines/machinesSlice";
import {
    createTicket,
    getCreatedTicketSuccess,
    getCreatingTicket,
    resetCreateTicket,
} from "../../../features/tickets/ticketsSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { Modal } from "../../organisms/Modal/Modal";
import { InputDropdown } from "../../atoms/Input/InputDropdown";

var translations = require("../../../translations/createTicketTranslations.json");

export function CreateTicket() {
    const [currentStep, setCurrentStep] = useState(1);
    const loading = useAppSelector(getCreatingTicket);
    const language = useAppSelector(getCurrentLanguage);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const createTicketSuccess: boolean | null = useAppSelector(getCreatedTicketSuccess);

    const user: userType | null = useAppSelector(getUser);
    const selectedMachine = useAppSelector(getSelectedMachine);
    
    const machines = useAppSelector(getMachines);

    const [openErrorModal, setOpenErrorModal] = useState(true);

    const [ticket, setTicket] = useState<createTicketType>({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        company: user?.company || { name: "", id: "", country: "", isActive: true },
        phoneNumber: user?.phoneNumber || "",
        issue: "",
        actionExpected: "",
        actionPerformed: "",
        extraInfo: "",
        machine: selectedMachine,
    });

    const handleChange = (payload: MachineType) => {
        dispatch(setSelectedMachine(payload));
    };

    useEffect(() => {
        dispatch(setSelectedMachine(machines[0]));
        return () => {
            dispatch(resetCreateTicket());
        }
    }, []);

    const addContactInformation = (values: any) => {
        setTicket({ ...ticket, ...values });
        setCurrentStep(3);
    };

    const addIssueInformation = (values: any) => {
        setTicket({ ...ticket, ...values });
        setCurrentStep(4);
    };

    const openLanguageModal = () => {
        dispatch(toggleBackdrop());
        dispatch(toggleLanguageModal());
    };

    const submitTicket = () => {
        if (user) {
            dispatch(createTicket({ ticket, user }));
        }
    };

    if (!user) {
        return <Navigate to='/login' />;
    }

    return (
        <>
            {createTicketSuccess == false && (
                <>
                    <Modal
                        type='error'
                        title='Oops, something went wrong.'
                        subtitle='Please submit the ticket again or try again later.'
                        is_open={openErrorModal}
                        close_modal={() => {
                            dispatch(resetCreateTicket());
                        }}
                        button_primary_text='Close'
                        button_secondary_text='Dashboard'
                        button_primary_onclick={() => {
                            dispatch(resetCreateTicket());
                        }}
                        button_secondary_onclick={() => {
                            navigate("/");
                        }}
                    />
                </>
            )}
            {createTicketSuccess == true && (
                <>
                    <Modal
                        type='success'
                        title='Perfect! Your ticket has been created.'
                        subtitle='We will get back to you as soon as possible.'
                        is_open={true}
                        close_modal={() => {
                            dispatch(resetCreateTicket());
                            navigate("/");
                        }}
                        button_primary_text='Dashboard'
                        button_secondary_text='Tickets'
                        button_primary_onclick={() => {
                            dispatch(resetCreateTicket());
                            navigate("/");
                        }}
                        button_secondary_onclick={() => {
                            dispatch(resetCreateTicket());
                            navigate("/tickets");
                        }}
                    />
                </>
            )}

            <div className='flex flex-col md:flex-row md:h-screen dark:bg-dark-800 dark:text-white w-full'>
                <div className='bg-gray-50 border-r border-gray-200 dark:border-dark-600 dark:border dark:bg-dark-700 w-1/3 hidden lg:flex flex-col justify-between py-12 pl-12 pr-16'>
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
                    <div className='flex flex-col w-full items-center lg:w-2/3 py-6 px-6 lg:py-36 overflow-y-scroll'>
                        <div className='lg:w-2/3 flex flex-col w-full gap-6'>
                            <PageHeader
                                title={translations[language].view_solutions}
                                subtitle={translations[language].view_solutions_subtitle_long}
                            />
                            <InputDropdown
                                label={translations[language].select_machine}
                                options={machines}
                                selectedOption={selectedMachine}
                                selectedKey={"name"}
                                onchange={handleChange}
                            />
                            <Divider />
                            <MachineSolutionList />
                            <div className='flex flex-col-reverse sm:flex-row gap-4 pt-4'>
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
                                        setTicket({ ...ticket, machine: selectedMachine });
                                        setCurrentStep(2);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className='flex flex-col w-full items-center lg:w-2/3 py-6 px-6 lg:py-36 overflow-y-scroll'>
                        <div className='lg:w-2/3 flex flex-col w-full gap-6'>
                            <ButtonLink
                                size='medium'
                                type='gray'
                                url='/'
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
                                    <Form className='flex flex-col gap-5 w-full items-center'>
                                        <div className='flex gap-4 w-full'>
                                            <div className='flex flex-col w-full gap-1.5'>
                                                <InputLabel
                                                    htmlFor='firstName'
                                                    text={translations[language].First_name}
                                                />
                                                <InputField
                                                    style='iconless'
                                                    type='text'
                                                    id='firstName'
                                                    name='firstName'
                                                    disabled={true}
                                                />
                                            </div>
                                            <div className='flex flex-col w-full gap-1.5'>
                                                <InputLabel
                                                    htmlFor='lastName'
                                                    text={translations[language].Last_name}
                                                />
                                                <InputField
                                                    style='iconless'
                                                    type='text'
                                                    id='lastName'
                                                    name='lastName'
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex flex-col w-full gap-1.5'>
                                            <InputLabel
                                                htmlFor='company.name'
                                                text={translations[language].Company_name}
                                            />
                                            <InputField
                                                style='icon'
                                                type='text'
                                                id='company.name'
                                                name='company.name'
                                                disabled={true}
                                                icon={
                                                    <IconBuilding
                                                        size='20'
                                                        color='stroke-gray-500'
                                                        fill='fill-primary-500'
                                                    />
                                                }
                                            />
                                        </div>
                                        <div className='flex flex-col w-full gap-1.5'>
                                            <InputLabel
                                                htmlFor='phoneNumber'
                                                text={translations[language].Phone_number}
                                            />
                                            <InputField
                                                touched={touched.phoneNumber}
                                                error={errors.phoneNumber}
                                                validate={(input) => validatePhoneNumber(input, language)}
                                                style='icon'
                                                type='tel'
                                                id='phoneNumber'
                                                name='phoneNumber'
                                                icon={
                                                    <IconPhone
                                                        size='20'
                                                        color='stroke-gray-500'
                                                        fill='stroke-gray-500'
                                                    />
                                                }
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
                    <div className='flex flex-col w-full items-center lg:w-2/3 py-6 px-6 lg:py-36 overflow-y-scroll'>
                        <div className='lg:w-2/3 flex flex-col w-full gap-6'>
                            <ButtonLink
                                size='medium'
                                type='gray'
                                url='/'
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
                            <Formik initialValues={ticket} onSubmit={addIssueInformation}>
                                {({ errors, touched, isValidating }) => (
                                    <Form className='flex flex-col gap-5 w-full'>
                                        <div className='flex flex-col w-full gap-1.5'>
                                            <InputLabel
                                                htmlFor='issue'
                                                text={translations[language].describe_issue_specific}
                                            />
                                            <InputTextArea
                                                touched={touched.issue}
                                                error={errors.issue}
                                                validate={(input) => validateTextarea(input, language)}
                                                id='issue'
                                                name='issue'
                                                placeholder={translations[language].describe_placeholder_specific}
                                            />
                                            <InputErrorMessage name='issue' />
                                        </div>
                                        <div className='flex flex-col w-full gap-1.5'>
                                            <InputLabel
                                                htmlFor='actionExpected'
                                                text={translations[language].describe_issue_expectation}
                                            />
                                            <InputTextArea
                                                touched={touched.actionExpected}
                                                error={errors.actionExpected}
                                                validate={(input) => validateTextarea(input, language)}
                                                id='actionExpected'
                                                name='actionExpected'
                                                placeholder={translations[language].describe_placeholder_expectation}
                                            />
                                            <InputErrorMessage name='actionExpected' />
                                        </div>
                                        <div className='flex flex-col w-full gap-1.5'>
                                            <InputLabel
                                                htmlFor='actionPerformed'
                                                text={translations[language].describe_issue_tried}
                                            />
                                            <InputTextArea
                                                touched={touched.actionPerformed}
                                                error={errors.actionPerformed}
                                                validate={(input) => validateTextarea(input, language)}
                                                id='actionPerformed'
                                                name='actionPerformed'
                                                placeholder={translations[language].describe_placeholder_tried}
                                            />
                                            <InputErrorMessage name='actionPerformed' />
                                        </div>
                                        <div className='flex flex-col w-full gap-1.5'>
                                            <InputLabel
                                                htmlFor='extraInformation'
                                                text={translations[language].describe_issue_extra_info}
                                            />
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
                    <div className='flex flex-col w-full items-center lg:w-2/3 py-6 px-6 lg:py-36 overflow-y-scroll'>
                        <div className='lg:w-2/3 flex flex-col w-full gap-6'>
                            <ButtonLink
                                size='medium'
                                type='gray'
                                url='/'
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

                            <FileDropzone />
                            <div className='flex flex-row gap-4 pt-4'>
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
                    <div className='flex flex-col w-full items-center lg:w-2/3 py-6 px-6 lg:py-36 overflow-y-scroll'>
                        <div className='lg:w-2/3 flex flex-col w-full gap-6'>
                            <ButtonLink
                                size='medium'
                                type='gray'
                                url='/'
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
                                title={translations[language].review}
                                subtitle={translations[language].review_subtitle}
                            />

                            <Formik initialValues={ticket} onSubmit={submitTicket}>
                                {({ errors, touched, isValidating }) => (
                                    <Form className='flex flex-col gap-5 w-full overflow-y-none'>
                                        <div className='flex gap-4 w-full overflow-y-none'>
                                            <div className='flex flex-col w-full gap-1.5 overflow-y-none'>
                                                <InputLabel
                                                    htmlFor='firstName'
                                                    text={translations[language].First_name}
                                                />
                                                <InputField
                                                    style='iconless'
                                                    type='text'
                                                    id='firstName'
                                                    name='firstName'
                                                    disabled={true}
                                                />
                                            </div>
                                            <div className='flex flex-col w-full gap-1.5'>
                                                <InputLabel
                                                    htmlFor='lastName'
                                                    text={translations[language].Last_name}
                                                />
                                                <InputField
                                                    style='iconless'
                                                    type='text'
                                                    id='lastName'
                                                    name='lastName'
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex flex-col w-full gap-1.5'>
                                            <InputLabel
                                                htmlFor='company.name'
                                                text={translations[language].Company_name}
                                            />
                                            <InputField
                                                style='icon'
                                                type='text'
                                                disabled={true}
                                                id='company.name'
                                                name='company.name'
                                                icon={
                                                    <IconBuilding
                                                        size='20'
                                                        color='stroke-gray-500'
                                                        fill='fill-primary-500'
                                                    />
                                                }
                                            />
                                        </div>
                                        <div className='flex flex-col w-full gap-1.5'>
                                            <InputLabel
                                                htmlFor='phoneNumber'
                                                text={translations[language].Phone_number}
                                            />
                                            <InputField
                                                style='icon'
                                                type='tel'
                                                disabled={true}
                                                id='phoneNumber'
                                                name='phoneNumber'
                                                icon={
                                                    <IconPhone
                                                        size='20'
                                                        color='stroke-gray-500'
                                                        fill='stroke-gray-500'
                                                    />
                                                }
                                            />
                                            <InputErrorMessage name='phoneNumber' />
                                        </div>
                                        <div className='flex flex-col w-full gap-1.5'>
                                            <InputLabel
                                                htmlFor='issue'
                                                text={translations[language].describe_issue_specific}
                                            />
                                            <InputTextArea
                                                id='issue'
                                                disabled={true}
                                                name='issue'
                                                placeholder={translations[language].describe_placeholder_specific}
                                            />
                                            <InputErrorMessage name='issue' />
                                        </div>
                                        <div className='flex flex-col w-full gap-1.5'>
                                            <InputLabel
                                                htmlFor='actionExpected'
                                                text={translations[language].describe_issue_expectation}
                                            />
                                            <InputTextArea
                                                id='actionExpected'
                                                disabled={true}
                                                name='actionExpected'
                                                placeholder={translations[language].describe_placeholder_expectation}
                                            />
                                            <InputErrorMessage name='actionExpected' />
                                        </div>
                                        <div className='flex flex-col w-full gap-1.5'>
                                            <InputLabel
                                                htmlFor='actionPerformed'
                                                text={translations[language].describe_issue_tried}
                                            />
                                            <InputTextArea
                                                id='actionPerformed'
                                                disabled={true}
                                                name='actionPerformed'
                                                placeholder={translations[language].describe_placeholder_tried}
                                            />
                                            <InputErrorMessage name='actionPerformed' />
                                        </div>
                                        <div className='flex flex-col w-full gap-1.5'>
                                            <InputLabel
                                                htmlFor='extraInformation'
                                                text={translations[language].describe_issue_extra_info}
                                            />
                                            <InputTextArea
                                                id='extraInformation'
                                                disabled={true}
                                                name='extraInformation'
                                                placeholder={translations[language].describe_placeholder_extra_info}
                                            />
                                            <InputErrorMessage name='extraInformation' />
                                        </div>
                                        <div className='flex flex-col-reverse md:flex-row gap-4 pt-4'>
                                            <Button
                                                size='medium'
                                                width='full'
                                                type='secondary-gray'
                                                text={translations[language].back}
                                                disabled={loading}
                                                onclick={() => setCurrentStep(4)}
                                            />
                                            <Button
                                                formType='submit'
                                                size='medium'
                                                width='full'
                                                type='primary'
                                                disabled={loading}
                                                icon={
                                                    loading ? (
                                                        <Spinner
                                                            size='w-4 h-4'
                                                            color='text-primary-500'
                                                            fill='fill-white'
                                                        />
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
