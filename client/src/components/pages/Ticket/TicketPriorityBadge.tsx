import { RadioGroup } from "@headlessui/react";
import React, { useState } from "react";
import { useAppContext } from "../../../utils/hooks";
import { Badge } from "../../atoms/Badge/Badge";
import { IconCheck, IconChevron } from "../../atoms/Icons/Icons";

var translations = require("../../../translations/allTranslations.json");

export const TicketPriorityBadge = ({
  priority: priority,
  handleChange,
}: {
  priority: string;
  handleChange?: (priority: string) => void;
}) => {
  const { appState } = useAppContext();
  const language = appState.language;
  const user = appState.user;

  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [value, setValue] = useState(priority);

  const handleChangePriority = (priority: string) => {
    if(handleChange) {
      handleChange(priority);
    }
    setValue(priority);
  }

  let statusBadge;
  switch (priority.toLowerCase()) {
    case "critical":
      statusBadge = user?.role.includes("Viscon") ? (
        <button
          onClick={() => {
            setShowOptionsMenu(!showOptionsMenu);
          }}
        >
          <Badge
            size='md'
            color='error'
            text={translations[language]["ticket.badge.priority.critical"]}
            icon={
              <IconChevron
                direction='down'
                size='14'
                fill='fill-error-600 dark:fill-error-400'
                color='stroke-error-600 dark:stroke-error-400'
              />
            }
          />
        </button>
      ) : (
        <Badge size='md' color='error' text={translations[language]["ticket.badge.priority.critical"]} />
      );
      break;
    case "high":
      statusBadge = user?.role.includes("Viscon") ? (
        <button
          onClick={() => {
            setShowOptionsMenu(!showOptionsMenu);
          }}
        >
          <Badge
            size='md'
            color='primary'
            text={translations[language]["ticket.badge.priority.high"]}
            icon={
              <IconChevron
                direction='down'
                size='14'
                fill='fill-primary-600 dark:fill-primary-400'
                color='stroke-primary-600 dark:stroke-primary-400'
              />
            }
          />
        </button>
      ) : (
        <Badge size='md' color='primary' text={translations[language]["ticket.badge.priority.high"]} />
      );
      break;
    case "medium":
      statusBadge = user?.role.includes("Viscon") ? (
        <button
          onClick={() => {
            setShowOptionsMenu(!showOptionsMenu);
          }}
        >
          <Badge
            size='md'
            color='success'
            text={translations[language]["ticket.badge.priority.medium"]}
            icon={
              <IconChevron
                direction='down'
                size='14'
                fill='fill-success-600 dark:fill-success-400'
                color='stroke-success-600 dark:stroke-success-400'
              />
            }
          />
        </button>
      ) : (
        <Badge size='md' color='success' text={translations[language]["ticket.badge.priority.medium"]} />
      );
      break;
    case "low":
      statusBadge = user?.role.includes("Viscon") ? (
        <button
          onClick={() => {
            setShowOptionsMenu(!showOptionsMenu);
          }}
        >
          <Badge
            size='md'
            color='gray'
            text={translations[language]["ticket.badge.priority.low"]}
            icon={
              <IconChevron
                direction='down'
                size='14'
                fill='fill-gray-600 dark:fill-gray-400'
                color='stroke-gray-600 dark:stroke-gray-400'
              />
            }
          />
        </button>
      ) : (
        <Badge size='md' color='gray' text={translations[language]["ticket.badge.priority.low"]} />
      );
      break;
  }

  return (
    <div className='relative'>
      {showOptionsMenu && (
        <RadioGroup
          className='absolute z-10 flex flex-col gap-1 p-4 mt-8 bg-white border border-gray-200 rounded-lg drop-shadow-sm'
          value={value}
          onChange={(value: string) => handleChangePriority(value)}
        >
          <RadioGroup.Option value='Critical'>
            {({ checked }) => (
              <span className="flex items-center justify-between gap-6 cursor-pointer">
                {translations[language]["ticket.badge.priority.critical"]}
                {checked && (
                  <IconCheck
                    size='16'
                    color='stroke-primary-600 dark:stroke-primary-400'
                  />
                )}
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value='High'>
          {({ checked }) => (
              <span className="flex items-center justify-between gap-6 cursor-pointer">
                {translations[language]["ticket.badge.priority.high"]}
                {checked && (
                  <IconCheck
                    size='16'
                    color='stroke-primary-600 dark:stroke-primary-400'
                  />
                )}
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value='Medium'>
          {({ checked }) => (
              <span className="flex items-center justify-between gap-6 cursor-pointer">
                {translations[language]["ticket.badge.priority.medium"]}
                {checked && (
                  <IconCheck
                    size='16'
                    color='stroke-primary-600 dark:stroke-primary-400'
                  />
                )}
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value='Low'>
          {({ checked }) => (
              <span className="flex items-center justify-between gap-6 cursor-pointer">
                {translations[language]["ticket.badge.priority.low"]}
                {checked && (
                  <IconCheck
                    size='16'
                    color='stroke-primary-600 dark:stroke-primary-400'
                  />
                )}
              </span>
            )}
          </RadioGroup.Option>

        </RadioGroup>
      )}
      <span className='flex'>{statusBadge}</span>
    </div>
  );
};
