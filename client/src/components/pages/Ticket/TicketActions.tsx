import React from "react";
import {
    cancelTicketAsync,
    claimTicketAsync,
    getCancellingTicket,
    getClaimingTicket,
    getOpeningTicket,
    getResolvingTicket,
    getUnclaimingTicket,
    openTicketAsync,
    resolveTicketAsync,
    unclaimTicketAsync,
} from "../../../features/tickets/ticketsSlice";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { ticketType, userType } from "../../../utils/types";
import { Button } from "../../atoms/Button/Button";
import { IconFlipBackwards, IconCheck, IconFileSearch } from "../../atoms/Icons/Icons";
import { Spinner } from "../../atoms/Spinner/Spinner";

var translations = require("../../../translations/ticketTranslations.json");

export const TicketActions = ({ user, ticket }: { user: userType; ticket: ticketType }) => {
    const language = useAppSelector(getCurrentLanguage);
    const dispatch = useAppDispatch();

    const claimingTicket = useAppSelector(getClaimingTicket);
    const unclaimingTicket = useAppSelector(getUnclaimingTicket);
    const resolvingTicket = useAppSelector(getResolvingTicket);
    const openingTicket = useAppSelector(getOpeningTicket);
    const cancellingTicket = useAppSelector(getCancellingTicket);

    const claimTicket = () => {
        dispatch(claimTicketAsync({ ticketId: ticket.id, accessToken: user.accessToken }));
    };

    const unclaimTicket = () => {
        dispatch(unclaimTicketAsync({ ticketId: ticket.id, accessToken: user.accessToken }));
    };

    const resolveTicket = () => {
        dispatch(resolveTicketAsync({ ticketId: ticket.id, accessToken: user.accessToken }));
    };

    const openTicket = () => {
        dispatch(openTicketAsync({ ticketId: ticket.id, accessToken: user.accessToken }));
    };

    const cancelTicket = () => {
        dispatch(cancelTicketAsync({ ticketId: ticket.id, accessToken: user.accessToken }));
    };

    let ticketActions: JSX.Element[] = [];
    let ticketActionsMobile: JSX.Element[] = [];

    ticketActionsMobile.push(
        <Button
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
                        size='medium'
                        width='content'
                        type='primary'
                        icon={
                            claimingTicket ? (
                                <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />
                            ) : undefined
                        }
                        disabled={claimingTicket}
                        onclick={claimTicket}
                        text={translations[language].claim_ticket}
                    />
                );
                ticketActionsMobile.push(
                    <Button
                        size='medium'
                        width='full'
                        type='primary'
                        icon={
                            claimingTicket ? (
                                <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />
                            ) : undefined
                        }
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
                            size='medium'
                            width='content'
                            type='secondary-gray'
                            disabled={unclaimingTicket}
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
                                    <IconFlipBackwards
                                        size='20'
                                        color='stroke-gray-700 dark:stroke-white'
                                        fill='fill-primary-700'
                                    />
                                )
                            }
                        />
                    );
                    ticketActionsMobile.push(
                        <Button
                            size='medium'
                            width='full'
                            type='secondary-gray'
                            disabled={unclaimingTicket}
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
                                    <IconFlipBackwards
                                        size='20'
                                        color='stroke-gray-700 dark:stroke-white'
                                        fill='fill-primary-700'
                                    />
                                )
                            }
                        />
                    );
                }
                ticketActions.push(
                    <Button
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
                        size='medium'
                        width='content'
                        type='primary'
                        disabled={openingTicket}
                        onclick={openTicket}
                        text={translations[language].re_open}
                        icon={
                            openingTicket ? (
                                <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />
                            ) : undefined
                        }
                    />
                );
                ticketActionsMobile.push(
                    <Button
                        size='medium'
                        width='full'
                        type='primary'
                        disabled={openingTicket}
                        onclick={openTicket}
                        text={translations[language].re_open}
                        icon={
                            openingTicket ? (
                                <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />
                            ) : undefined
                        }
                    />
                );
                break;
        }
    }

    if (user.role === "CustomerAdmin" || user.role === "CustomerEmployee") {
        if (ticket.status === "Open" || ticket.status === "InProgress") {
            ticketActions.push(
                <Button
                    size='medium'
                    width='content'
                    type='primary'
                    disabled={cancellingTicket}
                    onclick={cancelTicket}
                    text={translations[language].cancel_ticket}
                    icon={
                        cancellingTicket ? (
                            <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />
                        ) : undefined
                    }
                />
            );
            ticketActionsMobile.push(
                <Button
                    size='medium'
                    width='content'
                    type='primary'
                    disabled={cancellingTicket}
                    onclick={cancelTicket}
                    text={translations[language].cancel_ticket}
                    icon={
                        cancellingTicket ? (
                            <Spinner size='w-4 h-4' color='text-primary-500' fill='fill-white' />
                        ) : undefined
                    }
                />
            );
        }
    }

    return (
        <>
            <div className='gap-3 hidden lg:flex'>{ticketActions}</div>
            <div className='gap-3 flex lg:hidden flex-col-reverse mt-3'>{ticketActionsMobile}</div>
        </>
    );
};
