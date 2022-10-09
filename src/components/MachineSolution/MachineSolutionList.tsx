import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getSelectedMachine } from '../../features/machines/machinesSlice';
import { getSolutions } from '../../features/solutions/solutionsSlice';
import { SolutionType } from '../../types/SolutionType';
import { MachineSolution } from './MachineSolution';
import { getCurrentLanguage } from '../../features/user/userSlice';

export function MachineSolutionList() {
	const solutions = useAppSelector(getSolutions);
	const language = useAppSelector(getCurrentLanguage);

	const selectedMachine = useAppSelector(getSelectedMachine);

	const filteredSolutionsMachine = solutions.filter((solution: SolutionType) => solution.machine_id === selectedMachine.machine_id);
	const filteredSolutionsLanguage = filteredSolutionsMachine.filter((solution: SolutionType) => solution.language === language);

	return (
		<div className='flex flex-col h-min gap-6 w-full overflow-clip' >
			{filteredSolutionsLanguage.map((solution: SolutionType) => (
				<MachineSolution key={solution.solution_id} solution={solution} machine={selectedMachine} />
			))}
		</div>
	)
}
