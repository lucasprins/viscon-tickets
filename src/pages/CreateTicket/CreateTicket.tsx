import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button } from "../../components/Button/Button";
import { Divider } from "../../components/Divider/Divider";
import { IconBuilding } from "../../components/Icons/IconBuilding";
import { IconFlag } from "../../components/Icons/IconFlag";
import { IconPhone } from "../../components/Icons/IconPhone";
import { InputDropdownMachine } from "../../components/Input/InputDropdownMachine";
import { InputErrorMessage } from "../../components/Input/InputErrorMessage";
import { InputField } from "../../components/Input/InputField";
import { InputLabel } from "../../components/Input/InputLabel";
import { InputTextArea } from "../../components/Input/InputTextArea";
import { MachineSolutionList } from "../../components/MachineSolution/MachineSolutionList";
import { NavigationHeader } from "../../components/Navigation/NavigationHeader";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { ProgressStep } from "../../components/Progress/ProgressStep";
import { toggleBackdrop, toggleLanguageModal } from "../../features/modal/modalSlice";
import { getCurrentLanguage, getUser } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { UserType } from "../../types/UserType";
import { validatePhoneNumber, validateTextarea } from "../../utils/validateInput";

var translations = require("../../translations/createTicketTranslations.json");

export function CreateTicket() {
	const [currentStep, setCurrentStep ] = useState(1);
	const language = useAppSelector(getCurrentLanguage);
	const dispatch = useAppDispatch();

	const user: UserType = useAppSelector(getUser);

	const [ticket, setTicket] = useState({
		firstName: '',
		lastName: '',
		company: '',
		phoneNumber: '',
		issue: '',	// What do you see that is going wrong?
		actionExpected: '', // What do you expect to happen
		actionPerformed: '', // What did you already try to fix the problem
		extraInformation: '', // Is there any extra information?
	});

	const contactInitialValues = {
		firstName: user.firstName,
		lastName: user.lastName,
		company: user.company,
		phoneNumber: user.phoneNumber
	};

	const addContactInformation = (values: UserType) => {
		setTicket({ ...ticket, ...values });
		setCurrentStep(3);
	};

	const addIssueInformation = (values: UserType) => {
		setTicket({ ...ticket, ...values });
		setCurrentStep(4);
	};

	const openLanguageModal = () => {
		dispatch(toggleBackdrop());
		dispatch(toggleLanguageModal());
	};

	return (
		<>
			<div className="flex flex-col md:flex-row md:h-screen dark:bg-dark-800 dark:text-white w-full">
				<div className="bg-gray-50 border-r border-gray-200 dark:border-dark-600 dark:border dark:bg-dark-700 w-1/3 hidden max-w-lg lg:flex flex-col justify-between py-12 pl-12 pr-16">
					<div className="flex flex-col gap-20">
						<NavigationHeader />
						<div>
							<ProgressStep title={translations[language].view_solutions} subtitle={translations[language].view_solutions_subtitle} status={currentStep === 1 ? 'current' : currentStep > 1 ? 'complete' : 'incomplete'} connector={false} />
							<ProgressStep title={translations[language].contact_information} subtitle={translations[language].contact_information_subtitle} status={currentStep === 2 ? 'current' : currentStep > 2 ? 'complete' : 'incomplete'} connector={false} />
							<ProgressStep title={translations[language].describe_issue} subtitle={translations[language].describe_issue_subtitle} status={currentStep === 3 ? 'current' : currentStep > 3 ? 'complete' : 'incomplete'} connector={false} />
							<ProgressStep title={translations[language].add_attachments} subtitle={translations[language].add_attachments_subtitle} status={currentStep === 4 ? 'current' : currentStep > 4 ? 'complete' : 'incomplete'} connector={false}/>
							<ProgressStep title={translations[language].review} subtitle={translations[language].review_subtitle} status={currentStep === 5 ? 'current' : currentStep > 5 ? 'complete' : 'incomplete'} connector={false}/>
						</div>
					</div>
					<button onClick={openLanguageModal}><IconFlag language={language} size="24" /></button>
				</div>

				{currentStep === 1 &&
					<div className="flex flex-col w-full items-center lg:w-2/3 py-6 px-6 lg:pt-36 overflow-y-scroll">
						<div className="lg:w-2/3 flex flex-col w-full gap-6">
							<PageHeader title={translations[language].view_solutions} subtitle={translations[language].view_solutions_subtitle_long} />
							<InputDropdownMachine label={translations[language].select_machine} />
							<Divider />
							<MachineSolutionList />
							<div className="flex flex-row gap-4 pt-4">
								<Button size="medium" width="full" type="secondary-gray" text={translations[language].cancel_ticket} url="/" />
								<Button size="medium" width="full" type="primary" text={translations[language].continue} onclick={() => setCurrentStep(2)} />
							</div>
						</div>
					</div>}

				{currentStep === 2 &&
					<div className="flex flex-col w-full items-center lg:w-2/3 py-6 px-6 lg:pt-36 overflow-y-scroll">
						<div className="lg:w-2/3 flex flex-col w-full gap-6">
							<PageHeader title="Contact information" subtitle="Please make sure that this is the correct contact information. If you're using a different phone than usual, please enter the number here." />
							<Formik
								initialValues={ticket.lastName === "" ? contactInitialValues : ticket}
								onSubmit={addContactInformation}>
								{({ errors, touched, isValidating }) => (
									<Form className="flex flex-col gap-4 w-full">
									<div className="flex gap-4 w-full">
										<div className="flex flex-col w-full gap-1.5">
											<InputLabel htmlFor="firstName" text="First Name" />
											<InputField style="iconless" type="text" id="firstName" name="firstName" disabled={true} />
										</div>
										<div className="flex flex-col w-full gap-1.5">
											<InputLabel htmlFor="lastName" text="Last Name" />
											<InputField style="iconless" type="text" id="lastName" name="lastName" disabled={true} />									
										</div>
									</div>
									<div className="flex flex-col w-full gap-1.5">
										<InputLabel htmlFor="company" text="Company" />
										<InputField style="icon" type="text" id="company" name="company" disabled={true} icon={<IconBuilding size='20' color='stroke-gray-500' fill='fill-primary-500' />}  />
									</div>
									<div className="flex flex-col w-full gap-1.5">
										<InputLabel htmlFor="phoneNumber" text="Phone number" />
										<InputField touched={touched.phoneNumber} error={errors.phoneNumber} validate={validatePhoneNumber} style="icon" type="tel" id="phoneNumber" name="phoneNumber" icon={<IconPhone size='20' color='stroke-gray-500' fill='stroke-gray-500' />}  />
										<InputErrorMessage name="phoneNumber" />
									</div>
									<div className="flex flex-row gap-4 pt-4">
										<Button size="medium" width="full" type="secondary-gray" text={translations[language].back} onclick={() => setCurrentStep(1)} />
										<Button formType="submit" size="medium" width="full" type="primary" text={translations[language].confirm} />
									</div>
								</Form>
								)}
							</Formik>
						</div>
					</div>}

				{currentStep === 3 &&
					<div className="flex flex-col w-full items-center lg:w-2/3 py-6 px-6 lg:pt-36 overflow-y-scroll">
						<div className="lg:w-2/3 flex flex-col w-full gap-6">
							<PageHeader title="Describe the issue" subtitle="Please describe carefully what is going wrong and what you are seeing. This will help us solve the issue as quickly as possible." />
							<Formik
								initialValues={ticket}
								onSubmit={addIssueInformation}>
								{({ errors, touched, isValidating }) => (
									<Form className="flex flex-col gap-4 w-full">
									<div className="flex flex-col w-full gap-1.5">
										<InputLabel htmlFor="issue" text="What do you see that is going wrong?" />
										<InputTextArea touched={touched.issue} error={errors.issue} validate={validateTextarea} id="issue" name="issue" placeholder="Please describe carefully what is going wrong and what you are seeing. What is the issue?" />
										<InputErrorMessage name="issue" />
									</div>
									<div className="flex flex-col w-full gap-1.5">
										<InputLabel htmlFor="actionExpected" text="What do you expect to happen?" />
										<InputTextArea touched={touched.actionExpected} error={errors.actionExpected} validate={validateTextarea} id="actionExpected" name="actionExpected" placeholder="What should happen if everything goes right?" />
										<InputErrorMessage name="actionExpected" />
									</div>
									<div className="flex flex-col w-full gap-1.5">
										<InputLabel htmlFor="actionPerformed" text="What did you try already to fix the problem?" />
										<InputTextArea touched={touched.actionPerformed} error={errors.actionPerformed} validate={validateTextarea} id="actionPerformed" name="actionPerformed" placeholder="Have you tried any solutions from the knowledge base yet?" />
										<InputErrorMessage name="actionPerformed" />
									</div>
									<div className="flex flex-col w-full gap-1.5">
										<InputLabel htmlFor="extraInformation" text="Extra information" />
										<InputTextArea touched={touched.extraInformation} error={errors.extraInformation} validate={validateTextarea} id="extraInformation" name="extraInformation" placeholder="Do you have any extra information that could help us solve the issue as quickly as possible?" />
										<InputErrorMessage name="extraInformation" />
									</div>


									
									<div className="flex flex-row gap-4 pt-4">
										<Button size="medium" width="full" type="secondary-gray" text={translations[language].back} onclick={() => setCurrentStep(2)} />
										<Button formType="submit" size="medium" width="full" type="primary" text={translations[language].continue} />
									</div>
								</Form>
								)}
							</Formik>
						</div>
					</div>}

				{currentStep === 4 &&
					<div className="flex flex-col w-full items-center lg:w-2/3 py-6 px-6 lg:pt-36 overflow-y-scroll">
						<div className="lg:w-2/3 flex flex-col w-full gap-6">
							<PageHeader title="Add attachments" subtitle="Please make sure that this is the correct contact information. If you're using a different phone than usual, please enter the number here." />
							<div className="flex flex-row gap-4 pt-4">
								<Button size="medium" width="full" type="secondary-gray" text="Back" onclick={() => setCurrentStep(3)} />
								<Button size="medium" width="full" type="primary" text="Continue" onclick={() => setCurrentStep(5)} />
							</div>
						</div>
					</div>}

				{currentStep === 5 &&
					<div className="flex flex-col w-full items-center lg:w-2/3 py-6 px-6 lg:pt-36 overflow-y-scroll">
						<div className="lg:w-2/3 flex flex-col w-full gap-6">
							<PageHeader title="Review ticket" subtitle="Please make sure that this is the correct contact information. If you're using a different phone than usual, please enter the number here." />
							<div className="flex flex-row gap-4 pt-4">
								<Button size="medium" width="full" type="secondary-gray" text="Back" onclick={() => setCurrentStep(4)} />
								<Button size="medium" width="full" type="primary" text="Confirm" onclick={() => setCurrentStep(1)} />
							</div>
						</div>
					</div>}
			</div>
		</>
	);
}
