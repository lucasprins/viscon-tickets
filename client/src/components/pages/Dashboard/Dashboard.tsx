import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../../App";
import { useAppContext } from "../../../utils/hooks";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import Layout from "../../organisms/Layout/Layout";

export function Dashboard() {
  const { appState } = useAppContext();

  if (!appState.isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
      <Layout />
      <div className='p-8'>
        <Breadcrumbs crumbs={["Dashboard"]} />
        {appState.language}
      </div>
    </div>
  );
}
