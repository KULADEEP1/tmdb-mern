import React, { useEffect, useState } from "react";
import { getMoviesAPI } from "../utils/tmdb-api";
import { toast } from "react-toastify";
import { Loader, Header, Grid, Button, Icon } from "semantic-ui-react";
import DisplayMovie from "./DisplayMovie";

const MoviesList = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 15;

  const getMoviesList = async () => {
    setIsLoading(true);
    try {
      let movies = [];
      for (let page = 1; page <= 5; page++) {
        const response = await getMoviesAPI(page);
        movies = [...movies, ...response.data.results];
      }
      setMoviesList(movies);
      setDisplayedMovies(movies.slice(0, moviesPerPage));
    } catch (error) {
      toast.error("Error while fetching data");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    getMoviesList();
  }, []);

  const handleLoadMore = () => {
    setIsLoadMoreLoading(true);
    setTimeout(() => {
      const newPage = currentPage + 1;
      const newMovies = moviesList.slice(0, newPage * moviesPerPage);
      setDisplayedMovies(newMovies);
      setCurrentPage(newPage);
      setIsLoadMoreLoading(false);
    }, 1000);
  };

  return (
    <div>
      {isLoading ? (
        <Loader active inline="centered">
          Loading...
        </Loader>
      ) : (
        <div className="movies">
          <Header
            style={{
              marginRight: "auto",
              fontSize: "2.5rem",
              marginLeft: "50px",
            }}
          >
            <span style={{ color: "white" }}>ALL &nbsp;&nbsp;</span>
            <span style={{ color: "red" }}>MOVIES</span>
          </Header>
          <Grid container stackable columns={5}>
            {displayedMovies.map((movie) => (
              <Grid.Column
                key={movie.id}
                style={{ width: "250px", marginRight: "-20px" }}
              >
                <DisplayMovie movie={movie} type="movie" />
              </Grid.Column>
            ))}
          </Grid>
          {displayedMovies.length < moviesList.length && (
            <div style={{ textAlign: "center", margin: "20px" }}>
              <Button
                color="red"
                onClick={handleLoadMore}
                loading={isLoadMoreLoading}
                disabled={isLoadMoreLoading}
                style={{ width: "150px", marginBottom: "10px" }}
              >
                <Icon name="plus" />
                Load More
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoviesList;
