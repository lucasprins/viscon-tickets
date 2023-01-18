import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}auth/`;

const login = async (email: string, password: string) => {
  const response = await axios.post(API_URL + "login", {
    email,
    password,
  });
  if (response) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response;
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = async (password: string, phoneNumber: string, token: string) => {
  const response = await axios.post(
    `${API_URL}registerUser?registrationToken=${token}`,
    {
      password,
      phoneNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

const AuthService = {
  login,
  logout,
  register,
};

export default AuthService;
