import { Formik, Form } from "formik";
import React, { useState } from "react";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { useAppSelector } from "../../../utils/hooks";
import { validatePhoneNumber } from "../../../utils/validateInput";
import { Badge } from "../../atoms/Badge/Badge";
import { Breadcrumbs } from "../../atoms/Breadcrumbs/Breadcrumbs";
import { Button } from "../../atoms/Button/Button";
import { ButtonLink } from "../../atoms/Button/ButtonLink";
import { IconAlert, IconBell, IconMenu } from "../../atoms/Icons/Icons";
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
    const loginState = useState({
        email: "",
        password: "",
    });

    return (
        <div className='flex flex-col md:flex-row w-full dark:bg-dark-800 dark:text-white'>
            <div className='p-8 flex flex-col items-center w-full pt-32 gap-y-5'>
            
                <div className='flex flex-col items-center gap-12 w-full max-w-lg'>
                    <PageHeader title='Log in' subtitle='Welcome back! Please enter your details.' />

                    <Formik initialValues={loginState} onSubmit={() => console.log("Submitting login")}>
                        {({ errors, touched, isValidating }) => (
                            <Form className='flex flex-col gap-5 w-full'>
                                <div className='flex flex-col gap-4 w-full'>
                                    <div className='flex flex-col gap-1.5 w-full'>
                                        <InputLabel htmlFor='email' text='Email' />
                                        <InputField
                                            style='icon'
                                            type='email'
                                            placeholder="Enter your email"
                                            icon={
                                                <IconMenu
                                                    size='20'
                                                    color='stroke-gray-500'
                                                    fill='stroke-gray-500'
                                                />
                                            }
                                            id='email'
                                            name='email'
                                            // validate={(input) => validatePhoneNumber(input, language)}
                                        />
                                        {/* <InputErrorMessage name='firstName' /> */}
                                    </div>

                                    <div className='flex flex-col w-full gap-1.5'>
                                        <InputLabel htmlFor='password' text='Password' />
                                        <InputField
                                            style='icon'
                                            type='password'
                                            placeholder="Enter your password"
                                            icon={
                                                <IconBell
                                                    size='20'
                                                    color='stroke-gray-500'
                                                    fill='stroke-gray-500'
                                                />
                                            }
                                            id='password'
                                            name='password'
                                            // validate={(input) => validatePhoneNumber(input, language)}
                                        />
                                        {/* <InputErrorMessage name='firstName' /> */}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <InputCheckbox text="Remember for 30 days" />

                                    <ButtonLink
                                        size={0}
                                        type={0}
                                        text="Forgot password"
                                    />
                                </div>
                                

                                <Button
                                    formType='submit'
                                    size='medium'
                                    width='full'
                                    type='primary'
                                    text='Sign in'
                                    onclick={() => console.log("Clicked on Login")}
                                />
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

            <div className="w-full">
                <svg viewBox="0 0 768 960" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="192" height="192" transform="translate(576)" fill="#84CAFF"/>
                    <path d="M576 96H672C672 149.019 629.019 192 576 192V96Z" fill="white"/>
                    <path d="M672 0C725.019 0 768 42.9807 768 96H672V0Z" fill="#175CD3"/>
                    <rect width="192" height="192" transform="translate(0 768)" fill="white"/>
                    <path d="M0 864H96C96 917.019 53.0193 960 0 960V864Z" fill="#2E90FA"/>
                    <path d="M96 768L96 864C42.9807 864 -2.31755e-06 821.019 0 768L96 768Z" fill="#175CD3"/>
                    <path d="M96 864C96 810.981 138.981 768 192 768L192 864L96 864Z" fill="#2E90FA"/>
                    <path d="M96 864C149.019 864 192 906.981 192 960H96V864Z" fill="#84CAFF"/>
                    <rect width="192" height="192" transform="translate(576 192)" fill="#B2DDFF"/>
                    <path d="M672 288H768C768 341.019 725.019 384 672 384V288Z" fill="#2E90FA"/>
                    <path d="M672 288C618.981 288 576 330.981 576 384H672V288Z" fill="#175CD3"/>
                    <rect width="192" height="192" transform="translate(192 192)" fill="white"/>
                    <path d="M384 288H288C288 341.019 330.981 384 384 384V288Z" fill="#2E90FA"/>
                    <path d="M288 192C341.019 192 384 234.981 384 288H288V192Z" fill="#175CD3"/>
                    <rect width="192" height="192" transform="translate(384)" fill="white"/>
                    <path d="M480 96H576L480 192V96Z" fill="#2E90FA"/>
                    <path d="M480 0V96H384L480 0Z" fill="#2E90FA"/>
                    <rect width="192" height="192" transform="translate(384 384)" fill="#B2DDFF"/>
                    <path d="M480 480L480 384L576 480L480 480Z" fill="white"/>
                    <path d="M384 480L480 480L480 576L384 480Z" fill="#2E90FA"/>
                    <rect width="192" height="192" transform="translate(384 192)" fill="#84CAFF"/>
                    <path d="M480 384C426.981 384 384 341.019 384 288C384 234.981 426.981 192 480 192V384Z" fill="#175CD3"/>
                    <circle cx="480" cy="288" r="48" fill="white"/>
                    <rect width="192" height="192" transform="translate(192 768)" fill="#84CAFF"/>
                    <path d="M288 960C234.981 960 192 917.019 192 864C192 810.981 234.981 768 288 768V960Z" fill="#175CD3"/>
                    <path d="M384 960C330.981 960 288 917.019 288 864C288 810.981 330.981 768 384 768V960Z" fill="white"/>
                    <circle cx="288" cy="864" r="48" fill="#2E90FA"/>
                    <rect width="192" height="192" transform="translate(0 576)" fill="#B2DDFF"/>
                    <path d="M-4.19629e-06 672C-1.87874e-06 618.981 42.9807 576 96 576C149.019 576 192 618.981 192 672L-4.19629e-06 672Z" fill="#2E90FA"/>
                    <circle cx="96" cy="720" r="48" fill="white"/>
                    <rect width="192" height="192" transform="translate(192 576)" fill="white"/>
                    <path d="M192 672C192 618.981 234.981 576 288 576C341.019 576 384 618.981 384 672L192 672Z" fill="#2E90FA"/>
                    <path d="M288 768C234.981 768 192 725.019 192 672C192 618.981 234.981 576 288 576V768Z" fill="#175CD3"/>
                    <circle cx="336" cy="720" r="48" fill="#84CAFF"/>
                    <rect width="192" height="192" transform="translate(0 384)" fill="white"/>
                    <path d="M192 576C138.981 576 96 533.019 96 480C96 426.981 138.981 384 192 384V576Z" fill="#175CD3"/>
                    <circle cx="48" cy="480" r="48" fill="#84CAFF"/>
                    <rect width="192" height="192" transform="translate(192 384)" fill="#84CAFF"/>
                    <path d="M192 576C245.019 576 288 533.019 288 480C288 426.981 245.019 384 192 384V576Z" fill="#175CD3"/>
                    <path d="M384 384L384 576L288 480L384 384Z" fill="white"/>
                    <rect width="192" height="192" fill="white"/>
                    <rect x="96" y="96" width="96" height="96" fill="#2E90FA"/>
                    <rect width="96" height="96" fill="#B2DDFF"/>
                    <rect width="192" height="192" transform="translate(384 576)" fill="#B2DDFF"/>
                    <rect x="384" y="576" width="96" height="96" fill="#175CD3"/>
                    <rect x="480" y="672" width="96" height="96" fill="white"/>
                    <rect width="192" height="192" transform="translate(0 192)" fill="#B2DDFF"/>
                    <circle cx="96" cy="288" r="48" fill="white"/>
                    <path d="M192 384H0L96 288L192 384Z" fill="#175CD3"/>
                    <rect width="192" height="192" transform="translate(576 768)" fill="white"/>
                    <circle cx="720" cy="912" r="48" fill="#2E90FA"/>
                    <circle cx="624" cy="912" r="48" fill="#2E90FA"/>
                    <path d="M576 768L768 768L672 864L576 768Z" fill="#175CD3"/>
                    <rect width="192" height="192" transform="translate(576 576)" fill="white"/>
                    <circle cx="672" cy="672" r="48" fill="#D1E9FF"/>
                    <path d="M768 768H576L672 672L768 768Z" fill="#175CD3"/>
                    <path d="M768 672H576L672 576L768 672Z" fill="#2E90FA"/>
                    <rect width="192" height="192" transform="translate(192)" fill="#84CAFF"/>
                    <path d="M384 0V192H192L384 0Z" fill="#175CD3"/>
                    <circle cx="288" cy="96" r="48" fill="white"/>
                    <rect width="192" height="192" transform="translate(576 384)" fill="white"/>
                    <path d="M576 384L768 384L768 576L576 384Z" fill="#2E90FA"/>
                    <circle cx="672" cy="480" r="48" fill="#175CD3"/>
                    <rect width="192" height="192" transform="translate(384 768)" fill="#84CAFF"/>
                    <path d="M576 960H384L384 768L576 960Z" fill="#2E90FA"/>
                    <circle cx="480" cy="864" r="48" fill="white"/>
                </svg>
            </div>
        </div>
    );
}
