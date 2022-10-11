import { Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { Button } from "../../components/Button/Button";
import { Divider } from "../../components/Divider/Divider";
import { IconFlag } from "../../components/Icons/IconFlag";
import { InputDropdownMachine } from "../../components/Input/InputDropdownMachine";
import { MachineSolutionList } from "../../components/MachineSolution/MachineSolutionList";
import { NavigationHeader } from "../../components/Navigation/NavigationHeader";
import { NavigationItem } from "../../components/Navigation/NavigationItem";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { ProgressStep } from "../../components/Progress/ProgressStep";
import { toggleBackdrop, toggleLanguageModal } from "../../features/modal/modalSlice";
import { getCurrentLanguage } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

// var translations = require('./createTicketTranslations.json');

export function CreateTicket() {
	const language = useAppSelector(getCurrentLanguage);
	const dispatch = useAppDispatch();
	const [currentStep, setCurrentStep ] = useState(1);
	
	const openLanguageModal = () => {
		dispatch(toggleBackdrop());
		dispatch(toggleLanguageModal());
	};

	return (
		<div className="flex flex-col md:flex-row md:h-screen dark:bg-dark-800 dark:text-white">
			<div className="bg-gray-50 border-r border-gray-200 dark:bg-dark-900 w-1/3 hidden max-w-lg md:flex flex-col justify-between py-12 pl-12 pr-16">
				<div className="flex flex-col gap-20">
					<NavigationHeader />
					<div>
						<ProgressStep key={1} title="View common solutions" subtitle="View a range of problems with their common solutions." status={currentStep === 1 ? 'current' : currentStep > 1 ? 'complete' : 'incomplete'} connector={false} />
						<ProgressStep key={2} title="Contact information" subtitle="Please change the default phone number if necessary." status={currentStep === 2 ? 'current' : currentStep > 2 ? 'complete' : 'incomplete'} connector={false} />
						<ProgressStep key={3} title="Describe the issue" subtitle="Give us as much information as you can to solve the issue." status={currentStep === 3 ? 'current' : currentStep > 3 ? 'complete' : 'incomplete'} connector={false} />
						<ProgressStep key={4} title="Add attachments" subtitle="Please provide us with as many photo's or video's as you can." status={currentStep === 4 ? 'current' : currentStep > 4 ? 'complete' : 'incomplete'} connector={false}/>
					</div>
				</div>
				<button onClick={openLanguageModal}><IconFlag language={language} size="24" /></button>
			</div>

			{currentStep === 1 &&
				<div className="flex flex-col items-center w-2/3 pt-36">
					<div className="w-2/3 flex flex-col gap-6">
						<PageHeader title="View common solutions" subtitle="Please select a machine and make sure you have tried all the common solutions for your problem." />
						<InputDropdownMachine label="Select a machine" />
						<Divider />
						<MachineSolutionList />
						<div className="flex flex-row gap-4 pt-4">
							<Button size="medium" width="full" type="secondary-gray" text="Cancel ticket" url="/" />
							<Button size="medium" width="full" type="primary" text="Continue" onclick={() => setCurrentStep(2)} />
						</div>
					</div>
				</div>
			}

			{currentStep === 2 &&
				<div className="flex flex-col items-center w-2/3 pt-36">
					<div className="w-2/3 flex flex-col gap-6">
						<PageHeader title="Contact information" subtitle="Please make sure that this is the correct contact information. If you're using a different phone than usual, please enter the number here." />
						<div className="flex flex-row gap-4 pt-4">
							<Button size="medium" width="full" type="secondary-gray" text="Back" onclick={() => setCurrentStep(1)} />
							<Button size="medium" width="full" type="primary" text="Confirm" onclick={() => setCurrentStep(3)} />
						</div>
					</div>
				</div>
			}

			{currentStep === 3 &&
				<div className="flex flex-col items-center w-2/3 pt-36">
					<div className="w-2/3 flex flex-col gap-6">
						<PageHeader title="Describe the issue" subtitle="Please make sure that this is the correct contact information. If you're using a different phone than usual, please enter the number here." />
						<div className="flex flex-row gap-4 pt-4">
							<Button size="medium" width="full" type="secondary-gray" text="Back" onclick={() => setCurrentStep(2)} />
							<Button size="medium" width="full" type="primary" text="Confirm" onclick={() => setCurrentStep(4)} />
						</div>
					</div>
				</div>
			}

			{currentStep === 4 &&
				<div className="flex flex-col items-center w-2/3 pt-36">
					<div className="w-2/3 flex flex-col gap-6">
						<PageHeader title="Add attachments" subtitle="Please make sure that this is the correct contact information. If you're using a different phone than usual, please enter the number here." />
						<div className="flex flex-row gap-4 pt-4">
							<Button size="medium" width="full" type="secondary-gray" text="Back" onclick={() => setCurrentStep(3)} />
							<Button size="medium" width="full" type="primary" text="Confirm" onclick={() => setCurrentStep(1)} />
						</div>
					</div>
				</div>
			}
		</div>
	);
}
