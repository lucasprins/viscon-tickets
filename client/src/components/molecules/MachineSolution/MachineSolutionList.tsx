import React, { useState } from "react";
import { useAppSelector } from "../../../utils/hooks";
import { getSelectedMachine } from "../../../features/machines/machinesSlice";
import { getSolutions } from "../../../features/solutions/solutionsSlice";
import { MachineSolution } from "./MachineSolution";
import { getCurrentLanguage } from "../../../features/user/userSlice";
import { EmptyState } from "../EmptyState/EmptyState";
import { FeaturedIcon } from "../../atoms/Icons/FeaturedIcon";
import { IconAlert } from "../../atoms/Icons/Icons";
import { SolutionType } from "../../../utils/types";

export function MachineSolutionList() {
  const solutions = useAppSelector(getSolutions);
  const language = useAppSelector(getCurrentLanguage);

  const selectedMachine = useAppSelector(getSelectedMachine);

  const filteredSolutionsMachine = solutions.filter(
    (solution: SolutionType) =>
      solution.machineId === selectedMachine.machine_id
  );
  const filteredSolutionsLanguage = filteredSolutionsMachine.filter(
    (solution: SolutionType) => solution.language === language
  );

  return (
    <>
      {filteredSolutionsLanguage.length > 0 ? (
        <div className="flex flex-col gap-6 w-full">
          {filteredSolutionsLanguage.map((solution: SolutionType) => (
            <MachineSolution
              key={solution.solutionId}
              solution={solution}
              machine={selectedMachine}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center pt-8 pb-8 md:pb-4">
          <EmptyState
            color="primary"
            title="No solutions found"
            subtitle="It looks like there aren't any solutions for this machine yet. Try refreshing the page if you think this is an error."
            featuredIcon={
              <FeaturedIcon
                size="lg"
                type="primary"
                icon={
                  <IconAlert
                    size="20"
                    fill="fill-primary-500"
                    color="stroke-primary-500"
                  />
                }
              />
            }
          />
        </div>
      )}
    </>
  );
}
