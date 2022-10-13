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