// import React, { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import { getMovieDataAPI } from "../utils/tmdb-api";
// import { toast } from "react-toastify";
// const MediaDetail = () => {
//   const location = useLocation();
//   const type = location.pathname.split("/")[1];
//   const [media,setMedia]=useState({});
//   const { id } = useParams();
//   const fetchData = async () => {
//     try {
//       const response = await getMovieDataAPI(id, type);
//       console.log(response.data);
//       setMedia(response.data);
//     } catch (error) {
//       toast.error("Error while fetching data");
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, [id]);

//   return <div>MediaDetail</div>;
// };

// export default MediaDetail;

import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getMovieDataAPI } from "../utils/tmdb-api";
import { toast } from "react-toastify";
import { Icon } from "semantic-ui-react";
import "../css/MediaDetail.css";
import CircularRate from "./CircularRate";
const MediaDetail = () => {
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const [media, setMedia] = useState({});
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await getMovieDataAPI(id, type);
      setMedia(response.data);
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <div
        className="media-detail"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`,
        }}
      >
        <div className="media-detail-content">
          <img
            src={`https://image.tmdb.org/t/p/w300${media.poster_path}`}
            alt={`${media.title} poster`}
            className="media-detail-poster"
          />
          <div className="media-detail-info">
            <h1>{media.title} </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <p>
                <CircularRate value={media.vote_average / 10} />
              </p>
              <p>
                <div className="genres-container">
                  {media.genres?.map((genre) => (
                    <div key={genre.id} className="genre-item">
                      {genre.name}
                    </div>
                  ))}
                </div>
              </p>
            </div>
              <p style={{fontSize:"15px"}}>
                {media.overview}
              </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaDetail;
