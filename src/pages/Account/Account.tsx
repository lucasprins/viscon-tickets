import React, { useState } from 'react';
import { NavigationSidebar } from '../../components/Navigation/NavigationSidebar';

export function Account() {

  return (
    <div className='flex'>
        <NavigationSidebar />
        <h1>Account</h1>
    </div>
  );
}
