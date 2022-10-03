import React from 'react';

type MachineSolutionProps = {
	issue: string,
	solution: string,
	machine_name: string,
	machine_blueprint: string
}

export function MachineSolution({ issue, solution, machine_name, machine_blueprint }: MachineSolutionProps) {
	return (
		<div className='p-5 flex flex-col gap-4 bg-white dark:bg-dark-700 dark:border-dark-500 border-solid border border-gray-100 rounded-xl drop-shadow-sm w-full dark:text-white'>
			<div className='flex flex-col gap-y-1'>
				<h3 className=' text-gray-800 dark:text-white font-medium'>{issue}</h3>
				<p className=' text-gray-600 dark:text-dark-300'>{solution}</p>
			</div>

			{/* Tags */}
			<div className='flex gap-3'>
			</div>
		</div>
	)
}