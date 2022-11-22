import { Tab } from "@headlessui/react";
import { Formik, Form } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { validatePhoneNumber } from "../../../utils/input-validation";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { Button } from "../../atoms/Button/Button";
import { IconBuilding, IconPhone, IconPlus } from "../../atoms/Icons/Icons";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";
import { InputSearch } from "../../atoms/Input/InputSearch";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import Layout from "../../organisms/Layout/Layout";
import AdminCompanies from "./AdminCompanies";

const Admin = () => {

  return (
    <div className='flex flex-col h-screen bg-gray-50 md:flex-row dark:bg-dark-800 dark:text-white'>
      <Layout />
      <div className='flex flex-col w-full gap-8 p-6 overflow-y-scroll lg:p-8'>
        <Breadcrumbs crumbs={["Admin"]} />
        <div className='flex flex-col w-full gap-6'>
          {/* Page Header & Actions */}
          <div className='flex flex-col justify-between gap-4 sm:flex-row'>
            <PageHeader title='Admin' />
            <Button
              size='medium'
              width='content'
              type='secondary-gray'
              text='Add a company'
              url='/knowledgebase/create-ticket'
              icon={<IconPlus size='20' color='stroke-gray-700 dark:stroke-white' fill='' />}
            />
          </div>

          {/* Tabs */}
          <div>
            <Tab.Group>
              <Tab.List className='flex w-full gap-6 border-b-2 border-gray-200 outline-none 2xl:gap-8 no-scrollbar'>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected
                          ? "text-primary-600 border-b-2 border-primary-600 font-semibold -mb-0.5 px pb-3 outline-none"
                          : "text-gray-500 border-b-2 font-semibold px pb-3 -mb-0.5 outline-none"
                      }
                    >
                      Companies
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected
                          ? "text-primary-600 border-b-2 border-primary-600 font-semibold px pb-3 -mb-0.5 outline-none"
                          : "text-gray-500 border-b-2 font-semibold px pb-3 -mb-0.5 outline-none"
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
                          ? "text-primary-600 border-b-2 border-primary-600 font-semibold px pb-3 -mb-0.5 outline-none"
                          : "text-gray-500 border-b-2 font-semibold px pb-3 -mb-0.5 outline-none"
                      }
                    >
                      Solutions
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected
                          ? "text-primary-600 border-b-2 border-primary-600 font-semibold px pb-3 -mb-0.5 outline-none"
                          : "text-gray-500 border-b-2 font-semibold px pb-3 -mb-0.5 outline-none"
                      }
                    >
                      Users
                    </button>
                  )}
                </Tab>
              </Tab.List>

              <Tab.Panels>
                {/* Companies Tab */}
                <AdminCompanies />
                
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
