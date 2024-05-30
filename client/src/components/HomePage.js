import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getPopularMoviesAPI,
  getPopularSeriesAPI,
  getTopRatedMoviesAPI,
  getTopRatedSeriesAPI,
} from "../utils/tmdb-api";
import DisplayMovie from "./DisplayMovie";
import { Grid, Header } from "semantic-ui-react";
import "../css/HomePage.css";

const HomePage = () => {
  const [popularMoviesList, setPopularMoviesList] = useState([]);
  const [popularSeriesList, setPopularSeriesList] = useState([]);
  const [topRatedMoviesList, setTopRatedMoviesList] = useState([]);
  const [topRatedSeriesList, setTopRatedSeriesList] = useState([]);

  const getPopularMovies = async () => {
    try {
      const response = await getPopularMoviesAPI();
      setPopularMoviesList(response.data.results.slice(0, 5));
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };

  const getPopularSeries = async () => {
    try {
      const response = await getPopularSeriesAPI();
      setPopularSeriesList(response.data.results.slice(0, 5));
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };

  const getTopRatedMovies = async () => {
    try {
      const response = await getTopRatedMoviesAPI();
      setTopRatedMoviesList(response.data.results.slice(0, 5));
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };

  const getTopRatedSeries = async () => {
    try {
      const response = await getTopRatedSeriesAPI();
      setTopRatedSeriesList(response.data.results.slice(0, 5));
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };

  useEffect(() => {
    getPopularMovies();
    getPopularSeries();
    getTopRatedMovies();
    getTopRatedSeries();
  }, []);

  return (
    <>
      <div className="home-page">
        {/* POPULAR MOVIES */}
        <div className="popular-movies">
          <Header
            style={{
              marginRight: "auto",
              fontSize: "2.5rem",
              marginLeft: "50px",
            }}
          >
            <span style={{ color: "white" }}>POPULAR &nbsp;&nbsp;</span>
            <span style={{ color: "red" }}>MOVIES</span>
          </Header>
          <Grid container stackable columns={5}>
            {popularMoviesList.map((movie,index) => (
              <Grid.Column
                key={index}
                style={{ width: "250px", marginRight: "-20px" }}
              >
                <DisplayMovie movie={movie} type="movie" />
              </Grid.Column>
            ))}
          </Grid>
        </div>

        {/* POPULAR SERIES */}
        <div className="popular-series">
          <Header
            style={{
              marginRight: "auto",
              fontSize: "2.5rem",
              marginLeft: "50px",
            }}
          >
            <span style={{ color: "white" }}>POPULAR &nbsp;&nbsp;</span>
            <span style={{ color: "red" }}>TV shows</span>
          </Header>
          <Grid container stackable columns={5}>
            {popularSeriesList.map((movie,index) => (
              <Grid.Column
                key={index}
                style={{ width: "250px", marginRight: "-20px" }}
              >
                <DisplayMovie movie={movie} type="tv" />
              </Grid.Column>
            ))}
          </Grid>
        </div>

        {/* TOP RATED MOVIES */}
        <div className="top-rated-movies">
          <Header
            style={{
              marginRight: "auto",
              fontSize: "2.5rem",
              marginLeft: "50px",
            }}
          >
            <span style={{ color: "white" }}>TOP RATED &nbsp;&nbsp;</span>
            <span style={{ color: "red" }}>MOVIES</span>
          </Header>
          <Grid container stackable columns={5}>
            {topRatedMoviesList.map((movie,index) => (
              <Grid.Column
                key={index}
                style={{ width: "250px", marginRight: "-20px" }}
              >
                <DisplayMovie movie={movie} type="movie" />
              </Grid.Column>
            ))}
          </Grid>
        </div>

        {/* TOP RATED SERIES */}
        <div className="top-rated-series">
          <Header
            style={{
              marginRight: "auto",
              fontSize: "2.5rem",
              marginLeft: "50px",
            }}
          >
            <span style={{ color: "white" }}>TOP RATED &nbsp;&nbsp;</span>
            <span style={{ color: "red" }}>TV shows</span>
          </Header>
          <Grid container stackable columns={5}>
            {topRatedSeriesList.map((movie,index) => (
              <Grid.Column
                key={index}
                style={{ width: "250px", marginRight: "-20px" }}
              >
                <DisplayMovie movie={movie} type="tv" />
              </Grid.Column>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default HomePage;
