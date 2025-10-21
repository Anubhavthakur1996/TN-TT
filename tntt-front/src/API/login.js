import axios from "axios";

const baseURL = "http://localhost:1234/";

export const loginAPI = async (username, password) => {
  try {
    const response = await axios.post(`${baseURL}login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    return error;
  }
};
