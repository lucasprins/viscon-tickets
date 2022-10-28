import { Tab } from "@headlessui/react";
import { Form, Formik } from "formik";
import React, { Fragment, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../../features/auth/authSlice";
import { fetchTicketAsync, getClaimedTicketSuccess, getFetchingTicket, getTicket, getUnclaimedTicketSuccess, resetTicket, resetTicketActions } from "../../../features/tickets/ticketsSlice";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { ticketType } from "../../../utils/types";
import { Badge } from "../../atoms/Badge/Badge";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { Button } from "../../atoms/Button/Button";
import { AssigneeCard } from "../../atoms/Cards/AssigneeCard";
import { AvatarCard } from "../../atoms/Cards/AvatarCard";
import { Divider } from "../../atoms/Divider/Divider";
import {
    IconAlert,
    IconCheck,
    IconFileSearch,
    IconFlipBackwards,
    IconGear,
    IconStopwatch,
} from "../../atoms/Icons/Icons";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";
import { InputTextArea } from "../../atoms/Input/InputTextArea";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import { Spinner } from "../../atoms/Spinner/Spinner";
import Layout from "../../organisms/Layout/Layout";
import { Modal } from "../../organisms/Modal/Modal";
import { TicketActions } from "./TicketActions";
import { TicketStatusBadge } from "./TicketStatusBadge";
var translations = require("../../../translations/ticketTranslations.json");

export function Ticket() {
    const language = useAppSelector(getCurrentLanguage);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(getFetchingTicket);
    const navigate = useNavigate();

    let { ticketID } = useParams();

    const user = useAppSelector(getUser);
    const ticket: ticketType | any = useAppSelector(getTicket);

    const claimedTicketSuccess = useAppSelector(getClaimedTicketSuccess);

    useEffect(() => {
        dispatch(fetchTicketAsync({ ticketId: ticketID || "", accessToken: user?.accessToken || "" }));

        return () => {
            dispatch(resetTicket());
        };
    }, [dispatch, ticketID]);

    if (!user) {
        return <Navigate to='/login' />;
    }

    return (
        <>
        {claimedTicketSuccess == false && (
                <>
                    <Modal
                        type='error'
                        title='Oops, something went wrong.'
                        subtitle='This ticket has already been claimed.'
                        is_open={true}
                        close_modal={() => {
                            dispatch(resetTicketActions())
                        }}
                        button_primary_text='Close'
                        button_secondary_text='Tickets'
                        button_primary_onclick={() => {
                            dispatch(resetTicketActions())
                        }}
                        button_secondary_onclick={() => {
                            navigate("/tickets");
                        }}
                    />
                </>
            )}
        
            <div className='flex flex-col w-full md:flex-row dark:bg-dark-800 dark:text-white h-screen'>
                <Layout />
                <>
                    {loading ? (
                        <div className='flex w-full h-full items-center justify-center'>
                            <Spinner
                                size='w-16 h-16'
                                color='text-gray-200 dark:text-dark-600'
                                fill='fill-primary-600'
                            />
                        </div>
                    ) : ticket != null ? (
                        <div className='flex flex-col w-full md:flex-row dark:bg-dark-800 dark:text-white h-screen'>
                            {/* Main Page */}
                            <div className='flex flex-col xl:flex-row w-full h-full'>
                                <div className='w-full xl:w-2/3 p-6 xl:p-8 flex flex-col gap-6 overflow-y-scroll'>
                                    <div className='flex flex-col gap-5 w-full'>
                                        <Breadcrumbs crumbs={["Tickets", `Ticket ${ticket.ticketNumber}`]} />
                                        <div className='flex flex-col lg:flex-row lg:gap-2 lg:justify-between lg:items-end'>
                                            <PageHeader title={`Ticket #${ticket.ticketNumber}`} />
                                            <TicketActions user={user} ticket={ticket} />
                                        </div>
                                    </div>
                                    <Tab.Group>
                                        <Tab.List className='gap-2 p-1 bg-gray-50 dark:bg-dark-700 border border-gray-100 dark:border-dark-500 flex rounded-lg items-center'>
                                            <Tab as={Fragment}>
                                                {({ selected }) => (
                                                    <button
                                                        className={
                                                            selected
                                                                ? "bg-white dark:bg-dark-500 w-full flex outline-none justify-center text-gray-700 dark:text-white py-2 rounded-md drop-shadow font-semibold"
                                                                : "w-full flex justify-center py-2 text-gray-500 dark:text-dark-400 font-semibold"
                                                        }
                                                    >
                                                        {translations[language].ticket}
                                                    </button>
                                                )}
                                            </Tab>
                                            <Tab as={Fragment}>
                                                {({ selected }) => (
                                                    <button
                                                        className={
                                                            selected
                                                                ? "bg-white dark:bg-dark-500 w-full flex outline-none justify-center text-gray-700 dark:text-white py-2 rounded-md drop-shadow font-semibold"
                                                                : "w-full flex justify-center py-2 text-gray-500 dark:text-dark-400 font-semibold"
                                                        }
                                                    >
                                                        {translations[language].solution}
                                                    </button>
                                                )}
                                            </Tab>
                                            <Tab as={Fragment}>
                                                {({ selected }) => (
                                                    <button
                                                        className={
                                                            selected
                                                                ? "bg-white dark:bg-dark-500 w-full flex outline-none justify-center text-gray-700 dark:text-white py-2 rounded-md drop-shadow font-semibold"
                                                                : "w-full flex justify-center py-2 text-gray-500 dark:text-dark-400 font-semibold"
                                                        }
                                                    >
                                                        {translations[language].history}
                                                    </button>
                                                )}
                                            </Tab>
                                        </Tab.List>
                                        <Tab.Panels>
                                            {/* Ticket */}
                                            <Tab.Panel className='flex flex-col gap-4'>
                                                <div className='flex flex-col xl:flex-row gap-4'>
                                                    <div className='flex xl:hidden flex-col gap-4'>
                                                        <div className='flex flex-col'>
                                                            <span className='text-md text-gray-700 dark:text-white font-medium'>
                                                                {translations[language].creation_date}
                                                            </span>
                                                            <div className='flex flex-col 2xl:flex-row gap-1 justify-between'>
                                                                <span className='text-gray-700 dark:text-dark-300'>
                                                                    {new Date(ticket.creationDate).toLocaleString()}
                                                                </span>
                                                                <TicketStatusBadge status={ticket.status} />
                                                            </div>
                                                        </div>
                                                        <AssigneeCard
                                                            subtitle={translations[language].assignee}
                                                            name={
                                                                ticket.assignee !== null
                                                                    ? ticket.assignee?.prefix == null
                                                                        ? `${ticket.assignee?.firstName} ${ticket.assignee?.lastName}`
                                                                        : `${ticket.assignee?.firstName} ${ticket.assignee?.prefix} ${ticket?.assignee?.lastName}`
                                                                    : undefined
                                                            }
                                                        />
                                                    </div>
                                                    <div className='flex flex-col gap-2 w-full'>
                                                        <span className='text-md text-gray-700 font-medium dark:text-white'>
                                                            {translations[language].creator}
                                                        </span>
                                                        {ticket?.creator?.prefix == null ? (
                                                            <AvatarCard
                                                                name={`${ticket.creator.firstName} ${ticket.creator.lastName}`}
                                                                subtitle={ticket.phoneNumber}
                                                            />
                                                        ) : (
                                                            <AvatarCard
                                                                name={`${ticket.creator.firstName} ${ticket.creator.prefix} ${ticket.creator.lastName}`}
                                                                subtitle={ticket.phoneNumber}
                                                            />
                                                        )}
                                                    </div>
                                                    <div className='flex flex-col gap-2 w-full'>
                                                        <span className='text-md text-gray-700 font-medium dark:text-white'>
                                                            {translations[language].company}
                                                        </span>
                                                        <AvatarCard
                                                            name={ticket.company.name}
                                                            subtitle={ticket.company.country}
                                                        />
                                                    </div>
                                                </div>
                                                <Formik initialValues={ticket} onSubmit={() => console.log("submit")}>
                                                    {({ errors, touched, isValidating }) => (
                                                        <Form className='flex flex-col gap-5 w-full'>
                                                            <div className='flex flex-col w-full gap-1.5'>
                                                                <InputLabel
                                                                    htmlFor='machineName'
                                                                    text={translations[language].machine}
                                                                />
                                                                <InputField
                                                                    style='icon'
                                                                    type='text'
                                                                    id='machineName'
                                                                    name='machineName'
                                                                    disabled={true}
                                                                    icon={
                                                                        <IconGear
                                                                            size='20'
                                                                            color='stroke-gray-500'
                                                                            fill='fill-primary-500'
                                                                        />
                                                                    }
                                                                />
                                                            </div>
                                                            <div className='flex flex-col w-full gap-1.5'>
                                                                <InputLabel
                                                                    htmlFor='issue'
                                                                    text={
                                                                        translations[language].describe_issue_specific
                                                                    }
                                                                />
                                                                <InputTextArea
                                                                    disabled={true}
                                                                    id='issue'
                                                                    name='issue'
                                                                    placeholder={
                                                                        translations[language]
                                                                            .describe_placeholder_specific
                                                                    }
                                                                />
                                                                <InputErrorMessage name='issue' />
                                                            </div>
                                                            <div className='flex flex-col w-full gap-1.5'>
                                                                <InputLabel
                                                                    htmlFor='actionExpected'
                                                                    text={
                                                                        translations[language]
                                                                            .describe_issue_expectation
                                                                    }
                                                                />
                                                                <InputTextArea
                                                                    disabled={true}
                                                                    id='actionExpected'
                                                                    name='actionExpected'
                                                                    placeholder={
                                                                        translations[language]
                                                                            .describe_placeholder_expectation
                                                                    }
                                                                />
                                                                <InputErrorMessage name='actionExpected' />
                                                            </div>
                                                            <div className='flex flex-col w-full gap-1.5'>
                                                                <InputLabel
                                                                    htmlFor='actionPerformed'
                                                                    text={translations[language].describe_issue_tried}
                                                                />
                                                                <InputTextArea
                                                                    disabled={true}
                                                                    id='actionPerformed'
                                                                    name='actionPerformed'
                                                                    placeholder={
                                                                        translations[language]
                                                                            .describe_placeholder_tried
                                                                    }
                                                                />
                                                                <InputErrorMessage name='actionPerformed' />
                                                            </div>
                                                            <div className='flex flex-col w-full gap-1.5'>
                                                                <InputLabel
                                                                    htmlFor='extraInfo'
                                                                    text={
                                                                        translations[language].describe_issue_extra_info
                                                                    }
                                                                />
                                                                <InputTextArea
                                                                    disabled={true}
                                                                    id='extraInfo'
                                                                    name='extraInfo'
                                                                    placeholder={
                                                                        translations[language]
                                                                            .describe_placeholder_extra_info
                                                                    }
                                                                />
                                                                <InputErrorMessage name='extraInformation' />
                                                            </div>
                                                        </Form>
                                                    )}
                                                </Formik>
                                            </Tab.Panel>
                                            {/* Solution Panel */}
                                            <Tab.Panel>
                                                <Formik initialValues={ticket} onSubmit={() => console.log("submit")}>
                                                    {({ errors, touched, isValidating }) => (
                                                        <Form className='flex flex-col gap-5 w-full'>
                                                            <div className='flex flex-col w-full gap-1.5'>
                                                                <InputLabel
                                                                    htmlFor='solution'
                                                                    text={translations[language].solution}
                                                                />
                                                                <InputTextArea
                                                                    disabled={
                                                                        user?.role === "VisconAdmin" ||
                                                                        user?.role === "VisconEmployee"
                                                                            ? ticket.status === "InProgress"
                                                                                ? false
                                                                                : true
                                                                            : true
                                                                    }
                                                                    id='solution'
                                                                    name='solution'
                                                                />
                                                                <InputErrorMessage name='issue' />
                                                            </div>
                                                        </Form>
                                                    )}
                                                </Formik>
                                            </Tab.Panel>

                                            {/* History Panel */}
                                            <Tab.Panel>History...</Tab.Panel>
                                        </Tab.Panels>
                                    </Tab.Group>
                                </div>

                                {/* Sidebar */}
                                <div className='hidden xl:flex flex-col w-1/3 p-8 border-l border-gray-300 dark:border-dark-500 h-full gap-8'>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex flex-col'>
                                            <span className='text-md text-gray-700 dark:text-white font-medium'>
                                                {translations[language].creation_date}
                                            </span>
                                            <div className='flex flex-col 2xl:flex-row gap-1 justify-between'>
                                                <span className='text-gray-700 dark:text-dark-300'>
                                                    {new Date(ticket.creationDate).toLocaleString()}
                                                </span>
                                                <TicketStatusBadge status={ticket.status} />
                                            </div>
                                        </div>
                                        <AssigneeCard
                                            subtitle={translations[language].assignee}
                                            name={
                                                ticket.assignee !== null
                                                    ? ticket.assignee?.prefix == null
                                                        ? `${ticket.assignee?.firstName} ${ticket.assignee?.lastName}`
                                                        : `${ticket.assignee?.firstName} ${ticket.assignee?.prefix} ${ticket?.assignee?.lastName}`
                                                    : undefined
                                            }
                                        />
                                    </div>
                                    <Divider />
                                </div>
                            </div>
                        </div>
                    ) : (
                        navigate("/ticket-not-found")
                    )}
                </>
            </div>
        </>
    );
}
