import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../organisms/Modal/Modal";
import { ITicketModals } from "./Ticket";

export const TicketModals = ({
  ticketModals,
  setTicketModals,
}: {
  ticketModals: ITicketModals;
  setTicketModals: React.Dispatch<React.SetStateAction<ITicketModals>>;
}) => {
  const navigate = useNavigate();

  return (
    <>
      {ticketModals.claim && (
        <>
          <Modal
            type='error'
            title='Oops, something went wrong.'
            subtitle='This ticket has already been claimed.'
            is_open={true}
            close_modal={() => {
              setTicketModals({ ...ticketModals, claim: false });
            }}
            button_primary_text='Close'
            button_secondary_text='Tickets'
            button_primary_onclick={() => {
              setTicketModals({ ...ticketModals, claim: false });
            }}
            button_secondary_onclick={() => {
              navigate("/tickets");
            }}
          />
        </>
      )}

      {ticketModals.unclaim && (
        <>
          <Modal
            type='error'
            title='Oops, something went wrong.'
            subtitle='We could not unclaim this ticket.'
            is_open={true}
            close_modal={() => {
              setTicketModals({ ...ticketModals, unclaim: false });
            }}
            button_primary_text='Close'
            button_secondary_text='Tickets'
            button_primary_onclick={() => {
              setTicketModals({ ...ticketModals, unclaim: false });
            }}
            button_secondary_onclick={() => {
              navigate("/tickets");
            }}
          />
        </>
      )}

      {ticketModals.resolve && (
        <>
          <Modal
            type='error'
            title='Oops, something went wrong.'
            subtitle='We could not resolve this ticket.'
            is_open={true}
            close_modal={() => {
              setTicketModals({ ...ticketModals, resolve: false });
            }}
            button_primary_text='Close'
            button_secondary_text='Tickets'
            button_primary_onclick={() => {
              setTicketModals({ ...ticketModals, resolve: false });
            }}
            button_secondary_onclick={() => {
              navigate("/tickets");
            }}
          />
        </>
      )}

      {ticketModals.open && (
        <>
          <Modal
            type='error'
            title='Oops, something went wrong.'
            subtitle='This ticket has not been resolved yet.'
            is_open={true}
            close_modal={() => {
              setTicketModals({ ...ticketModals, open: false });
            }}
            button_primary_text='Close'
            button_secondary_text='Tickets'
            button_primary_onclick={() => {
              setTicketModals({ ...ticketModals, open: false });
            }}
            button_secondary_onclick={() => {
              navigate("/tickets");
            }}
          />
        </>
      )}

      {ticketModals.cancel && (
        <>
          <Modal
            type='error'
            title='Oops, something went wrong.'
            subtitle='We could not cancel this ticket'
            is_open={true}
            close_modal={() => {
              setTicketModals({ ...ticketModals, cancel: false });
            }}
            button_primary_text='Close'
            button_secondary_text='Tickets'
            button_primary_onclick={() => {
              setTicketModals({ ...ticketModals, cancel: false });
            }}
            button_secondary_onclick={() => {
              navigate("/tickets");
            }}
          />
        </>
      )}
    </>
  );
};
