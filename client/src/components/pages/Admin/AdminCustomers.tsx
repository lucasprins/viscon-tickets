import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../../../features/auth/authSlice";
import CompanyService from "../../../features/customers/companyService";
import { toggleBackdrop } from "../../../features/modal/modalSlice";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { companyType } from "../../../utils/types";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { Button } from "../../atoms/Button/Button";
import CompanyCard from "../../atoms/Company/CompanyCard";
import { Divider } from "../../atoms/Divider/Divider";
import { IconPlus } from "../../atoms/Icons/Icons";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import Layout from "../../organisms/Layout/Layout";
import ModalAddCompany from "../../organisms/Modal/ModalAddCompany";

const translations = require("../../../translations/adminTranslations.json");

export function AdminCompanies() {
  const dispatch = useAppDispatch();
  const language = useAppSelector(getCurrentLanguage);
  const currentUser = useAppSelector(getUser);
  const accessToken = currentUser?.accessToken || "";

  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<companyType[]>([]);
  const [modalStates, setModalStates] = useState({
    addCompany: false,
    editCompany: false,
    deactivateCompany: false,
  });

  let cancelToken = axios.CancelToken;
  let source = cancelToken.source();

  const fetchCompanies = async () => {
    const response = await CompanyService.getAllCompanies(accessToken, source.token);
    if (response.data.success) {
      setCompanies(response.data.data);
    }
    setLoading(false);
  };

  const toggleAddCompanyModal = () => {
    setModalStates({
      ...modalStates,
      addCompany: !modalStates.addCompany,
    });
    dispatch(toggleBackdrop());
  };

  useEffect(() => {
    fetchCompanies();

    return () => {
      source.cancel();
    };
  }, []);

  if (currentUser) {
    if (currentUser.role !== "VisconAdmin") {
      return <Navigate to='/access-denied' />;
    }
  } else {
    return <Navigate to='/login' />;
  }

  return (
    <>
			<ModalAddCompany state={modalStates.addCompany} onClose={toggleAddCompanyModal} />

      <div className='flex flex-col h-screen md:flex-row dark:bg-dark-800 dark:text-white'>
        <Layout />
        <div className='flex flex-col w-full gap-8 p-6 overflow-y-scroll'>
          <Breadcrumbs crumbs={["Companies"]} />
          <div className='flex flex-col w-full gap-6'>
            <div className='flex flex-col justify-between gap-4 sm:flex-row'>
              <PageHeader title='Companies' />
              <Button
                size='medium'
                width='content'
                type='secondary-gray'
                text='Add a company'
                onclick={toggleAddCompanyModal}
                icon={<IconPlus size='20' color='stroke-gray-700 dark:stroke-white' fill='' />}
              />
            </div>
            <Divider />
            <div className='grid gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
              {loading ? <p>Loading...</p> : companies.map((company) => <CompanyCard key={company.id} company={company} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
