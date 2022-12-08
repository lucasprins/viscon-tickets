import { Tab } from "@headlessui/react";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import CompanyService from "../../../features/customers/companyService";
import MachineService from "../../../features/machines/machinesService";
import { toggleBackdrop } from "../../../features/modal/modalSlice";
import { useAppContext, useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { CompanyMachineJoined, companyType } from "../../../utils/types";
import { Button } from "../../atoms/Button/Button";
import { InputSearch } from "../../atoms/Input/InputSearch";
import { Spinner } from "../../atoms/Spinner/Spinner";
import ModalAddCompany from "../../organisms/Modal/ModalAddCompany";
import ModalAddCompanyMachine from "../../organisms/Modal/ModalAddCompanyMachine";
import { AdminCompaniesMachinesTable } from "./Tables/AdminCompaniesMachinesTable";
import { AdminCompaniesTable } from "./Tables/AdminCompaniesTable";

var translations = require("../../../translations/allTranslations.json");

const AdminCompanies = () => {
  const { appState } = useAppContext();

  const user = appState.user;
  const dispatch = useAppDispatch();
  const language = appState.language;

  const [queryCompany, setQueryCompany] = useState<string>("");
  const [queryMachine, setQueryMachine] = useState<string>("");
  const [queryUser, setQueryUser] = useState<string>("");

  const [modalStates, setModalStates] = useState({
    addCompany: false,
    addCompanyMachine: false,
    editCompany: false,
    deactivateCompany: false,
  });

  const toggleAddCompanyModal = () => {
    setModalStates({
      ...modalStates,
      addCompany: !modalStates.addCompany,
    });
    dispatch(toggleBackdrop());
  };

  const toggleAddCompanyMachineModal = () => {
    setModalStates({
      ...modalStates,
      addCompanyMachine: !modalStates.addCompanyMachine,
    });
    dispatch(toggleBackdrop());
  };

  const [deactivatingCompany, setDeactivatingCompany] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<companyType>();
  const [companies, setCompanies] = useState<companyType[]>();
  const [filteredCompanies, setFilteredCompanies] = useState<companyType[]>();

  const [companyMachines, setCompanyMachines] = useState<CompanyMachineJoined[]>();
  const [filteredCompanyMachines, setFilteredCompanyMachines] = useState<CompanyMachineJoined[]>();

  let cancelTokenCompanies = axios.CancelToken;
  let sourceCompanies = cancelTokenCompanies.source();
  let cancelTokenCompanyMachines = axios.CancelToken;
  let sourceCompanyMachines = cancelTokenCompanyMachines.source();

  const fetchCompanies = async () => {
    const response = await CompanyService.getAllCompanies(sourceCompanies.token);
    if (response.data.success) {
      setCompanies(response.data.data);
      setFilteredCompanies(response.data.data);
    }
  };

  const fetchCompanyMachinesJoined = async (selectedCompany: companyType) => {
    console.table(selectedCompany);
    const response = await MachineService.getCompanyMachinesJoined(sourceCompanyMachines.token, selectedCompany.id);
    console.log(response.data);
    if (response.data.success) {
      setCompanyMachines(response.data.data);
      setFilteredCompanyMachines(response.data.data);
    }
  };

  const handleToggleCompanyStatus = async () => {
    if (selectedCompany) {
      setDeactivatingCompany(true);
      const response = await CompanyService.toggleCompanyStatus(selectedCompany.id);
      if (response.data.success) {
        setCompanies(response.data.data);
        setFilteredCompanies(response.data.data);
        setSelectedCompany(response.data.data.find((company: companyType) => company.id === selectedCompany.id));
      }
      setDeactivatingCompany(false);
    }
  };

  const handleRowClickCompany = (id: string) => {
    const selectedCompany = companies?.find((company) => company.id === id);
    setSelectedCompany(selectedCompany);
    if (window.innerWidth < 1024) {
      document.getElementById("company-detail")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (queryCompany === "") {
      setFilteredCompanies(companies);
    } else {
      setFilteredCompanies(
        companies?.filter((company) => company.name.toLowerCase().includes(queryCompany.toLowerCase()))
      );
    }
  }, [queryCompany, companies]);

  useEffect(() => {
    if (queryMachine === "") {
      setFilteredCompanyMachines(companyMachines);
    } else {
      setFilteredCompanyMachines(
        companyMachines?.filter((machine) => machine.name.toLowerCase().includes(queryMachine.toLowerCase()))
      );
    }
  }, [queryMachine, companyMachines]);

  useEffect(() => {
    fetchCompanies();

    return () => {
      sourceCompanies.cancel();
    };
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      fetchCompanyMachinesJoined(selectedCompany);
    }

    return () => {
      sourceCompanyMachines.cancel();
    };
  }, [selectedCompany]);

  return (
    <Tab.Panel>
      <ModalAddCompany setCompanies={setCompanies} state={modalStates.addCompany} onClose={toggleAddCompanyModal} />
      {selectedCompany && (
        <ModalAddCompanyMachine
          state={modalStates.addCompanyMachine}
          company={selectedCompany}
          onClose={toggleAddCompanyMachineModal}
          setCompanyMachines={setCompanyMachines}
        />
      )}

      {/* Split Div */}
      <div className='flex flex-col lg:grid lg:grid-cols-2'>
        {/* Left Side */}
        <div className='box-border flex flex-col w-full gap-6 py-8 border-gray-200 dark:border-dark-600 lg:pr-8 lg:border-r-2 '>
          {/* Search */}{" "}
          <div className='flex flex-col w-full gap-3 xl:flex xl:flex-row'>
            <div className='w-full'>
              <InputSearch
                value={queryCompany}
                placeholder={translations[language].search}
                onChange={(e) => setQueryCompany(e.target.value)}
              />
            </div>
            <Button
              size='medium'
              width='content'
              type='secondary-gray'
              text={translations[language].addCompany}
              onclick={toggleAddCompanyModal}
            />
          </div>
          {filteredCompanies !== undefined ? (
            <AdminCompaniesTable companies={filteredCompanies} handleRowClick={handleRowClickCompany} />
          ) : (
            <div className='flex items-center justify-center w-full mt-8 mb-8'>
              <Spinner size='w-16 h-16' color='text-gray-200 dark:text-dark-600' fill='fill-primary-600' />
            </div>
          )}
        </div>

        {/* Right Side */}
        <div id='company-detail' className='box-border flex flex-col w-full gap-6 py-8 lg:pl-8'>
          {selectedCompany !== undefined ? (
            <>
              <div className='flex items-center justify-between gap-4'>
                <h4 className='text-lg font-semibold text-gray-800 dark:text-white'>{selectedCompany.name}</h4>
                <Button
                  size='small'
                  width='content'
                  type='tertiary-gray'
                  text={selectedCompany.isActive ? translations[language].deactivate : translations[language].activate}
                  onclick={handleToggleCompanyStatus}
                />
              </div>

              <Tab.Group>
                <Tab.List className='flex w-full gap-6 border-b-2 border-gray-200 outline-none dark:border-dark-600 2xl:gap-8 no-scrollbar'>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={
                          selected
                            ? "text-primary-600 text-sm border-b-2 border-primary-600 font-semibold px pb-3 -mb-0.5 outline-none"
                            : "text-gray-500 text-sm dark:text-dark-300 dark:border-dark-600 border-b-2 font-semibold px pb-3 -mb-0.5 outline-none"
                        }
                      >
                        {translations[language].machines}
                      </button>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={
                          selected
                            ? "text-primary-600 text-sm border-b-2 border-primary-600 font-semibold px pb-3 -mb-0.5 outline-none"
                            : "text-gray-500 text-sm dark:text-dark-300 dark:border-dark-600 border-b-2 font-semibold px pb-3 -mb-0.5 outline-none"
                        }
                      >
                        {translations[language].users}
                      </button>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={
                          selected
                            ? "text-primary-600 text-sm border-b-2 border-primary-600 font-semibold px pb-3 -mb-0.5 outline-none"
                            : "text-gray-500 text-sm dark:text-dark-300 dark:border-dark-600 border-b-2 font-semibold px pb-3 -mb-0.5 outline-none"
                        }
                      >
                        {translations[language].tickets}
                      </button>
                    )}
                  </Tab>
                </Tab.List>

                <Tab.Panels>
                  {/* Machines Tab */}
                  <Tab.Panel>
                    <div className='flex flex-col items-end gap-6'>
                      <div className='flex flex-col w-full gap-3 xl:flex xl:flex-row'>
                        <div className='w-full'>
                          <InputSearch
                            value={queryMachine}
                            placeholder={translations[language].search}
                            onChange={(e) => setQueryMachine(e.target.value)}
                          />
                        </div>
                        <Button
                          size='medium'
                          width='content'
                          type='secondary-gray'
                          text={translations[language].addMachine}
                          onclick={() => toggleAddCompanyMachineModal()}
                        />
                      </div>
                      {filteredCompanyMachines !== undefined ? (
                        <AdminCompaniesMachinesTable companyMachines={filteredCompanyMachines} />
                      ) : (
                        <div className='flex items-center justify-center w-full mt-8 mb-8'>
                          <Spinner size='w-16 h-16' color='text-gray-200 dark:text-dark-600' fill='fill-primary-600' />
                        </div>
                      )}
                    </div>
                  </Tab.Panel>

                  {/* Users Tab */}
                  <Tab.Panel>
                    <div className='flex flex-col gap-6'>
                      <InputSearch
                        value={queryUser}
                        placeholder={translations[language].search}
                        onChange={(e) => setQueryUser(e.target.value)}
                      />
                    </div>
                  </Tab.Panel>

                  {/* Tickets Tab */}
                  <Tab.Panel>
                    <div className='flex flex-col gap-6'></div>
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
