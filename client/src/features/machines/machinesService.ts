import axios, { CancelToken } from "axios";
import { authHeader } from "../auth/authHeader";

const API_URL = "https://localhost:7295/api/machine/";

const getAllMachines = async (cancelToken: CancelToken) => {
  const response = await axios.get(API_URL + "GetAllMachines/", {
    headers: authHeader(),
    cancelToken: cancelToken,
  });
  return response;
};

const getAllCompanyMachines = async (cancelToken: CancelToken) => {
  const response = await axios.get(API_URL + "GetAllCompanyMachines/", {
    headers: authHeader(),
    cancelToken: cancelToken,
  });
  return response;
};

const getCompanyMachinesJoined = async (cancelToken: CancelToken, companyId: string) => {
  const response = await axios.get(API_URL + "GetCompanyMachinesJoined/" + companyId, {
    headers: authHeader(),
    cancelToken: cancelToken,
  });
  return response;
};

const addMachine = async (cancelToken: CancelToken, type: string, blueprintNumber: string) => {
  const response = await axios.post(
    API_URL + "AddMachine/",
    {
      blueprintNumber: blueprintNumber,
      type: type,
    },
    {
      headers: authHeader(),
      cancelToken: cancelToken,
    }
  );
  return response;
};

const addCompanyMachine = async (name: string, companyId: string, machineId: string) => {
  const response = await axios.post(
    API_URL + "AddCompanyMachine/",
    {
      name: name,
      companyId: companyId,
      machineId: machineId,
    },
    {
      headers: authHeader(),
    }
  );
  return response;
};

const companyMachineExists = async (companyId: string, machineName: string) => {
  const response = await axios.get(`${API_URL}CompanyMachineExists/${companyId}/${machineName}`, {
    headers: authHeader(),
  });
  return response;
};

const MachineService = {
  getAllMachines,
  getAllCompanyMachines,
  getCompanyMachinesJoined,
  addMachine,
  addCompanyMachine,
  companyMachineExists,
};

export default MachineService;
