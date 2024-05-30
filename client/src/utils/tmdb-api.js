import axios from "axios";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = "be50459128aaf39966c5365d7a8b2f2f";

const api = axios.create({
  baseURL: TMDB_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPopularMoviesAPI = async () => {
  try {
    const response = await api.get(`/movie/popular?api_key=${TMDB_API_KEY}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPopularSeriesAPI = async () => {
  try {
    const response = await api.get(`/tv/popular?api_key=${TMDB_API_KEY}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTopRatedMoviesAPI=async()=>{
  try {
    const response=await api.get(`/movie/top_rated?api_key=${TMDB_API_KEY}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export const getTopRatedSeriesAPI=async()=>{
  try {
    const response=await api.get(`/tv/top_rated?api_key=${TMDB_API_KEY}`);
    return response;
  } catch (error) {
    throw error;
  }
}

