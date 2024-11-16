import { API } from "@/api";
import axios from "axios";

export const getAllAppointments = async () => {
  const url = `${API.domain}${API.endPoints.getAllAppointments}`;
  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const addEditAppointment = async (appointment:any) => {
  const url = `${API.domain}${API.endPoints.addEditAppointment}`;
  try {
    const response = await axios.post(url, appointment);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const getUpcomingAppointments = async () => {
  const url = `${API.domain}${API.endPoints.getUpcomingAppointments}`;
  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPastAppointments = async () => {
  const url = `${API.domain}${API.endPoints.getPastAppointments}`;
  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAppointmentsByDate = async (date: string) => {
  const url = `${API.domain}${API.endPoints.getAppointmentsByDate}/${date}`;
  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
