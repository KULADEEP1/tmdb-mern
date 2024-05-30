import React, { useEffect, useState } from "react";
import { getSeriesAPI } from "../utils/tmdb-api";
import { toast } from "react-toastify";
import { Loader, Header, Grid, Button, Icon } from "semantic-ui-react";
import DisplayMovie from "./DisplayMovie";

const TvShowsList = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [displayedSeries, setDisplayedSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const seriesPerPage = 15;

  const getSeriesList = async () => {
    setIsLoading(true);
    try {
      let series = [];
      for (let page = 1; page <= 5; page++) {
        const response = await getSeriesAPI(page);
        series = [...series, ...response.data.results];
      }
      setSeriesList(series);
      setDisplayedSeries(series.slice(0, seriesPerPage));
    } catch (error) {
      toast.error("Error while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSeriesList();
  }, []);

  const handleLoadMore = () => {
    setIsLoadMoreLoading(true);
    setTimeout(() => {
      const newPage = currentPage + 1;
      const newSeries = seriesList.slice(0, newPage * seriesPerPage);
      setDisplayedSeries(newSeries);
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
        <div className="series">
          <Header
            style={{
              marginRight: "auto",
              fontSize: "2.5rem",
              marginLeft: "50px",
            }}
          >
            <span style={{ color: "white" }}>ALL &nbsp;&nbsp;</span>
            <span style={{ color: "red" }}>TV shows</span>
          </Header>
          <Grid container stackable columns={5}>
            {displayedSeries.map((movie) => (
              <Grid.Column
                key={movie.id}
                style={{ width: "250px", marginRight: "-20px" }}
              >
                <DisplayMovie movie={movie} type="tv" />
              </Grid.Column>
            ))}
          </Grid>
          {displayedSeries.length < seriesList.length && (
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

export default TvShowsList;
