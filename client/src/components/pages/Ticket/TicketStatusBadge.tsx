import React from "react";
import { useAppContext } from "../../../utils/hooks";
import { Badge } from "../../atoms/Badge/Badge";
import { IconAlert, IconStopwatch, IconCheck } from "../../atoms/Icons/Icons";

var translations = require("../../../translations/ticketTranslations.json");

export const TicketStatusBadge = ({ status }: { status: string}) => {
    const language = useAppContext().appState.language;

    let statusBadge;
    switch (status) {
        case "Open":
            statusBadge = (
                <Badge
                    size='md'
                    color='error'
                    text={translations[language].open}
                    icon={
                        <IconAlert
                            size='14'
                            fill='fill-error-600 dark:fill-error-400'
                            color='stroke-error-600 dark:stroke-error-400'
                        />
                    }
                />
            );
            break;
        case "InProgress":
            statusBadge = (
                <Badge
                    size='md'
                    color='gray'
                    text={translations[language].in_progress}
                    icon={
                        <IconStopwatch
                            size='14'
                            fill='fill-gray-600 dark:fill-gray-300'
                            color='stroke-gray-600 dark:stroke-gray-300'
                        />
                    }
                />
            );
            break;
        case "Resolved":
            statusBadge = (
                <Badge
                    size='md'
                    color='success'
                    text={translations[language].resolved}
                    icon={<IconCheck size='14' fill='fill-success-600' color='stroke-success-600' />}
                />
            );
            break;
        case "Cancelled":
            statusBadge = (
                <Badge
                    size='md'
                    color='primary'
                    text={translations[language].cancelled}
                    icon={<IconCheck size='14' fill='fill-primary-600' color='stroke-primary-600' />}
                />
            );
            break;
    }

    return (
        <>
            <span className="flex">{statusBadge}</span>
        </>
    );
};
