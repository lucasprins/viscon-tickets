import React from 'react';
import { useAppContext, useAppSelector } from '../../../utils/hooks';
import { MachineType, SolutionType } from '../../../utils/types';
import { Tag } from '../../atoms/Tag/Tag';

var translations = require('../../../translations/allTranslations.json');

type MachineSolutionProps = {
	solution: SolutionType,
	machine: MachineType
}

export function MachineSolution({ solution, machine }: MachineSolutionProps) {
	const language = useAppContext().appState.language;
	
	return (
		<div className='flex flex-col w-full gap-4 p-5 bg-white border border-gray-200 border-solid dark:bg-dark-700 dark:border-dark-600 rounded-xl drop-shadow-sm dark:text-white'>
			<div className='flex flex-col gap-y-1'>
				<h3 className='font-medium text-gray-800  dark:text-white'>{solution.issue}</h3>
				<p className='text-gray-600  dark:text-dark-300'>{solution.solution}</p>
			</div>

			{/* Tags */}
			<div className='hidden gap-x-3 xl:flex'>
				<Tag text={machine.type} />
				<Tag text={`${translations[language].blueprint_number}: ${machine.blueprintNumber}`} />
			</div>
		</div>
	)
}