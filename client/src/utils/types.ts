export type UserType = {
    firstName: string,
    lastName: string,
    company: string,
    phoneNumber: string
};

export type SolutionType = {
    solution_id: string,
    machine_id: string,
    issue: string,
    solution: string,
    language: string
};

export type MachineType = {
    machine_id: string,
    name: string,
    blueprint_number: string,
    type: string
};