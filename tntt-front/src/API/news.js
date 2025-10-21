import axios from "axios";

const baseURL = "http://localhost:1234/";

export const newsAPI = async (token) => {
  try {
    const response = await axios.get(`${baseURL}news`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Something went wrong:", error);
    return error;
  }
};
