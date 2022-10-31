import React, { useMemo } from "react";
import { useTable, Column } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";



export const BasicTable = () => {
    const COLUMNS: Column<{
        id: number;
        time_of_year: string;
        status_ticket: string;
        name_Customer: string;
        name_Company: string;
        name_Machine: string;
    }>[] = [
        {
            Header: "Ticket ID",
            accessor: "id",
        },
        {
            Header: "Date",
            accessor: "time_of_year",
        },
        {
            Header: "Status",
            accessor: "status_ticket",
        },
        {
            Header: "Customer",
            accessor: "name_Customer",
        },
        {
            Header: "Company",
            accessor: "name_Company",
        },
        {
            Header: "Name Machine",
            accessor: "name_Machine",
        },
    ];

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
       <div>
        <div className="">
            
        </div>
        <table className='border border-gray-200 border-solid shadow-sm rounded-lg table-auto' {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps} className='border border-solid border-gray-200 shadow-sm rounded-lg'>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderGroupProps} className='text-xs text-gray-600 pb-3 pl-3 pt-3 pr-6 align-middle rounded-lg'>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()} className=''>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} className=''>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps} className='pb-4 pl-4 pt-4 pr-6 align-middle border-y border-gray-200 rounded-lg '>
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
    );
};

// https://stackoverflow.com/questions/70411733/react-table-typescript-type-is-not-assignable
