import axios, { CancelToken } from "axios";
import { authHeader } from "../auth/authHeader";

const API_URL = "https://localhost:7295/api/company/";

const getAllCompanies = async (cancelToken: CancelToken) => {
  const response = await axios.get(API_URL + "GetAllCompanies/", {
    headers: authHeader(),
    cancelToken: cancelToken,
  });
  return response;
};

const companyExists = async (name: string) => {
  const response = await axios.get(API_URL + "CompanyExists/" + name);
  return response;
};

const toggleCompanyStatus = async (companyId: string) => {
  const response = await axios.get(API_URL + "ToggleCompanyStatus/" + companyId, {
    headers: authHeader(),
  });
  return response;
}

const addCompany = async (
  companyName: string,
  companyCountry: string,
  adminFirstName: string,
  adminLastName: string,
  adminEmail: string,
  cancelToken: CancelToken
) => {
  const response = await axios.post(
    API_URL + "AddCompany",
    {
      name: companyName,
      country: companyCountry,
      adminUser: {
        firstName: adminFirstName,
        lastName: adminLastName,
        email: adminEmail,
        role: "CustomerAdmin",
      },
    },
    {
      headers: authHeader(),
      cancelToken: cancelToken,
    }
  );
  return response;
};

const CompanyService = {
  getAllCompanies,
  addCompany,
  companyExists,
  toggleCompanyStatus,
};

export default CompanyService;
