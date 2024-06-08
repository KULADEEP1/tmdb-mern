import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
// const API_BASE_URL = "https://tmdb-backend-zetj.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signupAPI = async (userData) => {
  try {
    const response = await api.post("/signup", userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginAPI = async (userData) => {
  try {
    const response = await api.post("/login", userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addToFavoriteAPI = async (email, id, mediaType) => {
  try {
    const response = await api.post(`/addfavorite/${id}`, { email, mediaType });
    return response;
  } catch (error) {
    throw error;
  }
};

export const removeFavoriteAPI = async (email, id, mediaType) => {
  try {
    const response = await api.post(`/removefavorite/${id}`, {
      email,
      mediaType,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const addCommentAPI = async (email, id, mediaType, comment) => {
  try {
    const response = await api.post(`/addcomment/${id}`, {
      email,
      mediaType,
      comment,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllCommentsAPI = async (id, mediaType) => {
  try {
    const response = await api.post("/getallcomments", {id, mediaType });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteCommentAPI=async(commentId)=>{
  try {
    const response = await api.delete(`/deletecomment/${commentId}`);
    return response;
  } catch (error) {
    throw error;
  }
}
