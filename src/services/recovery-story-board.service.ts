import { API } from "@/api";
import axios from "axios";

export const createUpdateRecoveryBoard = async (data: any) => {
  const url = `${API.domain}${API.endPoints.createEditRecoveryUpdate}`;

  try {
    const response = await axios.post(url, data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};


export const getSingleRecoveryUpdate = async (id: any) => {
    const url = `${API.domain}${API.endPoints.getSingleRecoveryUpdate}/${id}`;
  
    try {
      const response = await axios.get(url);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };