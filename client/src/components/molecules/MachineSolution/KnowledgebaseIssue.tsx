import { Disclosure } from "@headlessui/react";
import React from "react";
import { IssueType } from "../../../utils/types";

function KnowledgebaseIssue({ issue }: { issue: IssueType} ) {
  return (
    <Disclosure>
      <Disclosure.Button className='flex w-full gap-4 p-4 text-left break-all bg-white border border-gray-200 border-solid dark:bg-dark-700 dark:border-dark-600 rounded-xl drop-shadow-sm dark:text-white'>{issue.description}</Disclosure.Button>
      <Disclosure.Panel className='text-gray-500'>
        Yes! You can purchase a license that you can share with your entire team.
      </Disclosure.Panel>
    </Disclosure>
  );
}

export default KnowledgebaseIssue;
