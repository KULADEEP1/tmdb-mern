import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMediaDataAPI } from "../utils/tmdb-api";
import {
  addToFavoriteAPI,
  removeFavoriteAPI,
  getAllCommentsAPI,
} from "../utils/api";
import CircularRate from "./CircularRate";
import CastSlide from "./CastSlide";
import DisplayMovie from "./DisplayMovie";
import CommentForm from "./comments/CommentForm";
import CommentList from "./comments/CommentList";
import "../css/MediaDetail.css";
import { Loader, Grid, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";

const MediaDetail = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const [media, setMedia] = useState({});
  const [casts, setCasts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await getMediaDataAPI(id, type);
      setMedia(response.details);
      setCasts(response.popularCast.slice(0, 5));
      setRecommendations(response.recommendations.results.slice(0, 5));
    } catch (error) {
      toast.error("Error while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    try {
      const email = user.userInfo.email;
      const mediaType = type;
      if (isFavorite) {
        const response = await removeFavoriteAPI(email, id, mediaType);
        if (response.status === 201) {
          setIsFavorite(false);
          toast.success("Successfully removed from Favorites!");
          const userFavoritesList = JSON.parse(
            localStorage.getItem("userFavorites")
          );
          const updatedFavorites = userFavoritesList.filter(
            (fav) => !(fav.mediaId === id && fav.mediaType === type)
          );
          localStorage.setItem(
            "userFavorites",
            JSON.stringify(updatedFavorites)
          );
        }
      } else {
        const response = await addToFavoriteAPI(email, id, mediaType);
        if (response.status === 201) {
          setIsFavorite(true);
          toast.success("Successfully added to Favorites");
          const newFavorite = {
            mediaId: id,
            mediaType: type,
          };
          const userFavoritesList =
            JSON.parse(localStorage.getItem("userFavorites")) || [];
          localStorage.setItem(
            "userFavorites",
            JSON.stringify([...userFavoritesList, newFavorite])
          );
        }
      }
    } catch (error) {
      toast.error("Could not perform the operation!");
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getAllCommentsAPI(id, type);
        setComments(response.data.comments.slice().reverse());
      } catch (error) {
        console.log(error);
        return;
      }
    };
    fetchComments();
  }, [id, type]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [id, type]);

  useEffect(() => {
    const userFavoritesList = JSON.parse(localStorage.getItem("userFavorites"));
    if (userFavoritesList) {
      const favorite = userFavoritesList.find(
        (fav) => fav.mediaId === id && fav.mediaType === type
      );
      setIsFavorite(!!favorite);
    } else {
      setIsFavorite(false);
    }
  }, [id, type]);
 const handleNewComment = (newComment) => {
   setComments((prevComments) => [newComment,...prevComments]);
 };
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
              <Icon
                onClick={handleFavorite}
                name={isFavorite ? "heart" : "heart outline"}
                className="large"
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  color: isFavorite ? "green" : "white",
                }}
              />
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
                <DisplayMovie movie={movie} type={movie.media_type} />
              </Grid.Column>
            ))}
          </Grid>
          <CommentForm
            mediaType={type}
            id={id}
            onNewComment={handleNewComment}
          />
          <CommentList
            comments={comments}
            setComments={setComments}
          />
        </>
      )}
    </div>
  );
};

export default MediaDetail;
