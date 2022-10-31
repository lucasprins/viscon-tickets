import { Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../../features/auth/authSlice";
import { fetchTicketsAsync, getTickets, resetTickets } from "../../../features/tickets/ticketsSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { InputDropdown } from "../../atoms/Input/InputDropdown";
import Layout from "../../organisms/Layout/Layout";
import { TableTickets } from "../../organisms/Table/TableTickets";

export const Playground = () => {

    const options = [
        { name: "All", value: "all" },
        { name: "Open", value: "open" },
        { name: "Closed", value: "closed" },
    ];

    const [selected, setSelected] = useState(options[0]);

    const handleChange= (payload: any) => {
        setSelected(payload);
    };

    return (
        <div className='flex flex-col h-screen md:flex-row dark:bg-dark-800 dark:text-white'>
            <Layout />
            <div className='p-8 w-full flex flex-col gap-20'>
                <Breadcrumbs crumbs={["Playground"]} />
                
                <InputDropdown 
                    label="Test"
                    options={options}
                    selectedOption={selected} 
                    selectedKey={"name"}
                    onchange={handleChange}
                />
            </div>
        </div>
    );
};
