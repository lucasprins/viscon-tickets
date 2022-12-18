import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import TicketService from "../../../features/tickets/ticketsService";
import { useAppContext, useAuthentication, useJwtExpiration } from "../../../utils/hooks";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { Button } from "../../atoms/Button/Button";
import { MetricCard } from "../../atoms/Cards/MetricCard";
import { Divider } from "../../atoms/Divider/Divider";
import { IconPlus } from "../../atoms/Icons/Icons";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import { Spinner } from "../../atoms/Spinner/Spinner";
import Layout from "../../organisms/Layout/Layout";
import { TableTickets } from "../../organisms/Table/TableTickets";

const translations = require("../../../translations/allTranslations.json");

export function Tickets() {
  const { appState } = useAppContext();
  const user = appState.user;
  const language = appState.language;

  const metricsSpinner = <Spinner size='w-10 h-10' color='text-gray-200 dark:text-dark-600' fill='fill-primary-600' />;

  const [tickets, setTickets] = useState();
  const [loadingTickets, setLoadingTickets] = useState<boolean>();
  const [error, setError] = useState<boolean>(false);

  const [unresolvedTickets, setUnresolvedTickets] = useState<number>(0);
  const [yourTickets, setYourTickets] = useState<number>(0);
  const [openTickets, setOpenTickets] = useState<number>(0);

  const [page, setPage] = useState(1);
  const maxPages = Math.ceil(unresolvedTickets / 10);

  const statusOptions = user?.role === "VisconAdmin" || user?.role === "VisconEmployee" ? [
    { value: "", label: "All" },
    { value: "Open", label: translations[language].open },
    { value: "InProgress", label: translations[language].inProgress },
    { value: "Resolved", label: translations[language].resolved },
    { value: "Cancelled", label: translations[language].cancelled },
  ] : [
    { value: "", label: "All" },
    { value: "Resolved", label: translations[language].resolved },
    { value: "Cancelled", label: translations[language].cancelled },
  ];

  const [statusFilter, setStatusFilter] = useState({ value: "", label: "All" });

  const handleChangeStatusFilter = (payload: any) => {
    setStatusFilter(payload);
    setPage(1);
  };

  const resetFilters = () => {
    setStatusFilter({ value: "", label: "All" });
  };

  let CancelTokenTickets = axios.CancelToken;
  let sourceTickets = CancelTokenTickets.source();

  const fetchTickets = async () => {
    setLoadingTickets(true);
    const response = await TicketService.getTickets(page, statusFilter.value, sourceTickets.token);
    console.log(response);
    if (response.data.success) {
      setTickets(response.data.data.tickets);
      setUnresolvedTickets(response.data.data.unresolvedTickets);
      setYourTickets(response.data.data.yourTickets);
      setOpenTickets(response.data.data.openTickets);
    } else {
      setError(true);
    }
    setLoadingTickets(false);
  };

  useEffect(() => {
    fetchTickets();

    console.table(tickets);

    return () => {
      sourceTickets.cancel();
    };
  }, [page, statusFilter]);

  const handleNextPage = () => {
    page != maxPages && setPage(page + 1);
  };

  const handlePreviousPage = () => {
    page > 1 && setPage(page - 1);
  };

  if (!useAuthentication() || user == undefined) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='flex flex-col h-screen bg-gray-50 md:flex-row dark:bg-dark-800 dark:text-white'>
      <Layout />
      <div className='flex flex-col w-full gap-8 p-8 overflow-y-scroll'>
        <Breadcrumbs crumbs={["Tickets"]} />
        <div className='flex flex-col w-full gap-6'>
          <div className='flex flex-col justify-between gap-4 sm:flex-row'>
            <PageHeader title={translations[language].tickets} />
            {user.role !== "VisconAdmin" && user.role !== "VisconEmployee" && (
              <Button
                size='medium'
                width='content'
                type='secondary-gray'
                text={translations[language].create_ticket}
                url='/knowledgebase/create-ticket'
                icon={<IconPlus size='20' color='stroke-gray-700 dark:stroke-white' fill='' />}
              />
            )}
          </div>
          <Divider />
        </div>
        {!loadingTickets ? (
          <div className='hidden w-full gap-6 lg:flex '>
            <MetricCard content={openTickets} title="Open tickets" />
            <MetricCard content={unresolvedTickets} title='Unresolved tickets' />
            <MetricCard content={yourTickets} title='Your tickets' />
          </div>
        ) : (
          <div className='hidden w-full gap-6 lg:flex '>
            <MetricCard content={metricsSpinner} title="Open tickets" />
            <MetricCard content={metricsSpinner} title='Total tickets' />
            <MetricCard content={metricsSpinner} title='Your tickets' />
          </div>
        )}
        {!loadingTickets && tickets !== undefined ? (
          <div className='lg:flex'>
            <TableTickets
              tickets={tickets}
              nextPage={handleNextPage}
              previousPage={handlePreviousPage}
              page={page}
              pages={maxPages}
              statusFilter={statusFilter}
              statusFilterOptions={statusOptions}
              handleChangeStatusFilter={handleChangeStatusFilter}
              resetFilters={resetFilters}
            />
          </div>
        ) : (
          <div className='flex items-center justify-center w-full h-96'>
            <Spinner size='w-16 h-16' color='text-gray-200 dark:text-dark-600' fill='fill-primary-600' />
          </div>
        )}
      </div>
    </div>
  );
}
