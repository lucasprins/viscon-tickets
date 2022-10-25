import * as React from 'react'
import ReactDOM from 'react-dom/client'
import MOCK_DATA from "./MOCK_DATA.json";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'
import { Badge } from '../../atoms/Badge/Badge';
import { IconAlert, IconCheck, IconClose, IconStopwatch } from '../../atoms/Icons/Icons';
import { Console } from 'console';
import { useAppSelector } from '../../../utils/hooks';
import { getCurrentLanguage } from '../../../features/user/userSlice';

type table = {
    id: number;
            time_of_year: string;
            status_ticket: string;
            name_Customer: string;
            name_Company: string;
            name_Machine: string;
}
const defaultData: table[] = MOCK_DATA

/*
const defaultData: table[] = [
{"id":1,"time_of_year":"10/02/2022","status_ticket":"Open","name_Customer":"Burmese black mountain tortoise","name_Company":"Ntag","name_Machine":"Dong Sung Pharm. Co., Ltd."},
{"id":2,"time_of_year":"19/02/2022","status_ticket":"Resolved","name_Customer":"Crake, african black","name_Company":"Tagcat","name_Machine":"Physicians Total Care, Inc."},
{"id":3,"time_of_year":"19/03/2022","status_ticket":"Open","name_Customer":"Turtle, long-necked","name_Company":"Skinte","name_Machine":"Nelco Laboratories, Inc."},
]
*/
//{translations[language].}
var translations = require('../../../translations/ticketsTable.json');

export function Knowledgebase() {
	const language = useAppSelector(getCurrentLanguage);
}

const columnHelper = createColumnHelper<table>()

const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    header: "Ticket ID"
  //  footer: info => info.column.id,
  }),
  columnHelper.accessor("time_of_year", {
    id: 'Date',
    cell: info => info.getValue(),
    header: 'Date',
  //  footer: info => info.column.id,
  }),
  columnHelper.accessor('status_ticket', {
    header: 'Status',
    cell: props => 
    {
        switch (props.getValue()) {
            
            case "Open":
                return(
                    <Badge
                        size='md'
                        color='error'
                        text='Open'
                        icon={<IconAlert size='14' fill='fill-error-500' color='stroke-error-500' />}
                    />
                )
                break;
        
            case "Resolved":
                return(
                    <Badge
                    size='md'
                    color='success'
                    text='Resolved'
                    icon={<IconCheck size='14' fill='fill-error-500' color='stroke-success-500' />}
                    />
                )
                break;
            case "In progress":
                return(
                    <Badge
                    size='md'
                    color='gray'
                    text='In progress'
                    icon={<IconStopwatch size='14' fill='fill-error-500' color='stroke-gray-500' />}
                    />
                )
                break;
        }}
        

   // footer: info => info.column.id,
  }),
  columnHelper.accessor('name_Customer', {
    header: 'Customer',
    cell: info => info.getValue(),
   //    footer: info => info.column.id,
  }),
  columnHelper.accessor('name_Company', {
    header: 'Status',
    cell: info => info.getValue(),
   // footer: info => info.column.id,
  }),
  columnHelper.accessor('name_Machine', {
    header: 'Profile Progress',
    cell: info => info.getValue(),
   // footer: info => info.column.id,
  }),
]

export function AppTable() {
  const [data, setData] = React.useState(() => [...defaultData])
  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const firstPageRow = table.getRowModel().rows.slice(0, 10)
  return (
    <div className="p-2">
      <table className='border border-gray-200 border-solid shadow-sm rounded-full'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}  className='border border-solid border-gray-200 shadow-sm rounded-lg'>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='text-xs text-gray-600 pb-3 pl-3 pt-3 pr-6 align-middle rounded-lg text-left '>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {firstPageRow.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='pb-4 pl-4 pt-4 pr-6 align-middle border-y border-gray-200 rounded-lg '>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>

      </table>
      <div className="h-4" />
    </div>
  )
}
