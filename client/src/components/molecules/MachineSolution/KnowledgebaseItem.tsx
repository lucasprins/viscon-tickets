import React from "react";
import { useAppContext, useAppSelector } from "../../../utils/hooks";
import { IssueType, MachineType, SolutionType } from "../../../utils/types";
import { Tag } from "../../atoms/Tag/Tag";

var translations = require("../../../translations/allTranslations.json");

type Props<T> = {
	item: T;
	itemKey: keyof T;
}

export function KnowledgebaseItem<T extends unknown>({ item, itemKey }: Props<T>) {
  const language = useAppContext().appState.language;

  return (
    <div className='flex w-full gap-4 p-4 text-left break-all bg-white border border-gray-200 border-solid dark:bg-dark-700 dark:border-dark-600 rounded-xl drop-shadow-sm dark:text-white'>
      <h3 className='font-medium text-gray-800 dark:text-white'>{`${item[itemKey]}`}</h3>
    </div>
  );
}
