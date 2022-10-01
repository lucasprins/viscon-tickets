import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes';

function App() {

	return (
		<>
			<Router>
				<Routes>
					{/* <Route path='/login' element={<Login />} />

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
					<Route path='*' element={<PageNotFound />} /> */}
					{routes.map(({ path, component }, key) => (
						<Route 
							path={path} 
							key={key} 
							element={component} 
						/>	
					))}
				</Routes>
			</Router>
		</>
	);
}

export default App;
