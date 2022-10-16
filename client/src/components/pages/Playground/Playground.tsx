import React, { useState } from "react";
import { Badge } from "../../atoms/Badge/Badge";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { IconAlert, IconMenu } from "../../atoms/Icons/Icons";
import { InputCheckbox } from "../../atoms/Input/InputCheckbox";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import Layout from "../../organisms/Layout/Layout";
import { NavigationHeader } from "../../organisms/Navigation/NavigationHeader";
import { BasicTable } from "../../organisms/Table/basicTable";

export function Playground() {
    const [email, setEmail] = useState({
        email2: ""
    });

    return (
        <div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
            <Layout />
            <div className='p-8 flex flex-col gap-y-5'>
                <NavigationHeader />

                <div className="px-8">
                    <PageHeader title="Log in" subtitle="Welcome back! Please enter your details." />

                    <InputLabel htmlFor="fsd" text="Email"/>
                    {/* <InputField
                        style='icon'
                        type='email'
                        placeholder="Enter your email"
                        icon={
                            <IconMenu
                                size='20'
                                color='stroke-gray-500'
                                fill='fill-primary-500'
                            />
                        }
                        id='email2'
                        name='email2'
                    /> */}

                    {/* <InputCheckbox /> */}

                </div>

            </div>
        </div>
    );
}
