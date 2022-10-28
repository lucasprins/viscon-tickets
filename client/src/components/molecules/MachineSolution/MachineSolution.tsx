import React from 'react';
import { getCurrentLanguage } from '../../../features/user/userSlice';
import { useAppSelector } from '../../../utils/hooks';
import { MachineType, SolutionType } from '../../../utils/types';
import { Tag } from '../../atoms/Tag/Tag';

var translations = require('../../../translations/knowledgebaseTranslations.json');

type MachineSolutionProps = {
	solution: SolutionType,
	machine: MachineType
}

export function MachineSolution({ solution, machine }: MachineSolutionProps) {
	const language = useAppSelector(getCurrentLanguage);
	
	return (
		<div className='p-5 flex flex-col gap-4 bg-white dark:bg-dark-700 dark:border-dark-600 border-solid border border-gray-200 rounded-xl w-full drop-shadow-sm dark:text-white'>
			<div className='flex flex-col gap-y-1'>
				<h3 className=' text-gray-800 dark:text-white font-medium'>{solution.issue}</h3>
				<p className=' text-gray-600 dark:text-dark-300'>{solution.solution}</p>
			</div>

			{/* Tags */}
			<div className='hidden gap-x-3 xl:flex'>
				<Tag text={machine.type} />
				<Tag text={`${translations[language].blueprint_number}: ${machine.blueprintNumber}`} />
			</div>
		</div>
	)
}