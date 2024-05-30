import axios from "axios";

const TMDB_API_BASE_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=be50459128aaf39966c5365d7a8b2f2f";

const api = axios.create({
  baseURL: TMDB_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const getMoviesAPI=async()=>{
    try {
        const response=await api.get();
        return response;
    } catch (error) {
        throw error;
    }
}