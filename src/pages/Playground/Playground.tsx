import React, { useState } from 'react';
import { NavigationSidebar } from '../../components/Navigation/NavigationSidebar';

export function Playground() {

  return (
    <div className='flex'>
      <NavigationSidebar />
      <h1>Playground</h1>
    </div>
  );
}
