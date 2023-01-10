import axios, { CancelToken } from "axios";
import { authHeader } from "../features/auth/authHeader";

const API_URL = `${process.env.REACT_APP_API_URL}solution/`;

const getSolutions = async (issueId: string, cancelToken: CancelToken) => {
  const response = await axios.get(`${API_URL}GetSolutions/${issueId}`, {
    headers: authHeader(),
    cancelToken: cancelToken,
  });
  return response;
};

const addSolution = async (issueId: string, solution: string) => {
  const response = await axios.post(
    API_URL + "AddSolution/",
    {
      issueId: issueId,
      description: solution,
    },
    {
      headers: authHeader(),
    }
  );
  return response;
};

const deleteSolution = async (solutionId: string) => {
  const response = await axios.delete(API_URL + "DeleteSolution/" + solutionId, {
    headers: authHeader(),
  });
  return response;
};

const SolutionService = {
  getSolutions,
  addSolution,
  deleteSolution,
};

export default SolutionService;
