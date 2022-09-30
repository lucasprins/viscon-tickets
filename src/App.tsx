import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { AccessDenied } from './pages/AccessDenied/AccessDenied';
import { Knowledgebase } from './pages/Knowledgebase/Knowledgebase';
import { Login } from './pages/Login/Login';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import { Playground } from './pages/Playground/Playground';
import { Tickets } from './pages/Tickets/Tickets';
import { Ticket } from './pages/Ticket/Ticket';
import { CreateTicket } from './pages/CreateTicket/CreateTicket';
import { Notifications } from './pages/Notifications/Notifications';
import { Account } from './pages/Account/Account';

function App() {

	return (
		<>
			<Router>
				<Routes>
					<Route path='/login' element={<Login />} />

					<Route path='/' element={<Dashboard />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/tickets' element={<Tickets />} />
					<Route path='/tickets/:ticketID' element={<Ticket />} />
					<Route path='/create-ticket' element={<CreateTicket />} />
					<Route path='/knowledgebase' element={<Knowledgebase />} />

					<Route path='/playground' element={<Playground />} />
					<Route path='/notifications' element={<Notifications />} />
					<Route path='/account' element={<Account />} />

					<Route path='/access-denied' element={<AccessDenied />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
