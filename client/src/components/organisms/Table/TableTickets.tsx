import React, { useMemo, useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    Table as ReactTable,
} from "@tanstack/react-table";
import { Badge } from "../../atoms/Badge/Badge";
import { IconAlert } from "../../atoms/Icons/Icons";
import { useAppSelector } from "../../../utils/hooks";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { Button } from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import { ticketType } from "../../../utils/types";
import { EmptyState } from "../../molecules/EmptyState/EmptyState";
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { InputDropdown } from "../../atoms/Input/InputDropdown";

interface TicketsTableType {
    id: string;
    company: string;
    creationDate: string;
    creator: string;
    ticketNumber: string;
    machineName: string;
    status: string;
}

type TableTicketsProps = {
    tickets: ticketType[];
    nextPage: () => void;
    previousPage: () => void;
    page: number;
    pages: number;

    statusFilter: { value: string; label: string };
    statusFilterOptions: { value: string; label: string }[];
    handleChangeStatusFilter: (payload: any) => void;
};

var translations = require("../../../translations/ticketsTranslations.json");

export function TableTickets({
    tickets,
    nextPage,
    previousPage,
    page,
    pages,
    statusFilter,
    statusFilterOptions,
    handleChangeStatusFilter,
}: TableTicketsProps) {
    const language = useAppSelector(getCurrentLanguage);
    const navigate = useNavigate();
    let tableTickets: TicketsTableType[] = [];

    tickets.forEach((ticket) => {
        tableTickets.push({
            id: ticket.id,
            ticketNumber: ticket.ticketNumber.toString(),
            creationDate: ticket.creationDate,
            status: ticket.status,
            creator: ticket.creator.firstName + " " + ticket.creator.lastName,
            company: ticket.company.name,
            machineName: ticket.machineName,
        });
    });

    // createColumnHelper is a function from Tanstack that helps creating collection of headers
    const columnHelper = createColumnHelper<TicketsTableType>();

    const columnsNonMemo = [
        columnHelper.accessor("ticketNumber", {
            cell: (props) => {
                return <span className='text-gray-900 dark:text-white font-medium'>#{props.getValue()}</span>;
            },
            header: "Ticket ID",
        }),
        columnHelper.accessor("creationDate", {
            id: "Date",
            cell: (props) => {
                return (
                    <span className='text-gray-600 dark:text-dark-300'>
                        {new Date(props.getValue()).toLocaleDateString()}
                    </span>
                );
            },
            header: "Date",
        }),
        columnHelper.accessor("status", {
            header: "Status", //Could also be written as: header: info => info.column.id,
            cell: (props: { getValue: () => any }) => {
                switch (props.getValue()) {
                    case "Open":
                        return <Badge size='md' color='error' text='Open' />;
                    case "Resolved":
                        return <Badge size='md' color='gray' text='Resolved' />;
                    case "InProgress":
                        return <Badge size='md' color='primary' text='In progress' />;
                    case "Cancelled":
                        return <Badge size='md' color='gray' text={translations[language].cancelled} />;
                }
            },
        }),
        columnHelper.accessor("creator", {
            header: "Customer",
            cell: (props) => {
                return (
                    <div className='flex flex-col'>
                        <span className='text-gray-900 dark:text-white'>{props.getValue()}</span>
                        <span className='text-gray-600 dark:text-dark-300'>{props.row.original.company}</span>
                    </div>
                );
            },
        }),
        columnHelper.accessor("machineName", {
            header: "Machine",
            cell: (props) => {
                return <span className='text-gray-600 dark:text-dark-300'>{props.getValue()}</span>;
            },
        }),
    ];

    const columns = useMemo(() => columnsNonMemo, []);
    const data = useMemo(() => tableTickets, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className='w-full rounded-xl border border-gray-200 bg-white dark:bg-dark-800 dark:border-dark-600 drop-shadow-sm'>
            {tickets.length > 0 ? (
                <>
                    {/* Filters */}
                    <div className='flex w-full px-5 py-3'>
                        <div className=" w-72">
                            <InputDropdown
                                label='Status'
                                options={statusFilterOptions}
                                selectedOption={statusFilter}
                                selectedKey={"label"}
                                onchange={handleChangeStatusFilter}
                            />
                        </div>
                    </div>
                    <table className='min-w-full border-t border-gray-200 dark:border-dark-600 w-full divide-y divide-gray-200 dark:divide-dark-600'>
                        <thead className=''>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className='text-left'>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className='text-xs font-semibold text-gray-600 px-6 py-3 dark:text-white'
                                        >
                                            {header.isPlaceholder ? null : (
                                                <>{flexRender(header.column.columnDef.header, header.getContext())}</>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className=''>
                            {table.getRowModel().rows.map((row) => (
                                <tr
                                    onClick={() => navigate(`/tickets/${row.original.id}`)}
                                    key={row.id}
                                    className='odd:bg-gray-50 hover:odd:bg-gray-100 hover:even:bg-gray-100 cursor-pointer even:bg-white dark:odd:bg-dark-700 dark:even:bg-dark-800 dark:hover:odd:bg-dark-600 dark:hover:even:bg-dark-700 border-b border-gray-200 dark:border-dark-600'
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        //CSS for the individual cells
                                        <td key={cell.id} className='px-6 py-3.5 text-sm'>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='w-full min-w-full flex items-center justify-between py-3 px-4'>
                        <Button
                            size='small'
                            width='content'
                            type='secondary-gray'
                            text='Previous'
                            onclick={() => previousPage()}
                        />
                        <span className='text-sm text-gray-700 font-medium dark:text-dark-300'>
                            {`${page} of ${pages}`}
                        </span>
                        <Button
                            size='small'
                            width='content'
                            type='secondary-gray'
                            text='Next'
                            onclick={() => nextPage()}
                        />
                    </div>
                </>
            ) : (
                <div className='flex flex-col gap-6 w-full items-center justify-center p-8 lg:py-16'>
                    <EmptyState
                        color='primary'
                        title={translations[language].noTickets}
                        subtitle={translations[language].noTicketsText}
                        featuredIcon={
                            <FeaturedIcon
                                size='lg'
                                type='primary'
                                icon={<IconAlert size='20' fill='fill-primary-500' color='stroke-primary-500' />}
                            />
                        }
                    />
                    <div className='flex gap-4'>
                        <Button
                            size='small'
                            width='content'
                            type='secondary-gray'
                            text='Knowledgebase'
                            onclick={() => navigate("/knowledgebase")}
                        />
                        <Button
                            size='small'
                            width='content'
                            type='primary'
                            text='Create a ticket'
                            onclick={() => navigate("/knowledgebase/create-ticket")}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}