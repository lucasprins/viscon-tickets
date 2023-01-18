import { Tab } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import MachineService from "../../../features/machines/machinesService";
import IssueService from "../../../services/issueService";
import SolutionService from "../../../services/solutionService";
import { useAppContext, useModalContext } from "../../../utils/hooks";
import { IssueType, MachineType, SolutionType } from "../../../utils/types";
import { Button } from "../../atoms/Button/Button";
import InputDropdownAutoComplete from "../../atoms/Input/InputDropdownAutoComplete";
import { Spinner } from "../../atoms/Spinner/Spinner";
import ModalAddIssue from "../../organisms/Modal/ModalAddIssue";
import ModalAddMachine from "../../organisms/Modal/ModalAddMachine";
import ModalAddSolution from "../../organisms/Modal/ModalAddSolution";
import AdminIssuesTable from "./Tables/AdminIssuesTable";
import AdminSolutionsTable from "./Tables/AdminSolutionsTable";

var translations = require("../../../translations/allTranslations.json");

const AdminIssues = () => {
  const { appState } = useAppContext();
  const { modalDispatch } = useModalContext();

  const user = appState.user;
  const language = appState.language;

  const [modalStates, setModalStates] = useState({
    addIssue: false,
    addSolution: false,
  });

  const toggleAddIssueModal = () => {
    setModalStates({
      ...modalStates,
      addIssue: !modalStates.addIssue,
    });
    modalDispatch({ type: "TOGGLE_BACKDROP" });
  };

  const toggleAddSolutionModal = () => {
    setModalStates({
      ...modalStates,
      addSolution: !modalStates.addSolution,
    });
    modalDispatch({ type: "TOGGLE_BACKDROP" });
  };

  const [issues, setIssues] = useState<IssueType[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<IssueType>();
  const [machines, setMachines] = useState<MachineType[]>();
  const [selectedMachine, setSelectedMachine] = useState<MachineType>();
  const [solutions, setSolutions] = useState<SolutionType[]>();

  const cancelTokenMachines = axios.CancelToken;
  const sourceMachines = cancelTokenMachines.source();

  const fetchMachines = async () => {
    const response = await MachineService.getAllMachines(sourceMachines.token);
    if (response.data.success) {
      setMachines(response.data.data);
      setSelectedMachine(response.data.data[0]);
    }
  };

  let cancelToken = axios.CancelToken;
  let source = cancelToken.source();

  const fetchIssues = async (machine: MachineType) => {
    await IssueService.getIssues(machine.id, source.token).then((response) => {
      if (response.data.success) {
        setIssues(response.data.data);
      }
    });
  };

  const fetchSolutions = async (issue: IssueType) => {
    await SolutionService.getSolutions(issue.id, source.token).then((response) => {
      if (response.data.success) {
        setSolutions(response.data.data);
      }
    });
  };

  const handleRowClickIssue = (id: string) => {
    const selectedIssue = issues?.find((issue) => issue.id === id);
    setSelectedIssue(selectedIssue);
    if (window.innerWidth < 1024) {
      document.getElementById("machine-detail")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (payload: MachineType) => {
    setSelectedMachine(payload);
  };

  useEffect(() => {
    fetchMachines();

    return () => {
      sourceMachines.cancel();
    };
  }, []);

  useEffect(() => {
    if (selectedIssue) {
      fetchSolutions(selectedIssue);
    }
  }, [selectedIssue]);

  useEffect(() => {
    setSelectedIssue(undefined);
    if (selectedMachine) {
      fetchIssues(selectedMachine);
    }

    return () => {
      source.cancel();
    };
  }, [selectedMachine, machines]);

  if (user?.role !== "VisconAdmin") {
    return <Navigate to='access-denied' />;
  }

  return (
    <Tab.Panel>
      <ModalAddIssue state={modalStates.addIssue} onClose={toggleAddIssueModal} setIssues={setIssues} />
      {selectedIssue && (
        <ModalAddSolution
          issue={selectedIssue}
          state={modalStates.addSolution}
          onClose={toggleAddSolutionModal}
          setSolutions={setSolutions}
        />
      )}

      {/* Split Div */}
      <div className='flex flex-col lg:grid lg:grid-cols-2'>
        {/* Left Side */}
        <div className='box-border flex flex-col w-full gap-6 py-8 border-gray-200 dark:border-dark-600 lg:pr-8 lg:border-r-2 '>
          {/* Search */}
          <div className='flex flex-col w-full gap-3 xl:flex xl:flex-row'>
            <div className='w-full'>
              {selectedMachine && machines ? (
                <InputDropdownAutoComplete
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
            </div>
            <Button
              size='medium'
              width='content'
              type='secondary-gray'
              text={translations[language]["admin.issues.add-issue-button"]}
              onclick={toggleAddIssueModal}
            />
          </div>

          {issues && <AdminIssuesTable issues={issues} handleRowClick={handleRowClickIssue} />}
        </div>

        {/* Right Side */}
        <div id='machine-detail' className='box-border flex flex-col w-full gap-6 py-8 lg:pl-8'>
          {selectedIssue !== undefined ? (
            <>
              <div className='flex flex-col w-full gap-4'>
                <h4 className='text-lg font-semibold text-gray-800 truncate dark:text-white'>
                  {selectedIssue.description}
                </h4>
                <Button
                  size='medium'
                  width='content'
                  type='secondary-gray'
                  text={translations[language]["admin.issues.add-solution-button"]}
                  onclick={toggleAddSolutionModal}
                />
                {solutions && <AdminSolutionsTable solutions={solutions} />}
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Tab.Panel>
  );
};

export default AdminIssues;
