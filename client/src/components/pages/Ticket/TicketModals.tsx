import React from "react";
import { useNavigate } from "react-router-dom";
import { getClaimedTicketSuccess, getUnclaimedTicketSuccess, getResolvedTicketSuccess, getOpenedTicketSuccess, getCancelledTicketSuccess, resetTicketActions } from "../../../features/tickets/ticketsSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { Modal } from "../../organisms/Modal/Modal";

export const TicketModals = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const claimedTicketSuccess = useAppSelector(getClaimedTicketSuccess);
    const unclaimedTicketSuccess = useAppSelector(getUnclaimedTicketSuccess);
    const resolvedTicketSuccess = useAppSelector(getResolvedTicketSuccess);
    const openedTicketSuccess = useAppSelector(getOpenedTicketSuccess);
    const cancelledTicketSuccess = useAppSelector(getCancelledTicketSuccess);

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
                            dispatch(resetTicketActions());
                        }}
                        button_primary_text='Close'
                        button_secondary_text='Tickets'
                        button_primary_onclick={() => {
                            dispatch(resetTicketActions());
                        }}
                        button_secondary_onclick={() => {
                            navigate("/tickets");
                        }}
                    />
                </>
            )}

            {unclaimedTicketSuccess == false && (
                <>
                    <Modal
                        type='error'
                        title='Oops, something went wrong.'
                        subtitle='We could not unclaim this ticket.'
                        is_open={true}
                        close_modal={() => {
                            dispatch(resetTicketActions());
                        }}
                        button_primary_text='Close'
                        button_secondary_text='Tickets'
                        button_primary_onclick={() => {
                            dispatch(resetTicketActions());
                        }}
                        button_secondary_onclick={() => {
                            navigate("/tickets");
                        }}
                    />
                </>
            )}

            {resolvedTicketSuccess == false && (
                <>
                    <Modal
                        type='error'
                        title='Oops, something went wrong.'
                        subtitle='We could not resolve this ticket.'
                        is_open={true}
                        close_modal={() => {
                            dispatch(resetTicketActions());
                        }}
                        button_primary_text='Close'
                        button_secondary_text='Tickets'
                        button_primary_onclick={() => {
                            dispatch(resetTicketActions());
                        }}
                        button_secondary_onclick={() => {
                            navigate("/tickets");
                        }}
                    />
                </>
            )}

            {openedTicketSuccess == false && (
                <>
                    <Modal
                        type='error'
                        title='Oops, something went wrong.'
                        subtitle='This ticket has not been resolved yet.'
                        is_open={true}
                        close_modal={() => {
                            dispatch(resetTicketActions());
                        }}
                        button_primary_text='Close'
                        button_secondary_text='Tickets'
                        button_primary_onclick={() => {
                            dispatch(resetTicketActions());
                        }}
                        button_secondary_onclick={() => {
                            navigate("/tickets");
                        }}
                    />
                </>
            )}

            {cancelledTicketSuccess == false && (
                <>
                    <Modal
                        type='error'
                        title='Oops, something went wrong.'
                        subtitle='We could not cancel this ticket'
                        is_open={true}
                        close_modal={() => {
                            dispatch(resetTicketActions());
                        }}
                        button_primary_text='Close'
                        button_secondary_text='Tickets'
                        button_primary_onclick={() => {
                            dispatch(resetTicketActions());
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
