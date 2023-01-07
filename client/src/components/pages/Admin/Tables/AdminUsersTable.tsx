import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  Table,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useAppContext, useWindowMobile } from "../../../../utils/hooks";
import { companyType, userType } from "../../../../utils/types";
import { Badge } from "../../../atoms/Badge/Badge";
import { Button } from "../../../atoms/Button/Button";
import { FeaturedIcon } from "../../../atoms/Icons/FeaturedIcon";
import { IconAlert, IconClose, IconDemote, IconLock, IconPromote, IconUnlock } from "../../../atoms/Icons/Icons";
import { EmptyState } from "../../../molecules/EmptyState/EmptyState";

interface Props {
  users: userType[];
  toggleStatus: (userId: string) => void;
  handleRoleChange: (userId: string) => void;
}

var translations = require("../../../../translations/allTranslations.json");

export function AdminUsersTable({ users, toggleStatus, handleRoleChange }: Props) {
  const { appState } = useAppContext();
  const language = appState.language;

  const columnHelper = createColumnHelper<userType>();

  const columnNonMemo = [
    columnHelper.accessor("firstName", {
      cell: (props) => {
        return (
          <span className='font-medium text-gray-900 dark:text-white'>
            {props.getValue()} {props.row.original.lastName}
          </span>
        );
      },
      header: translations[language].name,
    }),
    columnHelper.accessor("email", {
      cell: (props) => {
        return <span className='font-medium text-gray-500 dark:text-white'>{props.getValue()}</span>;
      },
      header: translations[language].name,
    }),
    columnHelper.accessor("isActive", {
      header: translations[language].status,
      cell: (props) => {
        if (props.getValue()) {
          return <Badge size='md' color='primary' text='Active' />;
        } else {
          return <Badge size='md' color='gray' text='Inactive' />;
        }
      },
    }),
    columnHelper.accessor("role", {
      cell: (props) => {
        const role = props.getValue();
        if (role === "VisconAdmin" || role == "CustomerAdmin") {
          return <Badge size='md' color='primary' text='Admin' />;
        } else {
          return <Badge size='md' color='gray' text='Default' />;
        }
      },
      header: translations[language]["general.role"],
    }),
  ];

  const columnNonMemoSmall = [
    columnHelper.accessor("firstName", {
      cell: (props) => {
        return (
          <span className='font-medium text-gray-900 dark:text-white'>
            {props.getValue()} {props.row.original.lastName}
          </span>
        );
      },
      header: translations[language].name,
    }),
    columnHelper.accessor("isActive", {
      header: translations[language].status,
      cell: (props) => {
        if (props.getValue()) {
          return <Badge size='md' color='primary' text='Active' />;
        } else {
          return <Badge size='md' color='gray' text='Inactive' />;
        }
      },
    }),
  ];

  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  window.addEventListener("resize", handleResize);

  useEffect(() => {
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const columns = isMobile ? columnNonMemoSmall : columnNonMemo;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = users;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleNextPage = (table: Table<userType>) => {
    if (table.getCanNextPage()) {
      table.nextPage();
    }
  };

  useEffect(() => {
    table.setPageSize(10);
  }, []);

  return (
    <div className='w-full bg-white border border-gray-200 rounded-xl dark:bg-dark-800 dark:border-dark-600 drop-shadow-sm'>
      {users.length > 0 ? (
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
                  key={row.id}
                  className='border-b border-gray-200 cursor-pointer odd:bg-gray-50 hover:odd:bg-gray-100 hover:even:bg-gray-100 even:bg-white dark:odd:bg-dark-700 dark:even:bg-dark-800 dark:hover:odd:bg-dark-600 dark:hover:even:bg-dark-600 dark:border-dark-600'
                >
                  {row.getVisibleCells().map((cell) => (
                    //CSS for the individual cells
                    <td key={cell.id} className='px-6 py-3.5 text-sm'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                  {!isMobile && (
                    <td className='py-3.5 px-3 text-sm flex gap-4 items-center'>
                      <div onClick={() => handleRoleChange(row.original.id)} className='relative flex justify-center group'>
                        {row.original.role == "VisconAdmin" || row.original.role == "CustomerAdmin" ? (
                          <IconDemote
                            size='18'
                            fill=''
                            color='stroke-gray-400 group-hover:stroke-gray-800 dark:stroke-dark-400 dark:group-hover:stroke-white'
                          />
                        ) : (
                          <IconPromote
                            size='18'
                            fill=''
                            color='stroke-gray-400 group-hover:stroke-gray-800 dark:stroke-dark-400 dark:group-hover:stroke-white'
                          />
                        )}
                        <div className='absolute px-2 py-1 text-white transition-all duration-300 rounded-md opacity-0 pointer-events-none bottom-6 dark:bg-dark-500 bg-dark-600 w-max group-hover:opacity-100'>
                          {row.original.role == "VisconAdmin" || row.original.role == "CustomerAdmin"
                            ? translations[language]["admin.users.demote-user"]
                            : translations[language]["admin.users.promote-user"]}
                        </div>
                      </div>
                      <div onClick={() => toggleStatus(row.original.id)} className='relative flex justify-center group'>
                        {row.original.isActive ? (
                          <IconLock
                            size='18'
                            fill=''
                            color='stroke-gray-400 group-hover:stroke-gray-800 dark:stroke-dark-400 dark:group-hover:stroke-white'
                          />
                        ) : (
                          <IconUnlock
                            size='18'
                            fill=''
                            color='stroke-gray-400 group-hover:stroke-gray-800 dark:stroke-dark-400 dark:group-hover:stroke-white'
                          />
                        )}
                        <div className='absolute px-2 py-1 text-white transition-all duration-300 rounded-md opacity-0 pointer-events-none bottom-6 dark:bg-dark-500 bg-dark-600 w-max group-hover:opacity-100'>
                          {row.original.isActive
                            ? translations[language]["admin.users.deactivate-user"]
                            : translations[language]["admin.users.activate-user"]}
                        </div>
                      </div>
                    </td>
                  )}
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
            title={translations[language]["admin.users.no-users-found"]}
            subtitle={translations[language]["admin.users.no-users-found-subtitle"]}
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
