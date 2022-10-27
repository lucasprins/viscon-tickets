import React from "react";
import { claimTicketAsync, getClaimingTicket } from "../../../features/tickets/ticketsSlice";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { ticketType, userType } from "../../../utils/types";
import { Button } from "../../atoms/Button/Button";
import { IconFlipBackwards, IconCheck, IconFileSearch } from "../../atoms/Icons/Icons";

var translations = require("../../../translations/ticketTranslations.json");

export const TicketActions = ({ user, ticket}: { user: userType, ticket: ticketType}) => {
    const language = useAppSelector(getCurrentLanguage);
    const dispatch = useAppDispatch();
    
    const claimingTicket = useAppSelector(getClaimingTicket);

    const claimTicket = () => {
        console.log(ticket.id);
        dispatch(claimTicketAsync({ ticketId: ticket.id, accessToken: user.accessToken }));
        console.log("Claiming ticket");
    }

    let ticketActions: JSX.Element[] = [];
    let ticketActionsMobile: JSX.Element[] = [];
    switch (user?.role) {
        case "VisconAdmin":
            switch (ticket.status) {
                case "Open":
                    ticketActions.push( <Button size='medium' width='content' type='primary' disabled={claimingTicket} onclick={claimTicket} text={translations[language].claim_ticket} /> );
                    ticketActionsMobile.push( <Button size='medium' width='full' type='primary' disabled={claimingTicket} onclick={claimTicket} text={translations[language].claim_ticket} /> );
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
            ticketActionsMobile.push( <Button size='medium' width='full' type='secondary-gray' text={translations[language].view_files} icon={<IconFileSearch size='20' color='stroke-gray-700 dark:stroke-white' fill='fill-gray-700' />} /> );
            break;

        case "VisconEmployee":
            switch (ticket.status) {
                case "Open":
                    ticketActions.push( <Button size='medium' width='content' type='primary' disabled={claimingTicket} onclick={claimTicket} text={translations[language].claim_ticket} /> );
                    ticketActionsMobile.push( <Button size='medium' width='full' type='primary' disabled={claimingTicket} onclick={claimTicket} text={translations[language].claim_ticket} /> );
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
                <Button size='medium' width='full' type='secondary-gray' text={translations[language].view_files} icon={<IconFileSearch size='20' color='stroke-gray-700 dark:stroke-white' fill='fill-gray-700' />} />
            );
            break;

        case "CustomerAdmin":
            if (ticket.status === "Open" || ticket.status === "InProgress") {
                ticketActions.push(
                    <Button size='medium' width='content' type='primary' text={translations[language].cancel_ticket} />
                );
                ticketActionsMobile.push(
                    <Button size='medium' width='content' type='primary' text={translations[language].cancel_ticket} />
                );
            }
            ticketActionsMobile.push(
                <Button size='medium' width='full' type='secondary-gray' text={translations[language].view_files } icon={<IconFileSearch size='20' color='stroke-gray-700 dark:stroke-white' fill='fill-gray-700' />} />
            );
            break;

        case "CustomerEmployee":
            if (ticket.status === "Open" || ticket.status === "InProgress") {
                ticketActions.push( <Button size='medium' width='content' type='primary' text={translations[language].cancel_ticket} /> );
                ticketActionsMobile.push(
                    <Button size='medium' width='content' type='primary' text={translations[language].cancel_ticket} />
                );
            }
            ticketActionsMobile.push(
                <Button size='medium' width='full' type='secondary-gray' text={translations[language].view_files} icon={<IconFileSearch size='20' color='stroke-gray-700 dark:stroke-white' fill='fill-gray-700' />} />
            );
            break;
    }

    return (
        <>
            <div className='gap-3 hidden lg:flex'>{ticketActions}</div>
            <div className='gap-3 flex lg:hidden flex-col mt-3'>{ticketActionsMobile}</div>
        </>
    )
};
