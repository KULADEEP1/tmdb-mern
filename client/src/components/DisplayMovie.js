import React from "react";
import { Card, Image, Icon, Button } from "semantic-ui-react";
import "../css/DisplayMovie.css";
import CircularRate from "./CircularRate";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const DisplayMovie = ({ movie, type }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handlePlayButton = () => {
    if (user.isAuthenticated) {
      const currentPath = location.pathname;
      const targetPath = `/${type}/${movie.id}`;
      if (currentPath !== targetPath) {
        navigate(targetPath);
      }
    } else navigate("/login");
  };

  return (
    <Card className="movie-card" style={{ borderRadius: "0px" }}>
      <div className="image-container">
        <Image
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          wrapped
          ui={false}
        />
        <div className="overlay">
          <div className="movie-details">
            <div style={{ marginTop: "150px", marginLeft: "20px" }}>
              <div className="movie-title">
                {!movie.title ? movie.name : movie.title}
              </div>
              <div className="movie-info">
                <div className="rating">
                  <CircularRate value={movie.vote_average / 10} />
                </div>
              </div>
              <Button onClick={handlePlayButton} as="a" color="red">
                <Icon name="play" /> View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DisplayMovie;
