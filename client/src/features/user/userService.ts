import axios, { CancelToken } from "axios";;

const API_URL = "https://localhost:7295/api/user/";


const emailExists = async (email: string) => {
  const response = await axios.get(API_URL + "EmailExists/" + email);
  return response;
};

const UserService = {
  emailExists,
};

export default UserService;
