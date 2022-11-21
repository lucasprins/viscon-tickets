import axios, { CancelToken } from "axios";

const API_URL = "https://localhost:7295/api/machine/";

const getAllMachines = async (accessToken: string, cancelToken: CancelToken) => {
  const response = await axios.get(API_URL + "GetAllMachines/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cancelToken: cancelToken,
  });
  return response;
};

const getAllCompanyMachines = async (accessToken: string, cancelToken: CancelToken) => {
  const response = await axios.get(API_URL + "GetAllCompanyMachines/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cancelToken: cancelToken,
  });
  return response;
};

const MachineService = {
  getAllMachines,
  getAllCompanyMachines,
};

export default MachineService;
