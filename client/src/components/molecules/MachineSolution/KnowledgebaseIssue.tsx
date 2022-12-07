import { Disclosure } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SolutionService from "../../../services/solutionService";
import { IssueType } from "../../../utils/types";
import { Divider } from "../../atoms/Divider/Divider";

function KnowledgebaseIssue({ issue }: { issue: IssueType }) {
  const [loadingSolutions, setLoadingSolutions] = useState<boolean>();
  const [solutions, setSolutions] = useState<IssueType[]>();

  let cancelToken = axios.CancelToken;
  let source = cancelToken.source();

  const fetchSolutions = async () => {
    setLoadingSolutions(true);
    console.log(issue.id);
    const response = await SolutionService.getSolutions(issue.id, source.token);
    console.log(response);
    if (response.data.success) {
      setSolutions(response.data.data);
    }
    setLoadingSolutions(false);
  };

  useEffect(() => {
    fetchSolutions();

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className='flex flex-col w-full gap-3 p-4 text-left bg-white border border-gray-200 border-solid break-word dark:bg-dark-700 dark:border-dark-600 rounded-xl drop-shadow-sm dark:text-white'>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className='text-left'>{issue.description}</Disclosure.Button>
            {open && solutions !== undefined && solutions.length > 0 && <hr className="border-t border-gray-200 dark:border-dark-500"/>}
            <Disclosure.Panel className='flex flex-col gap-3 text-gray-600 dark:text-dark-300'>
              {solutions !== undefined &&
                solutions.length > 0 &&
                solutions.map((solution) => <div key={solution.id}>{solution.description}</div>)}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default KnowledgebaseIssue;
