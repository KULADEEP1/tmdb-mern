import React from "react";
import { Card, Image, Icon, Button } from "semantic-ui-react";
import "../css/DisplayMovie.css";
import CircularRate from "./CircularRate";

const DisplayMovie = ({ movie }) => {
  return (
    <Card className="movie-card" style={{borderRadius: "0px"}}>
      <div className="image-container">
        <Image
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} // Adjusted image size
          alt={movie.title}
          wrapped
          ui={false}
        />
        <div className="overlay">
          <div className="movie-details">
            <div style={{marginTop:"150px",marginLeft:"20px"}}>
            <div className="movie-title">{!movie.title ? movie.name :movie.title}</div>
              <div className="movie-info">
                <div className="rating">
                  <CircularRate value={movie.vote_average / 10} />
                </div>
              </div>
              <Button as="a" color="red">
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