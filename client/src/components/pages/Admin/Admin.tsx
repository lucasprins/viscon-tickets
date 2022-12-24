import { Tab } from "@headlessui/react";
import { Formik, Form } from "formik";
import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext, useAuthentication } from "../../../utils/hooks";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import Layout from "../../organisms/Layout/Layout";
import AdminCompanies from "./AdminCompanies";
import AdminMachines from "./AdminMachines";

var translations = require("../../../translations/allTranslations.json");

const Admin = () => {
  const { appState } = useAppContext();

  const language = appState.language;
  const user = appState.user;

  if (!useAuthentication()) {
    return <Navigate to='/login' />;
  }

  if(user?.role !== "VisconAdmin" && user?.role !== "CustomerAdmin") {
    return <Navigate to="access-denied" />
  }

  return (
    <div className='flex flex-col h-screen bg-gray-50 md:flex-row dark:bg-dark-800 dark:text-white'>
      <Layout />
      <div className='flex flex-col w-full gap-8 px-6 pt-6 overflow-y-scroll lg:px-8 lg:pt-8'>
        <Breadcrumbs crumbs={["Admin"]} />
        <div className='flex flex-col w-full gap-6'>
          {/* Page Header & Actions */}
          <div className='flex flex-col justify-between gap-4 sm:flex-row'>
            <PageHeader title={translations[language].admin} />
          </div>

          {/* Tabs */}
          <div>
            <Tab.Group>
              <div className='overflow-x-scroll no-scrollbar'>
                <Tab.List className='flex w-full gap-6 border-b-2 border-gray-200 outline-none dark:border-dark-600 2xl:gap-8 no-scrollbar'>
                  {user?.role === "VisconAdmin" && (
                    <>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              selected
                                ? "text-primary-600 border-b-2 border-primary-600 font-semibold -mb-0.5 px pb-3 outline-none"
                                : "text-gray-500 dark:text-dark-300 dark:border-dark-600 border-b-2 font-semibold px pb-3 -mb-0.5 outline-none"
                            }
                          >
                            {translations[language].companies}
                          </button>
                        )}
                      </Tab>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              selected
                                ? "text-primary-600 border-b-2 border-primary-600 font-semibold px pb-3 -mb-0.5 outline-none"
                                : "text-gray-500 dark:text-dark-300 dark:border-dark-600 border-b-2 font-semibold px pb-3 -mb-0.5 outline-none"
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
                                ? "text-primary-600 border-b-2 border-primary-600 font-semibold px pb-3 -mb-0.5 outline-none"
                                : "text-gray-500 dark:text-dark-300 dark:border-dark-600 border-b-2 font-semibold px pb-3 -mb-0.5 outline-none"
                            }
                          >
                            {translations[language].issues}
                          </button>
                        )}
                      </Tab>
                    </>
                  )}
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={
                          selected
                            ? "text-primary-600 border-b-2 border-primary-600 font-semibold px pb-3 -mb-0.5 outline-none"
                            : "text-gray-500 dark:text-dark-300 dark:border-dark-600 border-b-2 font-semibold px pb-3 -mb-0.5 outline-none"
                        }
                      >
                        {translations[language].users}
                      </button>
            
                      
                    )}
                  </Tab>
                </Tab.List>
              </div>

              <Tab.Panels>
                {user?.role === "VisconAdmin" && (
                  <>
                    {/* Companies Tab */}
                    <AdminCompanies />
                    {/* Machines Tab */}
                    <AdminMachines />
                    {/* Issues Tab */}
                    <Tab.Panel>Issues</Tab.Panel>
                  </>
                )}
                <Tab.Panel>Users</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
