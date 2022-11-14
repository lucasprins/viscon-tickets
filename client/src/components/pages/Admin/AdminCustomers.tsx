import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../../../features/auth/authSlice";
import CompanyService from "../../../features/customers/companyService";
import { useAppSelector } from "../../../utils/hooks";
import { companyType } from "../../../utils/types";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { Button } from "../../atoms/Button/Button";
import CompanyCard from "../../atoms/Company/CompanyCard";
import { Divider } from "../../atoms/Divider/Divider";
import { IconPlus } from "../../atoms/Icons/Icons";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import Layout from "../../organisms/Layout/Layout";

export function AdminCompanies() {
  const currentUser = useAppSelector(getUser);
  const accessToken = currentUser?.accessToken || "";

  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<companyType[]>([]);

  let cancelToken = axios.CancelToken;
  let source = cancelToken.source();

  const fetchCompanies = async () => {
    const response = await CompanyService.getAllCompanies(accessToken, source.token);
    if (response.data.success) {
      setCompanies(response.data.data);
    }
    setLoading(false);
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
    <div className='flex flex-col h-screen md:flex-row dark:bg-dark-800 dark:text-white'>
      <Layout />
      <div className='p-6 w-full flex flex-col gap-8 overflow-y-scroll'>
        <Breadcrumbs crumbs={["Admin", "Companies"]} />
        <div className='flex flex-col gap-6 w-full'>
          <div className='flex flex-col sm:flex-row gap-4 justify-between'>
            <PageHeader title='Companies' />
            <Button
              size='medium'
              width='content'
              type='secondary-gray'
              text='Add a company'
              icon={<IconPlus size='20' color='stroke-gray-700 dark:stroke-white' fill='' />}
            />
          </div>
          <Divider />
          <div className='grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
            {loading ? <p>Loading...</p> : companies.map((company) => <CompanyCard company={company} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
