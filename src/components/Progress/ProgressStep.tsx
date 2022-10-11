import React from "react";
import { IconCheck } from "../Icons/IconCheck";
import { IconTick } from "../Icons/IconTick";
import { Connector } from "./Connector";

type ProgressStepProps = {
  title: string;
  subtitle: string;
  status: "complete" | "current" | "incomplete";
  connector: boolean;
};

export function ProgressStep({ title, subtitle, status, connector }: ProgressStepProps) {
  let progressStepIcon;

  switch (status) {
    case "complete":
      progressStepIcon = (
        <div className="flex bg-primary-50 rounded-full w-7 h-7 items-center justify-center border-2 border-primary-600">
          <IconTick
            size="16"
            fill="fill-primary-600"
            color="stroke-primary-500"
          />
        </div>
      );
      break;
    case "current":
      progressStepIcon = (
        <div className="flex bg-primary-50 rounded-full w-7 h-7 items-center justify-center border-2 border-primary-600">
          <div className="bg-primary-600 w-2.5 h-2.5 rounded-full"></div>
        </div>
      );
      break;
    case "incomplete":
      progressStepIcon = (
        <div className="flex bg-white rounded-full w-7 h-7 items-center justify-center border-2 border-gray-200">
          <div className="bg-gray-200 w-2.5 h-2.5 rounded-full"></div>
        </div>
      );
      break;
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center gap-1 pb-1">
        {progressStepIcon}
        {connector && <Connector color="bg-white" />}
      </div>
      <div className="flex flex-col pt-1 pb-8">
        <h5 className="text-gray-800 text-md font-semibold">{title}</h5>
        <p className="text-gray-600 text-md">{subtitle}</p>
      </div>
    </div>
  );
}
