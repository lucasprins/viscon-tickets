import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../utils/hooks";
import { getSolutions } from "../../../features/solutions/solutionsSlice";
import { KnowledgebaseItem } from "./KnowledgebaseItem";
import { EmptyState } from "../EmptyState/EmptyState";
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconAlert } from "../../atoms/Icons/Icons";
import { IssueType, MachineType, SolutionType } from "../../../utils/types";
import IssueService from "../../../services/issueService";
import axios from "axios";
import KnowledgebaseIssue from "./KnowledgebaseIssue";

var translations = require("../../../translations/allTranslations.json");

export function KnowledgebaseIssuesList({
  selectedMachine,
  setSelectedIssue,
}: {
  selectedMachine: MachineType;
  setSelectedIssue?: React.Dispatch<React.SetStateAction<IssueType | undefined>>;
}) {
  const language = useAppContext().appState.language;

  const [loadingIssues, setLoadingIssues] = useState<boolean>();
  const [issues, setIssues] = useState<IssueType[]>();

  let cancelToken = axios.CancelToken;
  let source = cancelToken.source();

  const fetchIssues = async () => {
    setLoadingIssues(true);
    const response = await IssueService.getIssues(selectedMachine?.id || "", source.token);
    if (response.data.success) {
      setIssues(response.data.data);
    }
    setLoadingIssues(false);
  };

  useEffect(() => {
    if (selectedMachine !== undefined) {
      fetchIssues();
    }

    return () => {
      source.cancel();
    };
  }, [selectedMachine]);

  return (
    <>
      {issues !== undefined && issues.length > 0 ? (
        <div className='flex flex-col w-full gap-4'>
          {issues.map((issue: IssueType) => (
            <KnowledgebaseIssue key={issue.id} issue={issue} />
          ))}
        </div>
      ) : (
        <div className='flex justify-center pt-8 pb-8 md:pb-4'>
          <EmptyState
            color='primary'
            title={translations[language].noIssues}
            subtitle={translations[language].noIssuesSubtitle}
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
