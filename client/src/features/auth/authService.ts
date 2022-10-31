import axios from "axios";

const API_URL = "https://localhost:7295/api/auth/";

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

const AuthService = {
    login,
    logout,
};

export default AuthService;
