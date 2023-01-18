import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  Table,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../../../../utils/hooks";
import { IssueType, MachineType } from "../../../../utils/types";
import { Badge } from "../../../atoms/Badge/Badge";
import { Button } from "../../../atoms/Button/Button";
import { FeaturedIcon } from "../../../atoms/Icons/FeaturedIcon";
import { IconAlert } from "../../../atoms/Icons/Icons";
import { EmptyState } from "../../../molecules/EmptyState/EmptyState";

interface Props {
  issues: IssueType[];
  handleRowClick: (id: string) => void;
}

var translations = require("../../../../translations/allTranslations.json");

function AdminIssuesTable({ issues: machines, handleRowClick }: Props) {
  const { appState } = useAppContext();
  const language = appState.language;

  const columnHelper = createColumnHelper<IssueType>();

  const columnNonMemo = [
    columnHelper.accessor("description", {
      cell: (props) => {
        return <span className='font-medium text-gray-900 dark:text-white'>{props.getValue()}</span>;
      },
      header: translations[language]["general.issue"],
    }),
  ];

  const columns = columnNonMemo;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = useMemo(() => machines, [machines]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleNextPage = (table: Table<IssueType>) => {
    if (table.getCanNextPage()) {
      table.nextPage();
    }
  };

  useEffect(() => {
    table.setPageSize(10);
  }, []);

  return (
    <div className='w-full bg-white border border-gray-200 rounded-xl dark:bg-dark-800 dark:border-dark-600 drop-shadow-sm'>
      {machines.length > 0 ? (
        <>
          <table className='w-full min-w-full divide-y divide-gray-200 dark:border-dark-600 dark:divide-dark-600'>
            <thead className=''>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className='text-left'>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className='px-6 py-3 text-xs font-semibold text-gray-600 dark:text-white'
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
                  onClick={() => handleRowClick(row.original.id)}
                  key={row.id}
                  className='border-b border-gray-200 cursor-pointer odd:bg-gray-50 hover:odd:bg-gray-100 hover:even:bg-gray-100 even:bg-white dark:odd:bg-dark-700 dark:even:bg-dark-800 dark:hover:odd:bg-dark-600 dark:hover:even:bg-dark-600 dark:border-dark-600'
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

          <div className='flex items-center justify-between w-full min-w-full px-4 py-3'>
            <Button
              size='small'
              width='content'
              type='secondary-gray'
              text={translations[language].previous}
              onclick={() => table.previousPage()}
            />
            <span className='text-sm font-medium text-gray-700 dark:text-dark-300'>{`${
              table.getState().pagination.pageIndex + 1
            } ${translations[language].of} ${table.getPageCount()}`}</span>
            <Button
              size='small'
              width='content'
              type='secondary-gray'
              text={translations[language].next}
              onclick={() => handleNextPage(table)}
            />
          </div>
        </>
      ) : (
        <div className='flex flex-col items-center justify-center w-full gap-6 p-8 lg:py-16'>
          <EmptyState
            color='primary'
            title={translations[language]["admin.issues.no-issues-found"]}
            subtitle={translations[language]["admin.issues.no-issues-found-subtitle"]}
            featuredIcon={
              <FeaturedIcon
                size='lg'
                type='primary'
                icon={<IconAlert size='20' fill='fill-primary-500' color='stroke-primary-500' />}
              />
            }
          />
        </div>
      )}
    </div>
  );
}

export default AdminIssuesTable;
