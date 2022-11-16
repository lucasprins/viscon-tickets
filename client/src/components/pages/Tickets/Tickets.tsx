import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../../features/auth/authSlice";
import {
  fetchTicketsAsync,
  fetchTotalTicketsAsync,
  fetchTotalTicketsByUser,
  fetchTotalTicketsThisWeek,
  getFetchingTickets,
  getFetchingTotalTickets,
  getTickets,
  getTotalTickets,
  getTotalTicketsByUser,
  getTotalTicketsThisWeek,
  resetTicketsMetrics,
} from "../../../features/tickets/ticketsSlice";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { MetricCard } from "../../atoms/Cards/MetricCard";
import { Divider } from "../../atoms/Divider/Divider";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import { Spinner } from "../../atoms/Spinner/Spinner";
import Layout from "../../organisms/Layout/Layout";
import { TableTickets } from "../../organisms/Table/TableTickets";

export function Tickets() {
  const user = localStorage.getItem("user");
  const language = useAppSelector(getCurrentLanguage);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken) || "";

  const tickets = useAppSelector(getTickets);
  const totalTickets = useAppSelector(getTotalTickets);
  const totalTicketsByUser = useAppSelector(getTotalTicketsByUser);
  const totalTicketsThisWeek = useAppSelector(getTotalTicketsThisWeek);

  const loadingTickets = useAppSelector(getFetchingTickets);
  const loadingTotalTickets = useAppSelector(getFetchingTotalTickets);

  const [page, setPage] = useState(1);
  const maxPages = Math.ceil(totalTickets / 10);

  const statusOptions = [
    { value: "", label: "All" },
    { value: "Open", label: "Open" },
    { value: "InProgress", label: "In progress" },
    { value: "Resolved", label: "Resolved" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState({ value: "", label: "All" });
  const [company, setCompany] = useState("");

  const handleChangeStatusFilter = (payload: any) => {
    setStatusFilter(payload);
    setPage(1);
  };

  const resetFilters = () => {
    setSearchFilter("");
    setStatusFilter({ value: "", label: "All" });
    setCompany("");
  };

  let CancelTokenTickets = axios.CancelToken;
  let sourceTickets = CancelTokenTickets.source();
  let CancelTokenTotalTickets = axios.CancelToken;
  let sourceTotalTickets = CancelTokenTotalTickets.source();
  let CancelTokenTotalTicketsByUser = axios.CancelToken;
  let sourceTotalTicketsByUser = CancelTokenTotalTicketsByUser.source();
  let CancelTokenTotalTicketsThisWeek = axios.CancelToken;
  let sourceTotalTicketsThisWeek = CancelTokenTotalTicketsThisWeek.source();

  useEffect(() => {
    dispatch(
      fetchTicketsAsync({
        page: page,
        status: statusFilter.value,
        accessToken: accessToken,
        cancelToken: sourceTickets.token,
      })
    );
    return () => {
      sourceTickets.cancel();
    };
  }, [page, statusFilter]);

  useEffect(() => {
    dispatch(
      fetchTotalTicketsAsync({
        status: statusFilter.value,
        accessToken: accessToken,
        cancelToken: sourceTotalTickets.token,
      })
    );
    return () => {
      sourceTotalTickets.cancel();
    };
  }, [statusFilter]);

  useEffect(() => {
    dispatch(fetchTotalTicketsByUser({ accessToken: accessToken, cancelToken: sourceTotalTicketsByUser.token }));
    dispatch(fetchTotalTicketsThisWeek({ accessToken: accessToken, cancelToken: sourceTotalTicketsThisWeek.token }));
    return () => {
      dispatch(resetTicketsMetrics());
      sourceTotalTicketsByUser.cancel();
      sourceTotalTickets.cancel();
      sourceTotalTicketsByUser.cancel();
    };
  }, []);

  const handleNextPage = () => {
    page != maxPages && setPage(page + 1);
  };

  const handlePreviousPage = () => {
    page > 1 && setPage(page - 1);
  };

  if (!user) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='flex flex-col h-screen md:flex-row dark:bg-dark-800 dark:text-white'>
      <Layout />
      <div className='p-8 w-full flex flex-col gap-8 overflow-y-scroll'>
        <Breadcrumbs crumbs={["Tickets"]} />
        <div className='flex flex-col gap-6 w-full'>
          <PageHeader title='Tickets' />
          <Divider />
        </div>
        <div className='hidden gap-6 w-full md:flex '>
          <MetricCard number={totalTickets.toString()} title='Total tickets' />
          <MetricCard number={totalTicketsThisWeek.toString()} title="This week's tickets" />
          <MetricCard number={totalTicketsByUser.toString()} title='Your tickets' />
        </div>
        {loadingTickets || loadingTotalTickets ? (
          <div className='flex w-full justify-center items-center h-96'>
            <Spinner size='w-16 h-16' color='text-gray-200 dark:text-dark-600' fill='fill-primary-600' />
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
