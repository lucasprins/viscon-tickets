export type userType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  isActive: boolean;
  company: companyType;
  accessToken: string;
};

export type companyType = {
  id: string;
  name: string;
  country: string;
  isActive: boolean;
};

export type SolutionType = {
  solutionId: string;
  machineId: string;
  issue: string;
  solution: string;
  language: string;
};

export type MachineType = {
  id: string;
  blueprintNumber: string;
  type: string;
};

export type CompanyMachineJoined = {
  id: string;
  name: string;
  companyId: string;
  machine: MachineType;
}

export type companyMachineType = {
  id: string;
  name: string;
  companyId: string;
  machineId: string;
};

export type ticketType = {
  id: string;
  ticketNumber: Number;
  phoneNumber: string;
  creationDate: string;
  status: string;
  priority: string;
  issueType: TicketIssueType;
  issue: string;
  actionExpected: string;
  actionPerformed: string;
  extraInfo: string;
  solution: string;
  company: companyType;
  creator: ticketUserType;
  assignee: ticketUserType;
  machineName: string;
};

export type createTicketType = {
  firstName: string;
  lastName: string;
  company: companyType;
  phoneNumber: string;
  issueType: TicketIssueType;
  issue: string;
  actionExpected: string;
  actionPerformed: string;
  extraInfo: string;
  machine: companyMachineType | undefined;
};

export type ticketUserType = {
  id: string;
  firstName: string;
  lastName: string;
};

export enum TicketIssueType {
  Software = "Software",
  Hardware = "Hardware",
  Other = "Other",
}