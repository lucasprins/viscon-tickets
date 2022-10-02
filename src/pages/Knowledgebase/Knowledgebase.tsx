import React from 'react';
import Layout from '../../components/Layout/Layout';
import MachineSolutionList from './MachineSolutionList';

export function Knowledgebase() {

	return (
		
		<div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			
			<div >
			</div>
			
			<div>
				<div>
					
				</div>

				<div> 
					<MachineSolutionList /> 
					{/* MachineSOlutionList will be called when User selects a machine. The choice the User made will be given with the function */}
				</div>
					
			</div>
				
		</div>
	);
}
