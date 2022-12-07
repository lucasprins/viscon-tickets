import axios, { CancelToken } from "axios";
import { authHeader } from "../features/auth/authHeader";

const API_URL = `${process.env.REACT_APP_API_URL}issue/`;

const getIssues = async (machineId: string, cancelToken: CancelToken) => {
  const response = await axios.get(API_URL + "GetIssues/" + machineId, {
    headers: authHeader(),
    cancelToken: cancelToken,
  });
  return response;
};

const addIssue = async (machineId: string, issue: string) => {
  const response = await axios.post(
    API_URL + "AddIssue/",
    {
      machineId: machineId,
      description: issue,
    },
    {
      headers: authHeader(),
    }
  );
  return response;
};

const deleteIssue = async (issueId: string) => {
  const response = await axios.delete(API_URL + "DeleteIssue/" + issueId, {
    headers: authHeader(),
  });
  return response;
};

const IssueService = {
  getIssues,
  addIssue,
  deleteIssue,
};

export default IssueService;