import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getMovieDataAPI } from "../utils/tmdb-api";
import { toast } from "react-toastify";
import CircularRate from "./CircularRate";
import "../css/MediaDetail.css";

const MediaDetail = () => {
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const [media, setMedia] = useState({});
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await getMovieDataAPI(id, type);
      setMedia(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="media-detail">
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
          <p className="media-detail-overview">{!media.overview?"Nothing to Show..not dislosed yet":media.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MediaDetail;
