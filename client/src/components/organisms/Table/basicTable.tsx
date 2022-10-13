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
            Header: "name_Machine",
            accessor: "name_Machine",
        },
    ];

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderGroupProps}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps}>
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

// https://stackoverflow.com/questions/70411733/react-table-typescript-type-is-not-assignable
