import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { InlineCTA } from "../../molecules/CTA/InlineCTA";
import { Divider } from "../../atoms/Divider/Divider";
import Layout from "../../organisms/Layout/Layout";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import { useAppContext, useAppSelector, useAuthentication } from "../../../utils/hooks";
import { Navigate } from "react-router-dom";
import { IssueType, MachineType } from "../../../utils/types";
import { InputDropdown } from "../../atoms/Input/InputDropdown";
import MachineService from "../../../features/machines/machinesService";
import axios from "axios";
import { Spinner } from "../../atoms/Spinner/Spinner";
import IssueService from "../../../services/issueService";
import { Button } from "../../atoms/Button/Button";
import { IconPlus } from "../../atoms/Icons/Icons";
import { KnowledgebaseIssuesList } from "../../molecules/MachineSolution/KnowledgebaseIssuesList";
import { MachineSolutionsList } from "../../molecules/MachineSolution/MachineSolutionsList";
import InputDropdownAutoComplete from "../../atoms/Input/InputDropdownAutoComplete";

var translations = require("../../../translations/allTranslations.json");

export function Knowledgebase() {
  const { appState, appDispatch } = useAppContext();

  const language = appState.language;
  const user = appState.user;
  const userRole = user?.role;

  const [loading, setLoading] = useState<boolean>(true);
  const [machines, setMachines] = useState<MachineType[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<MachineType>();
  const [selectedIssue, setSelectedIssue] = useState<IssueType>();

  let cancelToken = axios.CancelToken;
  let source = cancelToken.source();

  const fetchAllMachines = async () => {
    setLoading(true);
    const response = await MachineService.getAllMachines(source.token);
    if (response.data.success) {
      setMachines(response.data.data);
      setSelectedMachine(response.data.data[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllMachines();

    return () => {
      source.cancel();
    };
  }, []);

  const handleChange = (payload: MachineType) => {
    setSelectedMachine(payload);
    setSelectedIssue(undefined);
  };

  if (!useAuthentication()) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='flex flex-col overflow-x-hidden md:flex-row md:h-screen dark:bg-dark-800 dark:text-white'>
      <Layout />
      {/* Sidebar */}
      <div className='flex flex-col gap-4 px-6 pt-6 border-gray-200 lg:gap-6 lg:p-8 md:border-r dark:border-dark-600'>
        <PageHeader
          title={translations[language].knowledgebase}
          subtitle={translations[language].knowledgebase_subtitle}
        />
        <Divider />
        {selectedMachine ? (
          <InputDropdownAutoComplete
            label={translations[language].search_machine}
            options={machines}
            selectedOption={selectedMachine}
            selectedKey={"type"}
            onchange={handleChange}
            identifier={"type"}
          />
        ) : (
          <div className='flex items-center justify-center w-full mt-8 mb-8'>
            <Spinner size='w-16 h-16' color='text-gray-200 dark:text-dark-600' fill='fill-primary-600' />
          </div>
        )}
        {userRole !== "VisconAdmin" && userRole !== "VisconEmployee" ? (
          <InlineCTA
            title={translations[language].cant_find_solution_title}
            text={translations[language].cant_find_solution_text}
            url='/knowledgebase/create-ticket'
            button_text={translations[language].create_ticket}
            button_size='medium'
            button_type='primary'
          />
        ) : undefined}
      </div>
      {/* Solutions */}
      <div className='flex flex-col w-full gap-6 px-6 pb-6 bg-white md:bg-gray-50 dark:bg-dark-800 md:pt-6 lg:p-8'>
        <div className=''>
          <Breadcrumbs crumbs={[translations[language].knowledgebase]} />
        </div>
        <Divider />
        {loading ? (
          <div className='flex items-center justify-center w-full mt-8 mb-8'>
            <Spinner size='w-16 h-16' color='text-gray-200 dark:text-dark-600' fill='fill-primary-600' />
          </div>
        ) : (
          selectedMachine && <KnowledgebaseIssuesList selectedMachine={selectedMachine} />
        )}
      </div>
    </div>
  );
}

{
  /* <div className='flex items-center justify-center w-full h-96'>
              <Spinner size='w-16 h-16' color='text-gray-200 dark:text-dark-600' fill='fill-primary-600' />
            </div> */
}
