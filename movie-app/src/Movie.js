import React from "react";
import { Link } from "react-router-dom";

export default function Movie({ image, name, id, titleType, year }) {
  return (
    <article className="movie">
      <div className="movie img">
        <img src={image} alt={image} />
      </div>
      <div className="movie-footer">
        <h3>{name}</h3>
        <h4>{titleType}</h4>
        <p>{year}</p>
        {titleType === "movie" ? (
          <Link to={`/movie/${id}`} className="btn btn-primary btn-details">
            details
          </Link>
        ) : (
          <Link to={`/tvSeries/${id}`} className="btn btn-primary btn-details">
            details
          </Link>
        )}
      </div>
    </article>
  );
}
