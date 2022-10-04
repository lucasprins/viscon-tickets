import React from 'react';

type MachineSolutionProps = {
	issue: string,
	solution: string,
	machine_name: string,
	machine_blueprint: string,
	tag: string
}

export function MachineSolution({ issue, solution, machine_name, machine_blueprint, tag }: MachineSolutionProps) {
	return (
		<div className='p-5 flex flex-col gap-4 bg-white dark:bg-dark-700 dark:border-dark-500 border-solid border border-gray-100 rounded-xl drop-shadow-sm w-full dark:text-white'>
			<div className='flex flex-col gap-y-1'>
				<h3 className=' text-gray-800 dark:text-white font-medium'>{issue}</h3>
				<p className=' text-gray-600 dark:text-dark-300'>{solution}</p>
			</div>

			{/* Tags */}
			<div className='flex row gap-x-3'>
				<div className='px-2 py-0.5 gap-x-0.5 bg-white border-solid border border-gray-300 rounded-md'>
					<p className=' text-gray-700 text-sm font-medium'>{tag}</p>
				</div>
				<div className='px-2 py-0.5 gap-x-0.5 bg-white border-solid border border-gray-300 rounded-md'>
					<p className=' text-gray-700 text-sm font-medium'>{tag}</p>
				</div>	
			</div>
		</div>
	)
}