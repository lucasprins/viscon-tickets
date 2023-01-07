import { Tab } from "@headlessui/react";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import MachineService from "../../../features/machines/machinesService";
import { useAppContext, useModalContext } from "../../../utils/hooks";
import { MachineType } from "../../../utils/types";
import { Button } from "../../atoms/Button/Button";
import { InputSearch } from "../../atoms/Input/InputSearch";
import ModalAddMachine from "../../organisms/Modal/ModalAddMachine";
import AdminMachinesTable from "./Tables/AdminMachinesTable";

var translations = require("../../../translations/allTranslations.json");

const AdminMachines = () => {
  const { appState } = useAppContext();
  const { modalDispatch } = useModalContext();

  const user = appState.user;
  const language = appState.language;

  const [queryMachine, setQueryMachine] = useState<string>("");

  const [modalStates, setModalStates] = useState({
    addMachine: false,
    editMachine: false,
  });

  const toggleAddMachineModal = () => {
    setModalStates({
      ...modalStates,
      addMachine: !modalStates.addMachine,
    });
    modalDispatch({ type: "TOGGLE_BACKDROP" });
  };

  const [machines, setMachines] = useState<MachineType[]>();
  const [machinesFiltered, setMachinesFiltered] = useState<MachineType[]>();

  const [selectedMachine, setSelectedMachine] = useState<MachineType>();

  const cancelTokenMachines = axios.CancelToken;
  const sourceMachines = cancelTokenMachines.source();

  const fetchMachines = async () => {
    const response = await MachineService.getAllMachines(sourceMachines.token);
    if (response.data.success) {
      setMachines(response.data.data);
      setMachinesFiltered(response.data.data);
    }
  };

  const handleRowClickMachine = (id: string) => {
    const selectedMachine = machines?.find((machine) => machine.id === id);
    setSelectedMachine(selectedMachine);
    if (window.innerWidth < 1024) {
      document.getElementById("machine-detail")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchMachines();

    return () => {
      sourceMachines.cancel();
    };
  }, []);

  useEffect(() => {
    if (queryMachine === "") {
      setMachinesFiltered(machines);
    } else {
      setMachinesFiltered(
        machines?.filter((machine) => machine.type.toLowerCase().includes(queryMachine.toLowerCase()))
      );
    }
  }, [queryMachine, machines]);

  if(user?.role !== "VisconAdmin") {
    return <Navigate to="access-denied" />
  }

  return (
    <Tab.Panel>
      <ModalAddMachine state={modalStates.addMachine} onClose={toggleAddMachineModal} setMachines={setMachines} />

      {/* Split Div */}
      <div className='flex flex-col lg:grid lg:grid-cols-2'>
        {/* Left Side */}
        <div className='box-border flex flex-col w-full gap-6 py-8 border-gray-200 dark:border-dark-600 lg:pr-8 lg:border-r-2 '>
          {/* Search */}
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
              onclick={toggleAddMachineModal}
            />
          </div>
          {machinesFiltered !== undefined ? (
            <AdminMachinesTable handleRowClick={handleRowClickMachine} machines={machinesFiltered} />
          ) : undefined}
        </div>

        {/* Right Side */}
        <div id='machine-detail' className='box-border flex flex-col w-full gap-6 py-8 lg:pl-8'>
          {selectedMachine !== undefined ? (
            <>
              <div className='flex items-center justify-between gap-4'>
                <h4 className='text-lg font-semibold text-gray-800 dark:text-white'>{selectedMachine.type}</h4>
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
                        Companies
                      </button>
                    )}
                  </Tab>
                  {/* <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={
                          selected
                            ? "text-primary-600 text-sm border-b-2 border-primary-600 font-semibold px pb-3 -mb-0.5 outline-none"
                            : "text-gray-500 text-sm dark:text-dark-300 dark:border-dark-600 border-b-2 font-semibold px pb-3 -mb-0.5 outline-none"
                        }
                      >
                        Solutions
                      </button>
                    )}
                  </Tab> */}
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
                      </div>
                    </div>
                  </Tab.Panel>

                  {/* Solutions Tab */}
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

export default AdminMachines;
