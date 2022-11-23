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

const companyExists = async (name: string) => {
  const response = await axios.get(API_URL + "CompanyExists/" + name);
  return response;
};

const toggleCompanyStatus = async (companyId: string, accessToken: string) => {
  const response = await axios.get(API_URL + "ToggleCompanyStatus/" + companyId, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}

const addCompany = async (
  accessToken: string,
  companyName: string,
  companyCountry: string,
  adminFirstName: string,
  adminPrefix: string,
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
        prefix: adminPrefix,
        lastName: adminLastName,
        email: adminEmail,
        role: "CustomerAdmin",
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
