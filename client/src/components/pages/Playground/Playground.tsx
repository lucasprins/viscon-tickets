import { Tab } from "@headlessui/react";
import React, { useState } from "react";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { InputDropdown } from "../../atoms/Input/InputDropdown";
import Layout from "../../organisms/Layout/Layout";

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
            <div className='flex flex-col w-full gap-20 p-8'>
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
