import React from "react";
import { Badge } from "../../atoms/Badge/Badge";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { Divider } from "../../atoms/Divider/Divider";
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconAlert } from "../../atoms/Icons/Icons";
import Layout from "../../organisms/Layout/Layout";
import { AppTable } from "../../organisms/Table/tanstackTable";

export function Playground() {
    return (
        <div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
            <Layout />
            <div className='p-8 flex flex-col gap-y-5'>
                <Breadcrumbs crumbs={["Playground"]} />
                <AppTable />
                
                
                </div>
            </div>
    );
}
