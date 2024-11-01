import { API } from "@/api";
import axios from "axios";

export const addEditPatientBasicDetails = async (data: any) => {
  console.log("Environment Domain:", process.env.NEXT_PUBLIC_DOMAIN);
  const url = `${API.domain}${API.endPoints.addEditPatientBasicDetails}`;
  console.log(url);
  try {
    const response = await axios.post(url, data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const addEditPatientAdvancedDetails = async (data: any) => {
  console.log("Environment Domain:", process.env.NEXT_PUBLIC_DOMAIN);
  const url = `${API.domain}${API.endPoints.addEditPatientAdvancedDetails}`;
  console.log(url);
  try {
    const response = await axios.post(url, data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPatientsData = async () => {
  console.log("Environment Domain:", process.env.NEXT_PUBLIC_DOMAIN);
  const url = `${API.domain}${API.endPoints.getAllPatients}`;
  console.log(url);
  try {
    const response = await axios.get(url);
    return response?.data?.patients;
  } catch (error) {
    console.log(error);
  }
};

export const getPatientDataById = async (id: string) => {
  console.log("Environment Domain:", process.env.NEXT_PUBLIC_DOMAIN);
  const url = `${API.domain}${API.endPoints.getPatientsDetails}/${id}`;
  console.log(url);
  try {
    const response = await axios.get(url);
    return response?.data?.patients;
  } catch (error) {
    console.log(error);
  }
};

export const deletePatient = async (id: {id: string}) => {
  const url = `${API.domain}${API.endPoints.deletePatient}`;
  console.log(url);
  try {
    const response = await axios.post(url,  id );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addEditPatientOngoingTreatment = async (data: any) => {
  console.log("Environment Domain:", process.env.NEXT_PUBLIC_DOMAIN);
  const url = `${API.domain}${API.endPoints.addEditPatientOngoingTreatment}`;
  console.log(url);
  try {
    const response = await axios.post(url, data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
