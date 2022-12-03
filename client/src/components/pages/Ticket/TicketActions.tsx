import React from "react";
import TicketService from "../../../features/tickets/ticketsService";
import { useAppContext } from "../../../utils/hooks";
import { ticketType, userType } from "../../../utils/types";
import { Button } from "../../atoms/Button/Button";
import { IconFlipBackwards, IconCheck, IconFileSearch } from "../../atoms/Icons/Icons";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { ITicketModals } from "./Ticket";

var translations = require("../../../translations/ticketTranslations.json");

export const TicketActions = ({
  user,
  ticket,
  setTicket,
  ticketModals,
  setTicketModals,
}: {
  user: userType;
  ticket: ticketType;
  setTicket: React.Dispatch<React.SetStateAction<ticketType | undefined>>;
  ticketModals: ITicketModals;
  setTicketModals: React.Dispatch<React.SetStateAction<ITicketModals>>;
}) => {
  const language = useAppContext().appState.language;

  const [claimingTicket, setClaimingTicket] = React.useState(false);
  const [unclaimingTicket, setUnclaimingTicket] = React.useState(false);
  const [resolvingTicket, setResolvingTicket] = React.useState(false);
  const [openingTicket, setOpeningTicket] = React.useState(false);
  const [cancellingTicket, setCancellingTicket] = React.useState(false);

  const claimTicket = async () => {
    setClaimingTicket(true);
    const response = await TicketService.claimTicket(ticket.id, user.accessToken);
    setTicket(response.data.data);
    if (!response.data.success) {
      setTicketModals({ ...ticketModals, claim: true });
    }
    setClaimingTicket(false);
  };

  const unclaimTicket = async () => {
    setUnclaimingTicket(true);
    const response = await TicketService.unclaimTicket(ticket.id, user.accessToken);
    setTicket(response.data.data);
    if (!response.data.success) {
      setTicketModals({ ...ticketModals, unclaim: true });
    }
    setUnclaimingTicket(false);
  };

  const resolveTicket = async () => {
    setResolvingTicket(true);
    const response = await TicketService.resolveTicket(ticket.id, user.accessToken);
    setTicket(response.data.data);
    if (!response.data.success) {
      setTicketModals({ ...ticketModals, resolve: true });
    }
    setResolvingTicket(false);
  };

  const openTicket = async () => {
    setOpeningTicket(true);
    const response = await TicketService.openTicket(ticket.id, user.accessToken);
    setTicket(response.data.data);
    if (!response.data.success) {
      setTicketModals({ ...ticketModals, open: true });
    }
    setOpeningTicket(false);
  };

  const cancelTicket = async () => {
    setCancellingTicket(true);
    const response = await TicketService.cancelTicket(ticket.id, user.accessToken);
    setTicket(response.data.data);
    if (!response.data.success) {
      setTicketModals({ ...ticketModals, cancel: true });
    }
    setCancellingTicket(false);
  };

  let ticketActions: JSX.Element[] = [];
  let ticketActionsMobile: JSX.Element[] = [];

  ticketActionsMobile.push(
    <Button
      key="view_files_mobile"
      size='medium'
      width='full'
      type='secondary-gray'
      text={translations[language].view_files}
      icon={<IconFileSearch size='20' color='stroke-gray-700 dark:stroke-white' fill='fill-gray-700' />}
    />
  );

  if (user.role === "VisconAdmin" || user.role === "VisconEmployee") {
    switch (ticket.status) {
      case "Open":
        ticketActions.push(
          <Button
            key="claim"
            size='medium'
            width='content'
            type='primary'
            icon={claimingTicket ? <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' /> : undefined}
            disabled={claimingTicket}
            onclick={claimTicket}
            text={translations[language].claim_ticket}
          />
        );
        ticketActionsMobile.push(
          <Button
            key="claim_mobile"
            size='medium'
            width='full'
            type='primary'
            icon={claimingTicket ? <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' /> : undefined}
            disabled={claimingTicket}
            onclick={claimTicket}
            text={translations[language].claim_ticket}
          />
        );
        break;
      case "InProgress":
        if (ticket.assignee.id == user.id) {
          ticketActions.push(
            <Button
              key="unclaim"
              size='medium'
              width='content'
              type='secondary-gray'
              disabled={unclaimingTicket || resolvingTicket}
              onclick={unclaimTicket}
              text={translations[language].unclaim}
              icon={
                unclaimingTicket ? (
                  <Spinner
                    size='w-4 h-4'
                    color='text-gray-200 dark:text-dark-600'
                    fill='fill-gray-700 dark:fill-white'
                  />
                ) : (
                  <IconFlipBackwards size='20' color='stroke-gray-700 dark:stroke-white' fill='fill-primary-700' />
                )
              }
            />
          );
          ticketActionsMobile.push(
            <Button
              key="unclaim_mobile"
              size='medium'
              width='full'
              type='secondary-gray'
              disabled={unclaimingTicket || resolvingTicket}
              onclick={unclaimTicket}
              text={translations[language].unclaim}
              icon={
                unclaimingTicket ? (
                  <Spinner
                    size='w-4 h-4'
                    color='text-gray-200 dark:text-dark-600'
                    fill='fill-gray-700 dark:fill-white'
                  />
                ) : (
                  <IconFlipBackwards size='20' color='stroke-gray-700 dark:stroke-white' fill='fill-primary-700' />
                )
              }
            />
          );
        }
        ticketActions.push(
          <Button
            key="resolve"
            size='medium'
            width='content'
            type='primary'
            text={translations[language].resolve}
            disabled={unclaimingTicket || resolvingTicket}
            onclick={resolveTicket}
            icon={
              resolvingTicket ? (
                <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />
              ) : (
                <IconCheck size='20' color='stroke-white' fill='fill-white' />
              )
            }
          />
        );
        ticketActionsMobile.push(
          <Button
            key="resolve_mobile"
            size='medium'
            width='full'
            type='primary'
            text={translations[language].resolve}
            disabled={unclaimingTicket || resolvingTicket}
            onclick={resolveTicket}
            icon={
              resolvingTicket ? (
                <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />
              ) : (
                <IconCheck size='20' color='stroke-white' fill='fill-white' />
              )
            }
          />
        );
        break;
      case "Resolved":
        ticketActions.push(
          <Button
            key="reopen"
            size='medium'
            width='content'
            type='primary'
            disabled={openingTicket}
            onclick={openTicket}
            text={translations[language].re_open}
            icon={openingTicket ? <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' /> : undefined}
          />
        );
        ticketActionsMobile.push(
          <Button
            key="reopen_mobile"
            size='medium'
            width='full'
            type='primary'
            disabled={openingTicket}
            onclick={openTicket}
            text={translations[language].re_open}
            icon={openingTicket ? <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' /> : undefined}
          />
        );
        break;
    }
  }

  if (user.role === "CustomerAdmin" || user.role === "CustomerEmployee") {
    if (ticket.status === "Open" || ticket.status === "InProgress") {
      ticketActions.push(
        <Button
          key="cancel"
          size='medium'
          width='content'
          type='primary'
          disabled={cancellingTicket}
          onclick={cancelTicket}
          text={translations[language].cancel_ticket}
          icon={cancellingTicket ? <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' /> : undefined}
        />
      );
      ticketActionsMobile.push(
        <Button
          key="cancel_mobile"
          size='medium'
          width='content'
          type='primary'
          disabled={cancellingTicket}
          onclick={cancelTicket}
          text={translations[language].cancel_ticket}
          icon={cancellingTicket ? <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' /> : undefined}
        />
      );
    }
  }

  return (
    <>
      <div className='hidden gap-3 lg:flex'>{ticketActions}</div>
      <div className='flex flex-col-reverse gap-3 mt-3 lg:hidden'>{ticketActionsMobile}</div>
    </>
  );
};
