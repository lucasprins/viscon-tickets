import React, { useEffect, useState } from "react";
import { useAppContext, useAppSelector } from "../../../utils/hooks";
import { getSolutions } from "../../../features/solutions/solutionsSlice";
import { KnowledgebaseItem } from "./KnowledgebaseItem";
import { EmptyState } from "../EmptyState/EmptyState";
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconAlert } from "../../atoms/Icons/Icons";
import { IssueType, MachineType, SolutionType } from "../../../utils/types";
import IssueService from "../../../services/issueService";
import axios from "axios";
import SolutionService from "../../../services/solutionService";

var translations = require("../../../translations/allTranslations.json");

export function MachineSolutionsList({ selectedIssue }: { selectedIssue: IssueType }) {
  const language = useAppContext().appState.language;

  const [loadingSolutions, setLoadingSolutions] = useState<boolean>();
  const [solutions, setSolutions] = useState<IssueType[]>();

  let cancelToken = axios.CancelToken;
  let source = cancelToken.source();

  const fetchSolutions = async () => {
    setLoadingSolutions(true);
    console.log(selectedIssue.id);
    const response = await SolutionService.getSolutions(selectedIssue.id, source.token);
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
  }, [selectedIssue]);

  return (
    <>
      <h4 className='text-lg font-semibold text-gray-800 dark:text-white'>{selectedIssue.description}</h4>
      {solutions !== undefined && solutions.length > 0 ? (
        <div className='flex flex-col w-full gap-4'>
          {solutions.map((solution: SolutionType) => (
            <KnowledgebaseItem key={solution.id} item={solution} itemKey='description' />
          ))}
        </div>
      ) : (
        <div className='flex justify-center pt-8 pb-8 md:pb-4'>
          <EmptyState
            color='primary'
            title={translations[language].noSolutions}
            subtitle={translations[language].noSolutionsSubtitle}
            featuredIcon={
              <FeaturedIcon
                size='lg'
                type='primary'
                icon={<IconAlert size='20' fill='fill-primary-500' color='stroke-primary-500' />}
              />
            }
          />
        </div>
      )}
    </>
  );
}
