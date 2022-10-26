export type userType = {
    id: string;
    firstName: string;
    prefix: string | undefined;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    isActive: boolean;
    company: companyType;
    accessToken: string;
};

export type companyType = {
    id: string,
    name: string,
    country: string,
    isActive: boolean
}

export type SolutionType = {
    solutionId: string,
    machineId: string,
    issue: string,
    solution: string,
    language: string
};

export type MachineType = {
    machineId: string,
    name: string,
    blueprintNumber: string,
    type: string
};

export type TicketType = {
    ticketId: string,
    ticketNumber: string,
    customerEmployee: userType,
    visconEmployee: userType | undefined,
    machine: MachineType,
    creationDate: string,
    phoneNumber: string,
    issue: string,
    actionExpected: string,
    actionPerformed: string,
    extraInformation: string | undefined,
    solution: string | undefined
    status: "open" | "in progress" | "resolved" | "cancelled",
    priority: "critical" | "high" | "medium" | "low"
}

export type NotificationType = {
    notificationId: string,
    userId: userType,
    ticketId: string,
    title: string,
    creationDate: Date,
    hasViewed: boolean
}