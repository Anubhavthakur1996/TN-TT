import axios from "axios";

const baseURL = "http://localhost:1234/";

const returnWithToken = async (token) =>
  (axios.defaults.headers.post["Authorization"] = `Bearer ${token}`);

export const addToHot = async (item, token) => {
  await returnWithToken(token);
  try {
    const response = await axios.post(`${baseURL}addHot`, {
      item,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    return error;
  }
};

export const getHotNews = async (token) => {
  // await returnWithToken(token);
  try {
    const response = await axios.get(`${baseURL}getHot`, {
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
