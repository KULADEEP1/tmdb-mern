import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getMediaDataAPI } from "../utils/tmdb-api";
import { toast } from "react-toastify";
import CircularRate from "./CircularRate";
import "../css/MediaDetail.css";
import { Loader } from "semantic-ui-react";
import CastSlide from "./CastSlide";
import { Grid } from "semantic-ui-react";
import DisplayMovie from "./DisplayMovie";

const MediaDetail = () => {
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const [media, setMedia] = useState({});
  const [casts, setCasts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await getMediaDataAPI(id, type);
      setMedia(response.details);
      setCasts(response.popularCast.slice(0, 5));
      setRecommendations(response.recommendations.results.slice(0, 5));
      console.log(response.recommendations.results);
    } catch (error) {
      toast.error("Error while fetching data");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    // window.location.reload();
    setLoading(true);
    fetchData();
  }, [id]);

  return (
    <div className="media-detail">
      {loading ? (
        <Loader style={{ marginTop: "100px" }} active inline="centered">
          Loading...
        </Loader>
      ) : (
        <>
          <div
            className="media-detail-background"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`,
            }}
          ></div>
          <div className="media-detail-content">
            <img
              src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
              alt={`${media.title} poster`}
              className="media-detail-poster"
            />
            <div className="media-detail-info">
              <h1>{!media.title ? media.name : media.title}</h1>
              <div className="media-detail-meta">
                <CircularRate value={media.vote_average / 10} />
                <div className="genres-container">
                  {media.genres?.map((genre) => (
                    <div key={genre.id} className="genre-item">
                      {genre.name}
                    </div>
                  ))}
                </div>
              </div>
              <p className="media-detail-overview">
                {!media.overview
                  ? "Nothing to Show..not disclosed yet"
                  : media.overview}
              </p>
            </div>
          </div>
          <h2 className="cast-heading">CAST INFO</h2>
          <Grid container stackable columns={5}>
            {!casts.length > 0 ? (
              <h1>No Cast Information....</h1>
            ) : (
              casts.map((cast) => (
                <Grid.Column
                  key={cast.id}
                  style={{ width: "250px", marginRight: "-30px" }}
                >
                  <CastSlide cast={cast} />
                </Grid.Column>
              ))
            )}
          </Grid>
          <h2 className="recommendations-heading">You may also like</h2>
          <Grid container stackable columns={5}>
            {recommendations.map((movie) => (
              <Grid.Column
                key={movie.id}
                style={{ width: "250px", marginRight: "-20px" }}
              >
                <DisplayMovie movie={movie} type="movie" />
              </Grid.Column>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default MediaDetail;
