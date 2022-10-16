import { Formik, Form } from "formik";
import React, { useState } from "react";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppSelector } from "../../../utils/hooks";
import { validatePhoneNumber } from "../../../utils/validateInput";
import { Badge } from "../../atoms/Badge/Badge";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { Button } from "../../atoms/Button/Button";
import { IconAlert, IconMenu } from "../../atoms/Icons/Icons";
import { InputCheckbox } from "../../atoms/Input/InputCheckbox";
import { InputErrorMessage } from "../../atoms/Input/InputErrorMessage";
import { InputField } from "../../atoms/Input/InputField";
import { InputLabel } from "../../atoms/Input/InputLabel";
import { PageHeader } from "../../atoms/PageHeader/PageHeader";
import Layout from "../../organisms/Layout/Layout";
import { NavigationHeader } from "../../organisms/Navigation/NavigationHeader";
import { BasicTable } from "../../organisms/Table/basicTable";

export function Playground() {
    const language = useAppSelector(getCurrentLanguage);
    const [email, setEmail] = useState({
        email2: "",
    });

    const loginState = useState({
        email: "",
        password: "",
    });

    return (
        <div className='flex flex-col md:flex-row dark:bg-dark-800 dark:text-white'>
            <Layout />
            <div className='p-8 flex flex-col gap-y-5'>
                <NavigationHeader />

                <div className='px-8'>
                    <PageHeader title='Log in' subtitle='Welcome back! Please enter your details.' />

                    <Formik initialValues={loginState} onSubmit={() => console.log("Submitting login")}>
                        {({ errors, touched, isValidating }) => (
                            <Form className='flex flex-col gap-5 w-full'>
                                <div className='flex gap-4 w-full'>
                                    <div className='flex flex-col w-full gap-1.5'>
                                        <InputLabel htmlFor='firstName' text='test' />
                                        <InputField
                                            style='iconless'
                                            type='text'
                                            id='firstName'
                                            name='firstName'
                                            validate={(input) => validatePhoneNumber(input, language)}
                                        />
                                        <InputErrorMessage name='firstName' />
                                    </div>
                                </div>
                                <Button
                                    formType='submit'
                                    size='medium'
                                    width='full'
                                    type='primary'
                                    text='Login'
                                    onclick={() => console.log("Clicked on Login")}
                                />
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
