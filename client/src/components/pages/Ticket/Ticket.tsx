import { Tab } from "@headlessui/react";
import { Form, Formik } from "formik";
import React, { Fragment } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getUser } from "../../../features/auth/authSlice";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppSelector } from "../../../utils/hooks";
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
import Layout from "../../organisms/Layout/Layout";

var tickets = require("../../../features/tickets/tickets.json");
var translations = require("../../../translations/ticketTranslations.json");

export function Ticket() {
    const language = useAppSelector(getCurrentLanguage);

    const { ticketID }: any = useParams();
    const user = useAppSelector(getUser);
    const ticket: ticketType = tickets.filter((ticket: ticketType) => ticket.ticketNumber === Number(ticketID))[0];

    if (!user) {
        return <Navigate to='/login' />;
    }

    if (!ticket) {
        return <Navigate to='/PageNotFound' />;
    }

    const ticketDate = new Date(ticket.creationDate);
    console.log(ticketDate);

    let ticketActions: JSX.Element[] = [];
    let ticketActionsMobile: JSX.Element[] = [];
    switch (user?.role) {
        case "VisconAdmin":
            switch (ticket.status) {
                case "Open":
                    ticketActions.push( <Button size='medium' width='content' type='primary' text={translations[language].claim_ticket} /> );
                    ticketActionsMobile.push( <Button size='medium' width='full' type='primary' text={translations[language].claim_ticket} /> );
                    break;
                case "InProgress":
                    ticketActions.push( <Button size='medium' width='content' type='secondary-gray' text={translations[language].unclaim} icon={ <IconFlipBackwards size='20' color='stroke-gray-700 dark:stroke-white' fill='fill-primary-700' /> } /> );
                    ticketActions.push( <Button size='medium' width='content' type='primary' text={translations[language].resolve} icon={<IconCheck size='20' color='stroke-white' fill='fill-white' />} /> );
                    ticketActionsMobile.push( <Button size='medium' width='full' type='primary' text={translations[language].resolve} icon={<IconCheck size='20' color='stroke-white' fill='fill-white' />} /> );
                    ticketActionsMobile.push( <Button size='medium' width='full' type='secondary-gray' text={translations[language].unclaim} icon={ <IconFlipBackwards size='20' color='stroke-gray-700 dark:stroke-white' fill='fill-primary-700' /> } /> );
                    break;
                case "Resolved":
                    ticketActions.push( <Button size='medium' width='content' type='primary' text={translations[language].re_open} /> );
                    ticketActionsMobile.push( <Button size='medium' width='full' type='primary' text={translations[language].re_open} /> );
                    break;
            }
            ticketActionsMobile.push( <Button size='medium' width='full' type='secondary-gray' text={translations[language].view_files} icon={<IconFileSearch size='20' color='stroke-gray-700' fill='fill-gray-700' />} /> );
            break;

        case "VisconEmployee":
            switch (ticket.status) {
                case "Open":
                    ticketActions.push( <Button size='medium' width='content' type='primary' text={translations[language].claim_ticket} /> );
                    ticketActionsMobile.push( <Button size='medium' width='full' type='primary' text={translations[language].claim_ticket} /> );
                    break;
                case "InProgress":
                    ticketActions.push( <Button size='medium' width='content' type='secondary-gray' text={translations[language].unclaim} icon={ <IconFlipBackwards size='20' color='stroke-gray-700 dark:stroke-white' fill='fill-primary-700' /> } /> );
                    ticketActions.push( <Button size='medium' width='content' type='primary' text={translations[language].resolve} icon={<IconCheck size='20' color='stroke-white' fill='fill-white' />} /> );
                    ticketActionsMobile.push( <Button size='medium' width='full' type='primary' text={translations[language].resolve} icon={<IconCheck size='20' color='stroke-white' fill='fill-white' />} /> );
                    ticketActionsMobile.push( <Button size='medium' width='full' type='secondary-gray' text={translations[language].unclaim} icon={ <IconFlipBackwards size='20' color='stroke-gray-700 dark:stroke-white' fill='fill-primary-700' /> } /> );
                    break;
                case "Resolved":
                    ticketActions.push( <Button size='medium' width='content' type='primary' text={translations[language].re_open} /> );
                    ticketActionsMobile.push( <Button size='medium' width='full' type='primary' text={translations[language].re_open} /> );
                    break;
            }
            ticketActionsMobile.push(
                <Button size='medium' width='full' type='secondary-gray' text={translations[language].view_files} icon={<IconFileSearch size='20' color='stroke-gray-700' fill='fill-gray-700' />} />
            );
            break;

        case "CustomerAdmin":
            if (ticket.status === "Open" || ticket.status === "InProgress") {
                ticketActions.push(
                    <Button size='medium' width='content' type='primary' text={translations[language].cancel_ticket} />
                );
            }
            ticketActionsMobile.push(
                <Button size='medium' width='content' type='primary' text={translations[language].cancel_ticket} />
            );
            ticketActionsMobile.push(
                <Button size='medium' width='full' type='secondary-gray' text={translations[language].view_files} icon={<IconFileSearch size='20' color='stroke-gray-700' fill='fill-gray-700' />} />
            );
            break;

        case "CustomerEmployee":
            if (ticket.status === "Open" || ticket.status === "InProgress") {
                ticketActions.push( <Button size='medium' width='content' type='primary' text={translations[language].cancel_ticket} /> );
            }
            ticketActionsMobile.push(
                <Button size='medium' width='content' type='primary' text={translations[language].cancel_ticket} />
            );
            ticketActionsMobile.push(
                <Button size='medium' width='full' type='secondary-gray' text={translations[language].view_files} icon={<IconFileSearch size='20' color='stroke-gray-700' fill='fill-gray-700' />} />
            );
            break;
    }

    let statusBadge;
    switch (ticket.status) {
        case "open":
            statusBadge = (
                <Badge
                    size='md'
                    color='error'
                    text={translations[language].open}
                    icon={
                        <IconAlert
                            size='14'
                            fill='fill-error-600 dark:fill-error-400'
                            color='stroke-error-600 dark:stroke-error-400'
                        />
                    }
                />
            );
            break;
        case "in progress":
            statusBadge = (
                <Badge
                    size='md'
                    color='gray'
                    text={translations[language].in_progress}
                    icon={
                        <IconStopwatch
                            size='14'
                            fill='fill-gray-600 dark:fill-gray-300'
                            color='stroke-gray-600 dark:stroke-gray-300'
                        />
                    }
                />
            );
            break;
        case "resolved":
            statusBadge = (
                <Badge
                    size='md'
                    color='success'
                    text={translations[language].resolved}
                    icon={<IconCheck size='14' fill='fill-success-600' color='stroke-success-600' />}
                />
            );
            break;
        case "cancelled":
            statusBadge = (
                <Badge
                    size='md'
                    color='primary'
                    text={translations[language].cancelled}
                    icon={<IconCheck size='14' fill='fill-primary-600' color='stroke-primary-600' />}
                />
            );
            break;
    }

    return (
        <div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white h-screen'>
            <Layout />
            {/* Main Page */}
            <div className='flex flex-col xl:flex-row w-full h-full'>
                <div className='w-full xl:w-2/3 p-6 xl:p-8 flex flex-col gap-6 overflow-y-scroll'>
                    <div className='flex flex-col gap-5 w-full'>
                        <Breadcrumbs crumbs={["Tickets", `Ticket ${ticketID}`]} />
                        <div className='flex flex-col xl:flex-row xl:gap-2 xl:justify-between xl:items-end'>
                            <PageHeader title={`Ticket #${ticketID}`} />
                            <div className='gap-3 hidden xl:flex'>{ticketActions}</div>
                            <div className='gap-3 flex xl:hidden flex-col mt-3'>{ticketActionsMobile}</div>
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
                                                    {`${ticketDate.getDate()}-${ticketDate.getMonth()}-${ticketDate.getFullYear()} ${ticketDate.toLocaleTimeString()} `}
                                                </span>
                                                <div className='w-max'>{statusBadge}</div>
                                            </div>
                                        </div>
                                        <AssigneeCard
                                            subtitle={translations[language].assignee}
                                            name={
                                                ticket.assignee !== null
                                                    ? ticket.assignee?.prefix == null
                                                        ? `${ticket.assignee?.firstName} ${ticket.assignee?.lastName}`
                                                        : `${ticket.assignee?.firstName} ${ticket.assignee?.prefix} ${ticket.assignee?.lastName}`
                                                    : undefined
                                            }
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <span className='text-md text-gray-700 font-medium dark:text-white'>
                                            {translations[language].creator}
                                        </span>
                                        {ticket.creator.prefix == null ? (
                                            <AvatarCard
                                                name={`${ticket.creator.firstName} ${ticket.creator.lastName}`}
                                                subtitle={ticket.phoneNumber}
                                            />
                                        ) : (
                                            <AvatarCard
                                                name={`${ticket.creator.firstName} ${ticket.creator?.prefix} ${ticket.creator.lastName}`}
                                                subtitle={ticket.phoneNumber}
                                            />
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <span className='text-md text-gray-700 font-medium dark:text-white'>
                                            {translations[language].company}
                                        </span>
                                        <AvatarCard name={ticket.company.name} subtitle={ticket.company.country} />
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
                                                    text={translations[language].describe_issue_specific}
                                                />
                                                <InputTextArea
                                                    disabled={true}
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
                                                    disabled={true}
                                                    id='actionExpected'
                                                    name='actionExpected'
                                                    placeholder={
                                                        translations[language].describe_placeholder_expectation
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
                                                    placeholder={translations[language].describe_placeholder_tried}
                                                />
                                                <InputErrorMessage name='actionPerformed' />
                                            </div>
                                            <div className='flex flex-col w-full gap-1.5'>
                                                <InputLabel
                                                    htmlFor='extraInfo'
                                                    text={translations[language].describe_issue_extra_info}
                                                />
                                                <InputTextArea
                                                    disabled={true}
                                                    id='extraInfo'
                                                    name='extraInfo'
                                                    placeholder={translations[language].describe_placeholder_extra_info}
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
                                                <InputLabel htmlFor='solution' text={translations[language].solution} />
                                                <InputTextArea
                                                    disabled={
                                                        user?.role === "viscon-admin" ||
                                                        user?.role === "viscon-employee"
                                                            ? ticket.status === "in progress"
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
                            <div className='flex flex-col 2xl:flex-row  gap-1 justify-between'>
                                <span className='text-gray-700 dark:text-dark-300'>{ticket.creationDate}</span>
                                <div className='w-max'>{statusBadge}</div>
                            </div>
                        </div>
                        <AssigneeCard
                            subtitle={translations[language].assignee}
                            name={
                                ticket.assignee.prefix != null
                                    ? `${ticket.assignee.firstName} ${ticket.assignee.prefix} ${ticket.assignee.lastName}`
                                    : `${ticket.assignee.firstName} ${ticket.assignee.lastName}`
                            }
                        />
                    </div>
                    <Divider />
                </div>
            </div>
        </div>
    );
}
