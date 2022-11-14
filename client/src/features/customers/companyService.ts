import axios, { CancelToken } from "axios";

const API_URL = "https://localhost:7295/api/company/";

const getAllCompanies = async (accessToken: string, cancelToken: CancelToken) => {
  const response = await axios.get(API_URL + "GetAllCompanies/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cancelToken: cancelToken,
  });
  return response;
};

const logout = () => {
  localStorage.removeItem("user");
};

const CompanyService = {
  getAllCompanies,
};

export default CompanyService;
