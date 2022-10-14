import React from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { TicketType } from "../../../utils/types";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { AvatarCard } from "../../atoms/Cards/AvatarCard";
import { Divider } from "../../atoms/Divider/Divider";
import { IconFlag } from "../../atoms/Icons/IconsFlags";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import Layout from "../../organisms/Layout/Layout";

var tickets = require("../../../features/tickets/tickets.json");

export function Ticket() {
    const dispatch = useAppDispatch();

    const { ticketID }: any = useParams();
    const user = useAppSelector(getUser);
    const ticket: TicketType = tickets.filter((ticket: TicketType) => ticket.ticketNumber === ticketID)[0];

    const ticketActions = [];
    console.log(ticket);

    return (
        <div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
            <Layout />
            <div className='p-8 flex flex-col gap-6 w-full'>
                <div className='flex flex-col gap-5 w-full'>
                    <Breadcrumbs crumbs={["Tickets", `Ticket ${ticketID}`]} />
                    <PageHeader title={`Ticket #${ticketID}`} />
                    <Divider />
                </div>
                {/* Ticket assignee */}
                <div className='flex gap-4'>
                    <div className="flex flex-col gap-2 w-full">
						<span className="text-md text-gray-700 font-medium">Creator</span>
                        <AvatarCard
                            title={`${ticket.customerEmployee.firstName} ${ticket.customerEmployee.preposition} ${ticket.customerEmployee.lastName}`}
                            subtitle={ticket.phoneNumber}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
					<span className="text-md text-gray-700 font-medium">Company</span>
                        <AvatarCard
                            title={ticket.customerEmployee.company.name}
                            subtitle={ticket.customerEmployee.company.country}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
