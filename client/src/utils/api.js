import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signupAPI=async(userData)=>{
    try {
        const response=await api.post("/signup",userData);
        return response;
    } catch (error) {
        throw error;
    }
}

export const loginAPI=async(userData)=>{
  try {
    const response=await api.post("/login",userData);
    return response;
  } catch (error) {
    throw error;
  }
}
