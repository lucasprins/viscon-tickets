import { Dialog, Tab, Transition } from "@headlessui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import TicketService from "../../../features/tickets/ticketsService";
import FileService from "../../../services/file-upload/fileService";
import { useAppContext } from "../../../utils/hooks";
import { Attachment, ticketType } from "../../../utils/types";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { Button } from "../../atoms/Button/Button";
import { ButtonIcon } from "../../atoms/Button/ButtonIcon";
import { AssigneeCard } from "../../atoms/Cards/AssigneeCard";
import { AvatarCard } from "../../atoms/Cards/AvatarCard";
import { Divider } from "../../atoms/Divider/Divider";
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconAlert, IconClose, IconGear, IconImage } from "../../atoms/Icons/Icons";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";
import { InputTextArea } from "../../atoms/Input/InputTextArea";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { EmptyState } from "../../molecules/EmptyState/EmptyState";
import Layout from "../../organisms/Layout/Layout";
import { TicketActions } from "./TicketActions";
import { TicketModals } from "./TicketModals";
import { TicketPriorityBadge } from "./TicketPriorityBadge";
import { TicketStatusBadge } from "./TicketStatusBadge";

var translations = require("../../../translations/allTranslations.json");

export interface ITicketModals {
  claim: boolean;
  unclaim: boolean;
  resolve: boolean;
  open: boolean;
  cancel: boolean;
  files: boolean;
}

