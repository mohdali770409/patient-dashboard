import { API } from "@/api";
import axios from "axios";

export const login = async (data: any) => {
  const url = `${API.domain}${API.endPoints.login}`;
  try {
    const response = await axios.post(url, data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

