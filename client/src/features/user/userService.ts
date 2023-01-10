import axios from "axios";
import { authHeader } from "../auth/authHeader";

const API_URL = `${process.env.REACT_APP_API_URL}user/`;

const getUsers = async () => {
  const response = await axios.get(API_URL + "GetUsers", {
    headers: authHeader(),
  });
  return response;
};

const addUser = async (firstName: string, lastName: string, email: string, role: string, companyId: string) => {
  console.table({ firstName, lastName, email, role, companyId });

  const response = await axios.post(
    API_URL + "AddUser",
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
      companyId: companyId,
    },
    {
      headers: authHeader(),
    }
  );
  return response;
};

const toggleUserStatus = async (userId: string) => {
  console.log(userId);
  const response = await axios.put(
    API_URL + "ToggleUserStatus/" + userId,
    {},
    {
      headers: authHeader(),
    }
  );

  return response;
};

const changeUserRole = async (userId: string) => {
  const response = await axios.put(
    API_URL + "ChangeUserRole/" + userId,
    {},
    {
      headers: authHeader(),
    }
  );

  return response;
};

const emailExists = async (email: string) => {
  const response = await axios.get(API_URL + "EmailExists/" + email);
  return response;
};

const changePhoneNumber = async (userId: string, phoneNumber: string) => {
  const response = await axios.put(
    API_URL + "ChangePhoneNumber/" + userId + "/" + phoneNumber,
    {},
    {
      headers: authHeader(),
    }
  );

  return response;
};

const changeEmail = async (userId: string, email: string) => {
  const response = await axios.put(
    API_URL + "ChangeEmail/" + userId + "/" + email,
    {},
    {
      headers: authHeader(),
    }
  );

  return response;
};

const UserService = {
  getUsers,
  addUser,
  toggleUserStatus,
  changeUserRole,
  emailExists,
  changePhoneNumber,
  changeEmail,
};

export default UserService;
