import React from 'react';
import Layout from '../../components/Layout/Layout';

export function Playground() {

	return (
		<div className='flex flex-col md:flex-row dark:bg-dark-900 dark:text-white'>
			<Layout />
			<h1>Playground</h1>
		</div>
	);
}
