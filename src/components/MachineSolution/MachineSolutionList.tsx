import React, { useState } from 'react';
import { MachineSolution } from './MachineSolution';
import { MachineType } from '../../types/MachineType';

// useStates worden vervangen met useSelector wanneer we Redux+Api hebben

export function MachineSolutionList() {
	const [ language, setLanguage ] = useState('nl;'); // Dit gaan we later dynamisch maken met Redux
	const [ selectedMachine, setSelectedMachine ] = useState<MachineType>({ machine_id: '1', name: 'Satteliet shuttle', blueprint_number: '52525', type: 'Satteliet shuttle' });

	const solutions = [
		{ solution_id: '1', machine_id: '1', issue: 'Product verkeerd op machine', solution: 'Fotocellen controleren. Eventueel product handmatig op juiste positie plaatsen', language: 'nl' },
		{ solution_id: '2', machine_id: '1', issue: 'Satelliet verkeer op machine', solution: 'Fotocellen controleren. Eventueel product handmatig op juiste positie plaatsen', language: 'nl' },
		{ solution_id: '3', machine_id: '1', issue: 'Geen verbinding met satelliet', solution: 'Controleren of satelliet aan staat. Als deze in het kanaal staat een opgeladen moet worden, opladen met oplaadkabel en in handbediening terugzetten op de shuttle ', language: 'nl' },
		{ solution_id: '4', machine_id: '1', issue: 'Niet veilig om te bewegen', solution: 'De pallet steekt uit op de shuttle of een andere pallet op een baan aan het shuttle pad. Draai de pallet handmatig op de juiste positie', language: 'nl' },
		{ solution_id: '5', machine_id: '2', issue: 'Laden/lossen duurt te lang', solution: 'Waarschijnlijk staat de pallet klem. Zorg dat deze weer goed staat, reset de baan en de shuttle en voer recovery uit in VLC', language: 'nl' },
		{ solution_id: '6', machine_id: '2', issue: 'Niet veilig om te bewegen', solution: 'De pallet steekt uit op de shuttle of een andere pallet op een baan aan het shuttle pad. Draai de pallet handmatig op de juiste positie', language: 'nl' },
	];

	// -> We moeten ergens de solutions filteren op language en op de meegegeven prop: machine_id 
	// -> We willen alleen de solutions van een bepaalde machine natuurlijk
	const filteredSolutions = solutions.filter(item =>
		item.machine_id === selectedMachine.machine_id
	);

	return (
		<div className='flex flex-col gap-6 w-full' >
			{filteredSolutions.map(({ issue, solution }) => (
				<MachineSolution issue={issue} solution={solution} machine_name={selectedMachine.name} machine_blueprint={selectedMachine.blueprint_number} />
			))}
		</div>
	)
}
