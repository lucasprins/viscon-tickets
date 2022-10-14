import { Form, Formik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import { getCurrentLanguage, getUser } from "../../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { capitalize } from "../../../utils/stringUtil";
import { TicketType } from "../../../utils/types";
import { validateTextarea } from "../../../utils/validateInput";
import { Badge } from "../../atoms/Badge/Badge";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { AssigneeCard } from "../../atoms/Cards/AssigneeCard";
import { AvatarCard } from "../../atoms/Cards/AvatarCard";
import { Divider } from "../../atoms/Divider/Divider";
import { IconAlert, IconCheck, IconStopwatch } from "../../atoms/Icons/Icons";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputLabel } from "../../atoms/Input/InputLabel";
import { InputTextArea } from "../../atoms/Input/InputTextArea";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import Layout from "../../organisms/Layout/Layout";

var tickets = require("../../../features/tickets/tickets.json");
var translations = require("../../../translations/ticketTranslations.json");

export function Ticket() {
    const dispatch = useAppDispatch();
    const language = useAppSelector(getCurrentLanguage);

    const { ticketID }: any = useParams();
    const user = useAppSelector(getUser);
    const ticket: TicketType = tickets.filter((ticket: TicketType) => ticket.ticketNumber === ticketID)[0];

    const ticketActions = [];

    let statusBadge;
    switch(ticket.status) {
        case "open": 
            statusBadge = <Badge size="md" color="error" text={capitalize(ticket.status)} icon={<IconAlert size='14' fill='fill-error-600 dark:fill-error-400' color='stroke-error-600 dark:stroke-error-400' />} />;
            break;
        case "in progress": 
            statusBadge = <Badge size="md" color="gray" text={capitalize(ticket.status)} icon={<IconStopwatch size='14' fill='fill-gray-600 dark:fill-gray-300' color='stroke-gray-600 dark:stroke-gray-300' />} />;
            break;
        case "resolved": 
            statusBadge = <Badge size="md" color="success" text={capitalize(ticket.status)} icon={<IconCheck size='14' fill='fill-success-600' color='stroke-success-600' />} />;
            break;
        case "cancelled": 
            statusBadge = <Badge size="md" color="primary" text={capitalize(ticket.status)} icon={<IconCheck size='14' fill='fill-primary-600' color='stroke-primary-600' />} />;
            break;
    }

    return (
        <div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white h-screen'>
            <Layout />
                {/* Main Page */}
                <div className="flex w-full h-full">
                    {/* Main */}
                    <div className="w-2/3 p-8 flex flex-col gap-6 overflow-y-scroll">
                        <div className='flex flex-col gap-5 w-full'>
                            <Breadcrumbs crumbs={["Tickets", `Ticket ${ticketID}`]} />
                            <PageHeader title={`Ticket #${ticketID}`} />
                            <Divider />
                        </div>
                        {/* Ticket assignee */}
                        <div className='flex gap-4'>
                            <div className="flex flex-col gap-2 w-full">
                                <span className="text-md text-gray-700 font-medium dark:text-white">Creator</span>
                                <AvatarCard
                                    name={`${ticket.customerEmployee.firstName} ${ticket.customerEmployee.preposition} ${ticket.customerEmployee.lastName}`}
                                    subtitle={ticket.phoneNumber}
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <span className="text-md text-gray-700 font-medium dark:text-white">Company</span>
                                <AvatarCard
                                    name={ticket.customerEmployee.company.name}
                                    subtitle={ticket.customerEmployee.company.country}
                                />
                            </div>
                        </div>

                        <Formik initialValues={ticket} onSubmit={() => console.log('submit')}>
                                {({ errors, touched, isValidating }) => (
                                    <Form className='flex flex-col gap-4 w-full'>
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
                                                disabled={true}
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
                                                disabled={true}
                                                id='extraInformation'
                                                name='extraInformation'
                                                placeholder={translations[language].describe_placeholder_extra_info}
                                            />
                                            <InputErrorMessage name='extraInformation' />
                                        </div>
                                    </Form>
                                )}
                            </Formik>


                    </div>
                    {/* Sidebar */}
                    <div className="flex flex-col w-1/3 p-8 border-l border-gray-300 dark:border-dark-500 h-full gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <span className="text-md text-gray-700 dark:text-white font-medium">Creation Date</span>
                                <div className="flex justify-between">
                                    <span className="text-gray-700 dark:text-dark-300">{ticket.creationDate}</span>
                                    {statusBadge}
                                </div>
                            </div>
                            <AssigneeCard name={ticket.visconEmployee !== null ? `${ticket.visconEmployee?.firstName} ${ticket.visconEmployee?.preposition} ${ticket.visconEmployee?.lastName}` : undefined} />
                        </div>
                        <Divider />
                    </div>
                </div>
        </div>
    );
}
