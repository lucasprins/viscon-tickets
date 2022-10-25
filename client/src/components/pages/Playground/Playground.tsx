import React from "react";
import { Badge } from "../../atoms/Badge/Badge";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { Divider } from "../../atoms/Divider/Divider";
import { IconAlert } from "../../atoms/Icons/Icons";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import { FileDropzone } from "../../molecules/FileUpload/FileDropzone";
import Layout from "../../organisms/Layout/Layout";
import { BasicTable } from "../../organisms/Table/basicTable";

export function Playground() {
    return (
        <div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
            <Layout />
            <div className='p-8 flex flex-col gap-y-5'>
                <Breadcrumbs crumbs={["Playground"]} />

                <Badge
                    size='lg'
                    color='error'
                    text='Primary'
                    icon={<IconAlert size='14' fill='fill-error-500' color='stroke-error-500' />}
                />

                    <Divider />
                    <FileDropzone />
                    <Divider />
                    <BasicTable />
                </div>
            </div>
    );
}
