import React from "react";
import {
    claimTicketAsync,
    getClaimingTicket,
    getUnclaimingTicket,
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
    const resolvingTicket = false;

    const claimTicket = () => {
        console.log(ticket.id);
        dispatch(claimTicketAsync({ ticketId: ticket.id, accessToken: user.accessToken }));
        console.log("Claiming ticket");
    };

    const unclaimTicket = () => {
        dispatch(unclaimTicketAsync({ ticketId: ticket.id, accessToken: user.accessToken }));
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

    if (user.role === "VisconAdmin" || "VisconEmployee") {
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
                                    <Spinner size='w-4 h-4' color='text-gray-200 dark:text-dark-600' fill='fill-gray-700 dark:fill-white' />
                                ) : <IconFlipBackwards
                                size='20'
                                color='stroke-gray-700 dark:stroke-white'
                                fill='fill-primary-700'
                            />
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
                                    <Spinner size='w-4 h-4' color='text-gray-200 dark:text-dark-600' fill='fill-gray-700 dark:fill-white' />
                                ) : <IconFlipBackwards
                                size='20'
                                color='stroke-gray-700 dark:stroke-white'
                                fill='fill-primary-700'
                            />
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
                        icon={<IconCheck size='20' color='stroke-white' fill='fill-white' />}
                    />
                );
                ticketActionsMobile.push(
                    <Button
                        size='medium'
                        width='full'
                        type='primary'
                        text={translations[language].resolve}
                        disabled={unclaimingTicket || resolvingTicket}
                        icon={<IconCheck size='20' color='stroke-white' fill='fill-white' />}
                    />
                );
                break;
            case "Resolved":
                ticketActions.push(
                    <Button size='medium' width='content' type='primary' text={translations[language].re_open} />
                );
                ticketActionsMobile.push(
                    <Button size='medium' width='full' type='primary' text={translations[language].re_open} />
                );
                break;
        }
    }

    if (user.role === "CustomerAdmin") {
        if (ticket.status === "Open" || ticket.status === "InProgress") {
            ticketActions.push(
                <Button size='medium' width='content' type='primary' text={translations[language].cancel_ticket} />
            );
            ticketActionsMobile.push(
                <Button size='medium' width='content' type='primary' text={translations[language].cancel_ticket} />
            );
        }
    }

    if (user.role === "CustomerEmployee") {
        if (ticket.status === "Open" || ticket.status === "InProgress") {
            ticketActions.push(
                <Button size='medium' width='content' type='primary' text={translations[language].cancel_ticket} />
            );
            ticketActionsMobile.push(
                <Button size='medium' width='content' type='primary' text={translations[language].cancel_ticket} />
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
