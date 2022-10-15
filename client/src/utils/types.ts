export type UserType = {
    firstName: string,
    preposition?: string,
    lastName: string,
    phoneNumber: string,
    role: "viscon-admin" | "viscon-employee" | "customer-admin" | "customer-employee",
    email: string,
    isActive: boolean,
    company: CompanyType 
};

export type CompanyType = {
    companyId: string,
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
    customerEmployee: UserType,
    visconEmployee: UserType | undefined,
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
    userId: UserType,
    ticketId: string,
    title: string,
    creationDate: Date,
    hasViewed: boolean
}