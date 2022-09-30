import React, { useState } from 'react';
import { NavigationMobile } from '../../components/Navigation/NavigationMobile';
import { NavigationSidebar } from '../../components/Navigation/NavigationSidebar';

export function Dashboard() {

  return (
    <div className='flex flex-col md:flex-row'>
      <NavigationMobile />
      <NavigationSidebar />
      <h1>Dashboard</h1>
    </div>
  );
}
