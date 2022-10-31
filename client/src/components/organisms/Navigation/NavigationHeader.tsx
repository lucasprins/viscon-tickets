import React from 'react'

var logo = require("../../../assets/viscon-logo.png");

export const NavigationHeader = () => {
    return (
        <div className='flex items-center gap-3'>
            <div className='bg-primary-600 rounded-lg p-2'>
                <img width="24" src={logo} alt="viscon-logo" />
            </div>
            <h2 className='text-lg text-gray-900 font-semibold dark:font-medium dark:text-white'>Viscon Tickets</h2>
        </div>
    )
}
