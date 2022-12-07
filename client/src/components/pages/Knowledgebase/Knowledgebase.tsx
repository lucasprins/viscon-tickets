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

var translations = require("../../../translations/allTranslations.json");

export function Knowledgebase() {
  const { appState, appDispatch } = useAppContext();

  const language = appState.language;
  const user = appState.user;

  const [loading, setLoading] = useState<boolean>(true);
  const [machines, setMachines] = useState<MachineType[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<MachineType>();
  const [selectedIssue, setSelectedIssue] = useState<IssueType>();

  let cancelToken = axios.CancelToken;
  let source = cancelToken.source();

  const fetchAllMachines = async () => {
    setLoading(true);
    const response = await MachineService.getAllMachines(source.token);
    console.log(response);
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

  useEffect(() => {
    console.log(selectedIssue);
  }, [selectedIssue]);

  const handleChange = (payload: MachineType) => {
    setSelectedMachine(payload);
    setSelectedIssue(undefined);
  };

  if (!useAuthentication()) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='flex flex-col overflow-x-hidden md:flex-row md:h-screen dark:bg-dark-800 dark:text-white bg-gray-50'>
      <Layout />

      {/* Main Page */}
      <div className='flex flex-col w-full gap-8 p-8 overflow-y-scroll'>
        <Breadcrumbs crumbs={["Tickets"]} />
        <div className='flex flex-col w-full gap-6'>
          <div className='flex flex-col justify-between gap-4 sm:flex-row'>
            <PageHeader title={translations[language].knowledgebase} />
            {user?.role !== "VisconAdmin" && user?.role !== "VisconEmployee" && (
              <Button
                size='medium'
                width='content'
                type='secondary-gray'
                text={translations[language].create_ticket}
                url='/knowledgebase/create-ticket'
                icon={<IconPlus size='20' color='stroke-gray-700 dark:stroke-white' fill='' />}
              />
            )}
          </div>
          <div>
            <hr className='w-full h-0.5 bg-gray-200'></hr>
            {/* Split Div */}
            <div className='flex flex-col lg:grid lg:grid-cols-2'>
              {/* Left Side */}
              <div className='box-border flex flex-col w-full gap-6 py-8 border-gray-200 dark:border-dark-600 lg:pr-8 lg:border-r-2 '>
                {/* Search */}
                {machines != undefined && selectedMachine !== undefined ? (
                  <>
                    <InputDropdown
                      label={translations[language].machines}
                      options={machines}
                      selectedOption={selectedMachine}
                      selectedKey={"type"}
                      onchange={handleChange}
                      identifier={"id"}
                    />
                    <Divider />
                    <KnowledgebaseIssuesList selectedMachine={selectedMachine} setSelectedIssue={setSelectedIssue} />
                  </>
                ) : (
                  <div className='flex items-center justify-center w-full h-96'>
                    <Spinner size='w-16 h-16' color='text-gray-200 dark:text-dark-600' fill='fill-primary-600' />
                  </div>
                )}
                <div className='flex flex-col w-full gap-3 xl:flex xl:flex-row'></div>
              </div>

              {/* Right Side */}
              <div id='company-detail' className='box-border flex flex-col w-full gap-6 py-8 lg:pl-8'>
                {selectedIssue !== undefined && <MachineSolutionsList selectedIssue={selectedIssue} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className='flex items-center justify-center w-full h-96'>
              <Spinner size='w-16 h-16' color='text-gray-200 dark:text-dark-600' fill='fill-primary-600' />
            </div> */
}
