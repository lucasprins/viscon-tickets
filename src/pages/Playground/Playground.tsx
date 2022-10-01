import React from 'react';
import { IconUser } from '../../components/Icons/IconUser';
import Layout from '../../components/Layout/Layout';

export function Playground() {

	return (
		<div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
			<Layout />
			<h1>Playground</h1>
		</div>
	);
}
