import { Tab } from "@headlessui/react";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { getUser } from "../../../features/auth/authSlice";
import CompanyService from "../../../features/customers/companyService";
import { useAppSelector } from "../../../utils/hooks";
import { companyType } from "../../../utils/types";
import { Button } from "../../atoms/Button/Button";
import { InputSearch } from "../../atoms/Input/InputSearch";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { AdminCompaniesTable } from "./AdminCompaniesTable";

const AdminCompanies = () => {
  const user = useAppSelector(getUser);
  const accessToken = user?.accessToken || "";

  const [queryCompany, setQueryCompany] = useState<string>("");
  const [queryMachine, setQueryMachine] = useState<string>("");
  const [queryUser, setQueryUser] = useState<string>("");

  const [selectedCompany, setSelectedCompany] = useState<companyType>();

  const [companies, setCompanies] = useState<companyType[]>();
  const [filteredCompanies, setFilteredCompanies] = useState<companyType[]>();

  let cancelTokenCompanies = axios.CancelToken;
  let sourceCompanies = cancelTokenCompanies.source();

  const fetchCompanies = async () => {
    const response = await CompanyService.getAllCompanies(accessToken, sourceCompanies.token);
    if (response.data.success) {
      setCompanies(response.data.data);
      setFilteredCompanies(response.data.data);
    }
  };

  const handleRowClick = (id: string) => {
    const selectedCompany = companies?.find((company) => company.id === id);
    setSelectedCompany(selectedCompany);
  }

  useEffect(() => {
    if (queryCompany === "") {
      setFilteredCompanies(companies);
    } else {
      setFilteredCompanies(
        companies?.filter((company) => company.name.toLowerCase().includes(queryCompany.toLowerCase()))
      );
    }
  }, [queryCompany]);

  useEffect(() => {
    fetchCompanies();

    return () => {
      sourceCompanies.cancel();
    };
  }, []);

  return (
    <Tab.Panel>
      {/* Split Div */}
      <div className='flex flex-col h-full lg:grid lg:grid-cols-2'>
        {/* Left Side */}
        <div className='box-border flex flex-col w-full gap-6 py-8 pr-8 border-gray-200 lg:border-r '>
          {/* Search */}
          <InputSearch value={queryCompany} placeholder='Search' onChange={(e) => setQueryCompany(e.target.value)} />
          {filteredCompanies !== undefined ? (
            <AdminCompaniesTable companies={filteredCompanies} handleRowClick={handleRowClick} />
          ) : (
            <div className='flex items-center justify-center w-full mt-8 mb-8'>
              <Spinner size='w-16 h-16' color='text-gray-200 dark:text-dark-600' fill='fill-primary-600' />
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className='box-border flex flex-col w-full gap-6 py-8 lg:pl-8'>
          {selectedCompany !== undefined ? (
            <>
              <div className='flex flex-col justify-between gap-4 2xl:items-center 2xl:flex-row'>
                <h4 className='text-lg font-semibold text-gray-800'>{selectedCompany.name}</h4>
                <div className='flex gap-4 2xl:flex-row-reverse'>
                  <Button size='small' width='content' type='secondary-gray' text='Add machine' />
                  <Button size='small' width='content' type='tertiary-gray' text='Deactivate' />
                </div>
              </div>

              <Tab.Group>
                <Tab.List className='flex w-full gap-6 border-b-2 border-gray-200 outline-none 2xl:gap-8 no-scrollbar'>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={
                          selected
                            ? "text-primary-600 text-sm border-b-2 border-primary-600 font-semibold -mb-0.5 px pb-3 outline-none"
                            : "text-gray-500 text-sm border-b-2 font-semibold px pb-3 -mb-0.5 outline-none"
                        }
                      >
                        Machines
                      </button>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={
                          selected
                            ? "text-primary-600 text-sm border-b-2 border-primary-600 font-semibold px pb-3 -mb-0.5 outline-none"
                            : "text-gray-500 text-sm border-b-2 font-semibold px pb-3 -mb-0.5 outline-none"
                        }
                      >
                        Users
                      </button>
                    )}
                  </Tab>
                </Tab.List>

                <Tab.Panels>
                  {/* Machines Tab */}
                  <Tab.Panel>
                    <div className='flex flex-col gap-6'>
                      <InputSearch
                        value={queryMachine}
                        placeholder='Search'
                        onChange={(e) => setQueryMachine(e.target.value)}
                      />
                    </div>
                  </Tab.Panel>

                  {/* Users Tab */}
                  <Tab.Panel>
                    <div className='flex flex-col gap-6'>
                      <InputSearch
                        value={queryUser}
                        placeholder='Search'
                        onChange={(e) => setQueryUser(e.target.value)}
                      />
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Tab.Panel>
  );
};

export default AdminCompanies;
