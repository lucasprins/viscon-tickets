import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavigationSidebar } from '../../components/Navigation/NavigationSidebar';

export function Ticket() {
  // Get the ticketID from the URL.
  const { ticketID } = useParams();

  return (
    <div className='flex'>
      <NavigationSidebar />
      <h1>Ticket: {ticketID}</h1>
    </div>
  );
}