export function Ticket() {
  // Globals
  const { appState } = useAppContext();
  const user = appState.user;
  const language = appState.language;
  const accessToken = user?.accessToken || "";
  let ticketID = useParams().ticketID || "";

  // State
  const [ticket, setTicket] = useState<ticketType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchedTicketSuccess, setFetchedTicketSuccess] = useState<boolean>(false);

  const [addingSolution, setAddingSolution] = useState<boolean>(false);

  const [ticketModals, setTicketModals] = useState<ITicketModals>({
    claim: false,
    unclaim: false,
    resolve: false,
    open: false,
    cancel: false,
    files: false,
  });

  const [viewingFile, setViewingFile] = useState<Attachment | undefined>(undefined);

  let CancelToken = axios.CancelToken;
  let source = CancelToken.source();

  const fetchTicket = async () => {
    const response = TicketService.getTicket(ticketID, accessToken, source.token)
      .then((response) => {
        if (response.data.success) {
          if (response.data.data.solution == null) {
            response.data.data.solution = "";
          }
          if (response.data.data.machineName == null) {
            response.data.data.machineName = "";
          }
          setTicket(response.data.data);
          setFetchedTicketSuccess(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log(error);
        }
      });
  };

  const addSolution = async (solution: string) => {
    setAddingSolution(true);
    const response = await TicketService.addSolution(ticketID, accessToken, solution);
    if (response.data.success) {
      setTicket(response.data.data);
    }
    setAddingSolution(false);
  };

  const handleChangeTicketPriority = async (priority: string) => {
    await TicketService.changePriority(ticket?.id || "", priority)
      .then((response) => {
        setTicket(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchTicket();

    return () => {
      source.cancel();
    };
  }, []);

  if (!user) {
    return <Navigate to='/login' />;
  }

  if (!loading && fetchedTicketSuccess == false) {
    return <Navigate to='/ticket-not-found' />;
  }

  return (
    <>
      <Transition appear show={ticketModals.files} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => setViewingFile(undefined)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex items-center justify-center min-h-full p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='flex flex-col items-start w-full max-w-4xl gap-3 px-6 pt-4 pb-6 overflow-hidden overflow-y-scroll align-middle transition-all transform bg-white shadow-lg rounded-2xl dark:bg-dark-800 dark:border dark:border-dark-600'>
                  <Dialog.Title
                    as='h3'
                    className='flex items-center justify-between w-full text-lg font-semibold text-gray-900 dark:text-white'
                  >
                    Files
                    <ButtonIcon
                      icon={<IconClose size='20' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                      onclick={() => setTicketModals({ ...ticketModals, files: false })}
                    />
                  </Dialog.Title>
                  <ul className="flex flex-col gap-3">
                    {ticket?.attachments.map((attachment) => (
                      <li key={attachment.id}>
                        <button
                          onClick={() => setViewingFile(attachment)}
                          className='flex flex-row w-full gap-3 p-4 text-left bg-white border border-gray-200 shadow-sm outline-none dark:bg-dark-700 rounded-xl dark:border-dark-600'
                        >
                          <IconImage size='26' color='stroke-primary-500 dark:stroke-gray-300' fill='fill-primary-500' />
                          <div className='flex flex-col w-full gap-2'>
                            <span className='text-sm font-medium text-gray-700 break-all dark:text-white'>{attachment.key}</span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {viewingFile !== undefined && (
        <Transition appear show={viewingFile !== undefined} as={Fragment}>
          <Dialog as='div' className='relative z-10' onClose={() => setViewingFile(undefined)}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-40' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex items-center justify-center min-h-full p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <Dialog.Panel className='flex flex-col w-full max-w-4xl gap-3 px-6 pt-4 pb-6 overflow-hidden align-middle transition-all transform bg-white shadow-lg rounded-2xl dark:bg-dark-800 dark:border dark:border-dark-600'>
                    <Dialog.Title as='h3' className='flex items-center justify-between font-medium text-gray-900 dark:text-white'>
                      {viewingFile.key}
                      <ButtonIcon
                        icon={<IconClose size='20' color='stroke-gray-500 dark:stroke-gray-300' fill='fill-gray-500' />}
                        onclick={() => setViewingFile(undefined)}
                      />
                    </Dialog.Title>
                    <div>
                      {FileService.getFileExtension(viewingFile.key) === 'mp4' ? (
                        <video
                          controls
                          className='w-full h-full rounded-xl'
                          src={viewingFile.url}
                        />
                      ) : (
                        <img src={viewingFile.url} className="rounded-xl" />
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
      <TicketModals ticketModals={ticketModals} setTicketModals={setTicketModals} />
      <div className='flex flex-col w-full h-screen md:flex-row dark:bg-dark-800 dark:text-white'>
        <Layout />
        <>
          {loading ? (
            <div className='flex items-center justify-center w-full h-full'>
              <Spinner size='w-16 h-16' color='text-gray-200 dark:text-dark-600' fill='fill-primary-600' />
            </div>
          ) : ticket !== undefined ? (
            <div className='flex flex-col w-full h-screen md:flex-row dark:bg-dark-800 dark:text-white'>
              {/* Main Page */}
              <div className='flex flex-col w-full h-full xl:flex-row'>
                <div className='flex flex-col w-full gap-6 p-6 overflow-y-scroll xl:w-2/3 xl:p-8 no-scrollbar'>
                  <div className='flex flex-col w-full gap-5'>
                    <Breadcrumbs crumbs={["Tickets"]} />
                    <div className='flex flex-col lg:flex-row lg:gap-2 lg:justify-between lg:items-end'>
                      <PageHeader title={`Ticket #${ticket.ticketNumber}`} />
                      <TicketActions
                        user={user}
                        ticket={ticket}
                        setTicket={setTicket}
                        ticketModals={ticketModals}
                        setTicketModals={setTicketModals}
                      />
                    </div>
                  </div>
                  <Tab.Group>
                    <Tab.List className='flex items-center gap-2 p-1 border border-gray-100 rounded-lg bg-gray-50 dark:bg-dark-800 dark:border-dark-600'>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              selected
                                ? "bg-white dark:bg-dark-600 w-full flex outline-none justify-center text-gray-700 dark:text-white py-2 rounded-md drop-shadow font-semibold"
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
                                ? "bg-white dark:bg-dark-600 w-full flex outline-none justify-center text-gray-700 dark:text-white py-2 rounded-md drop-shadow font-semibold"
                                : "w-full flex justify-center py-2 text-gray-500 dark:text-dark-400 font-semibold"
                            }
                          >
                            {translations[language].solution}
                          </button>
                        )}
                      </Tab>
                      {/* <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              selected
                                ? "bg-white dark:bg-dark-600 w-full flex outline-none justify-center text-gray-700 dark:text-white py-2 rounded-md drop-shadow font-semibold"
                                : "w-full flex justify-center py-2 text-gray-500 dark:text-dark-400 font-semibold"
                            }
                          >
                            {translations[language].history}
                          </button>
                        )}
                      </Tab> */}
                    </Tab.List>
                    <Tab.Panels>
                      {/* Ticket */}
                      <Tab.Panel className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-4 xl:flex-row'>
                          <div className='flex flex-col gap-4 xl:hidden'>
                            <div className='flex flex-col'>
                              <span className='font-medium text-gray-700 text-md dark:text-white'>
                                {translations[language].creation_date}
                              </span>
                              <span className='text-gray-700 dark:text-dark-300'>{new Date(ticket.creationDate).toLocaleString()}</span>
                            </div>
                            <div className='flex gap-6'>
                              <div className='flex flex-col flex-wrap justify-between gap-1'>
                                <span className='font-medium text-gray-700 text-md dark:text-white'>
                                  {translations[language]["general.status"]}
                                </span>
                                <TicketStatusBadge status={ticket.status} />
                              </div>
                              <div className='flex flex-col flex-wrap justify-between gap-1'>
                                {(user?.role === "VisconAdmin" || user?.role === "VisconEmployee") && (
                                  <>
                                    <span className='font-medium text-gray-700 text-md dark:text-white'>
                                      {translations[language]["general.priority"]}
                                    </span>
                                    <TicketPriorityBadge handleChange={handleChangeTicketPriority} priority={ticket.priority} />
                                  </>
                                )}
                              </div>
                            </div>
                            {user.role === "VisconAdmin" || user.role === "VisconEmployee" ? (
                              <div className='flex flex-col w-full gap-2'>
                                <span className='font-medium text-gray-700 text-md dark:text-white'>{translations[language].assignee}</span>
                                <AssigneeCard
                                  subtitle={translations[language].assignee}
                                  name={ticket.assignee !== null ? `${ticket.assignee?.firstName} ${ticket.assignee?.lastName}` : undefined}
                                />
                              </div>
                            ) : undefined}
                          </div>
                          <div className='flex flex-col w-full gap-2'>
                            <span className='font-medium text-gray-700 text-md dark:text-white'>{translations[language].creator}</span>
                            <AvatarCard name={`${ticket.creator.firstName} ${ticket.creator.lastName}`} subtitle={ticket.phoneNumber} />
                          </div>
                          <div className='flex flex-col w-full gap-2'>
                            <span className='font-medium text-gray-700 text-md dark:text-white'>{translations[language].company}</span>
                            <AvatarCard name={ticket.company.name} subtitle={ticket.company.country} />
                          </div>
                        </div>
                        <Formik initialValues={ticket} onSubmit={() => console.log("submit")}>
                          {({ errors, touched, isValidating }) => (
                            <Form className='flex flex-col w-full gap-5'>
                              <div className='flex flex-col gap-4 md:flex-row'>
                                {ticket.machineName !== "" && ticket.machineName !== null && (
                                  <div className='flex flex-col w-full gap-1.5'>
                                    <InputLabel htmlFor='machineName' text={translations[language].machine} />
                                    <InputField
                                      style='icon'
                                      type='text'
                                      id='machineName'
                                      name='machineName'
                                      disabled={true}
                                      icon={<IconGear size='20' color='stroke-gray-500' fill='fill-primary-500' />}
                                    />
                                  </div>
                                )}
                                <div className='flex flex-col w-full gap-1.5'>
                                  <InputLabel htmlFor='issueType' text='Issue type' />
                                  <InputField style='iconless' type='text' id='issueType' name='issueType' disabled={true} />
                                </div>
                              </div>
                              <div className='flex flex-col w-full gap-1.5'>
                                <InputLabel htmlFor='issue' text={translations[language].describe_issue_specific} />
                                <InputTextArea
                                  disabled={true}
                                  id='issue'
                                  name='issue'
                                  placeholder={translations[language].describe_placeholder_specific}
                                />
                                <InputErrorMessage name='issue' />
                              </div>
                              <div className='flex flex-col w-full gap-1.5'>
                                <InputLabel htmlFor='actionExpected' text={translations[language].describe_issue_expectation} />
                                <InputTextArea
                                  disabled={true}
                                  id='actionExpected'
                                  name='actionExpected'
                                  placeholder={translations[language].describe_placeholder_expectation}
                                />
                                <InputErrorMessage name='actionExpected' />
                              </div>
                              <div className='flex flex-col w-full gap-1.5'>
                                <InputLabel htmlFor='actionPerformed' text={translations[language].describe_issue_tried} />
                                <InputTextArea
                                  disabled={true}
                                  id='actionPerformed'
                                  name='actionPerformed'
                                  placeholder={translations[language].describe_placeholder_tried}
                                />
                                <InputErrorMessage name='actionPerformed' />
                              </div>
                              <div className='flex flex-col w-full gap-1.5'>
                                <InputLabel htmlFor='extraInfo' text={translations[language].describe_issue_extra_info} />
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
                        <Formik initialValues={ticket} onSubmit={(ticket) => addSolution(ticket.solution)}>
                          {({ values, errors, touched, isValidating }) => (
                            <Form className='flex flex-col items-end w-full gap-5'>
                              {ticket.status === "Cancelled" ? (
                                <div className='flex flex-col w-full gap-1.5'>
                                  <InputLabel htmlFor='cancelReason' text='Reason for cancelling' />
                                  <InputTextArea disabled id='cancelReason' name='cancelReason' />
                                </div>
                              ) : undefined}
                              <div className='flex flex-col w-full gap-1.5'>
                                <InputLabel htmlFor='solution' text={translations[language].solution} />
                                <InputTextArea
                                  disabled={user?.role === "CustomerAdmin" || user?.role === "CustomerEmployee"}
                                  id='solution'
                                  name='solution'
                                />
                              </div>

                              {(user?.role === "VisconAdmin" || user?.role === "VisconEmployee") && (
                                <div>
                                  <Button
                                    formType='submit'
                                    size='medium'
                                    width='content'
                                    type={values.solution === ticket.solution ? "secondary-gray" : "primary"}
                                    disabled={addingSolution || values.solution === ticket.solution}
                                    icon={
                                      addingSolution ? <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' /> : undefined
                                    }
                                    text='Save solution'
                                  />
                                </div>
                              )}
                            </Form>
                          )}
                        </Formik>
                      </Tab.Panel>

                      {/* History Panel */}
                      {/* <Tab.Panel>History...</Tab.Panel> */}
                    </Tab.Panels>
                  </Tab.Group>
                </div>

                {/* Sidebar */}
                <div className='flex-col hidden w-1/3 h-full gap-8 p-8 border-l border-gray-200 xl:flex dark:border-dark-600'>
                  <div className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                      <span className='font-medium text-gray-700 text-md dark:text-white'>{translations[language].creation_date}</span>
                      <span className='text-gray-700 dark:text-dark-300'>{new Date(ticket.creationDate).toLocaleString()}</span>
                    </div>
                    <div className='flex gap-6'>
                      <div className='flex flex-col flex-wrap justify-between gap-1'>
                        <span className='font-medium text-gray-700 text-md dark:text-white'>
                          {translations[language]["general.status"]}
                        </span>
                        <TicketStatusBadge status={ticket.status} />
                      </div>
                      <div className='flex flex-col flex-wrap justify-between gap-1'>
                        {(user?.role === "VisconAdmin" || user?.role === "VisconEmployee") && (
                          <>
                            <span className='font-medium text-gray-700 text-md dark:text-white'>
                              {translations[language]["general.priority"]}
                            </span>
                            <TicketPriorityBadge handleChange={handleChangeTicketPriority} priority={ticket.priority} />
                          </>
                        )}
                      </div>
                    </div>
                    {user.role === "VisconAdmin" || user.role === "VisconEmployee" ? (
                      <div className='flex flex-col w-full gap-2'>
                        <span className='font-medium text-gray-700 text-md dark:text-white'>{translations[language].assignee}</span>
                        <AssigneeCard
                          subtitle={translations[language].assignee}
                          name={ticket.assignee !== null ? `${ticket.assignee?.firstName} ${ticket.assignee?.lastName}` : undefined}
                        />
                      </div>
                    ) : undefined}
                  </div>
                  <Divider />
                  <div>
                    {ticket.attachments.length > 0 ? (
                      <ul className='flex flex-col gap-3'>
                        {ticket.attachments.map((attachment) => (
                          <li key={attachment.id}>
                            <button
                              onClick={() => setViewingFile(attachment)}
                              className='flex flex-row w-full gap-3 p-4 text-left bg-white border border-gray-200 shadow-sm outline-none dark:bg-dark-700 rounded-xl dark:border-dark-600'
                            >
                              <IconImage size='26' color='stroke-primary-500 dark:stroke-gray-300' fill='fill-primary-500' />
                              <div className='flex flex-col w-full gap-2'>
                                <span className='text-sm font-medium text-gray-700 break-all dark:text-white'>{attachment.key}</span>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <EmptyState
                        color='primary'
                        title={translations[language]["ticket.attachments.empty.title"]}
                        subtitle={translations[language]["ticket.attachments.empty.subtitle"]}
                        featuredIcon={
                          <FeaturedIcon
                            size='lg'
                            type='primary'
                            icon={<IconAlert size='20' fill='fill-primary-500' color='stroke-primary-500' />}
                          />
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : undefined}
        </>
      </div>
    </>
  );
}
