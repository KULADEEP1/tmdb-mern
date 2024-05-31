// import React from 'react'

// const CastSlide = ({cast}) => {
//   return (
//     <div>CastSlide</div>
//   )
// }

// export default CastSlide

import React from "react";
import "../css/CastSlide.css";

const CastSlide = ({ cast }) => {
  return (
    <div className="cast-slide">
      <img
        src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
        alt={`${cast.name}`}
        className="cast-photo"
      />
      <div className="cast-name">{cast.name}</div>
    </div>
  );
};

export default CastSlide;
