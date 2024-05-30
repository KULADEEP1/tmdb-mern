import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMoviesAPI } from "../utils/tmdb-api";
const HomePage = () => {
  const [moviesList, setMoviesList] = useState("");

  const getMovies = async () => {
    try {
      const response = await getMoviesAPI();
      console.log(response.data.results);
      setMoviesList(response.data.results);
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return <div>HomePage</div>;
};

export default HomePage;
