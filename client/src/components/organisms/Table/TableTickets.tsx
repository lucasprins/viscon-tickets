import React, { useMemo } from "react";
import MOCK_DATA from "./MOCK_DATA.json";
import {
    Column,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    Table as ReactTable,
} from "@tanstack/react-table";
import { Badge } from "../../atoms/Badge/Badge";
import { IconAlert, IconCheck, IconStopwatch } from "../../atoms/Icons/Icons";
import { useAppSelector } from "../../../utils/hooks";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { Button } from "../../atoms/Button/Button";

type TicketsTableType = {
    id: number;
    time_of_year: string;
    status_ticket: string;
    name_Customer: string;
    name_Company: string;
    name_Machine: string;
};

var translations = require("../../../translations/ticketsTranslations.json");

export function TableTickets() {
    const language = useAppSelector(getCurrentLanguage);
    // createColumnHelper is a function from Tanstack that helps creating collection of headers
    const columnHelper = createColumnHelper<TicketsTableType>();

    const columnsNonMemo = [
        columnHelper.accessor("id", {
            cell: (info) => {
                return <span className='text-gray-900 dark:text-white font-medium'>#{info.getValue()}</span>;
            },
            header: "Ticket ID",
        }),
        columnHelper.accessor("time_of_year", {
            id: "Date",
            cell: (info) => {
                return <span className='text-gray-600 dark:text-white'>{info.getValue()}</span>;
            },
            header: "Date",
        }),
        columnHelper.accessor("status_ticket", {
            header: "Status", //Could also be written as: header: info => info.column.id,
            cell: (props: { getValue: () => any }) => {
                switch (props.getValue()) {
                    case "Open":
                        return (
                            <div className='flex'>
                                <Badge size='md' color='error' text='Open' />
                            </div>
                        );
                    case "Resolved":
                        return (
                            <div className='flex'>
                                <Badge size='md' color='success' text='Resolved' />
                            </div>
                        );
                    case "In progress":
                        return (
                            <div className='flex'>
                                <Badge size='md' color='gray' text='In progress' />
                            </div>
                        );
                }
            },

            // footer: info => info.column.id,
        }),
        columnHelper.accessor("name_Customer", {
            header: "Customer",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("name_Company", {
            header: "Status",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("name_Machine", {
            header: "Profile Progress",
            cell: (info) => info.getValue(),
        }),
    ];

    const columns = useMemo(() => columnsNonMemo, []);
    const data = useMemo(() => MOCK_DATA, []);

    //const [data, setData] = React.useState(() => [...dataMemo]);
    // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    //   []
    // );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    // This needs to be turned into a function to click through the table included something to click on
    //const firstPageRow = table.getRowModel().rows.slice(0, 10); // Get the first 10 rows of the first page
    return (
        <div className='w-full rounded-xl border border-gray-200 bg-white dark:bg-dark-800 dark:border-dark-600 drop-shadow-sm'>
            <table className='min-w-full w-full divide-y divide-gray-200 dark:divide-dark-600'>
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
                            key={row.id}
                            className='odd:bg-gray-50 even:bg-white dark:odd:bg-dark-700 dark:even:bg-dark-800 border-b border-gray-200 dark:border-dark-600'
                        >
                            {row.getVisibleCells().map((cell) => (
                                //CSS for the individual cells
                                <td key={cell.id} className='px-6 py-4 text-sm'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot className='w-full min-w-full'>
                    {/* {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id} className=''>
                            {footerGroup.headers.map((header) => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.footer, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))} */}
                </tfoot>
            </table>
            <div className='w-full min-w-full flex items-center justify-between py-3 px-4'>
                <Button
                    size='small'
                    width='content'
                    type='secondary-gray'
                    text='Previous'
                    onclick={() => table.previousPage()}
                />
                <span className='text-sm text-gray-700 font-medium dark:text-dark-300'>
                    {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <Button
                    size='small'
                    width='content'
                    type='secondary-gray'
                    text='Next'
                    onclick={() => table.nextPage()}
                />
            </div>
        </div>
    );
}
