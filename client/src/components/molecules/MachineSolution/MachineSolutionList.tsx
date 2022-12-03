import React, { useState } from "react";
import { useAppContext, useAppSelector } from "../../../utils/hooks";
import { getSolutions } from "../../../features/solutions/solutionsSlice";
import { MachineSolution } from "./MachineSolution";
import { EmptyState } from "../EmptyState/EmptyState";
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconAlert } from "../../atoms/Icons/Icons";
import { MachineType, SolutionType } from "../../../utils/types";

var translations = require("../../../translations/miscTranslations.json");

export function MachineSolutionList({ selectedMachine }: { selectedMachine: MachineType | undefined }) {
  const solutions = useAppSelector(getSolutions);
  const language = useAppContext().appState.language;

  let filteredSolutions: SolutionType[] = [];

  if (selectedMachine !== undefined) {
    filteredSolutions = solutions.filter((solution: SolutionType) => solution.machineId === selectedMachine.id);
  }

  return (
    <>
      {filteredSolutions.length > 0 && selectedMachine !== undefined ? (
        <div className='flex flex-col w-full gap-6'>
          {filteredSolutions.map((solution: SolutionType) => (
            <MachineSolution key={solution.solutionId} solution={solution} machine={selectedMachine} />
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
