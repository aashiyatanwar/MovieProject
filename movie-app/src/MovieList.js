import React from "react";
import Loading from "./Loading";
import Movie from "./Movie";
import { useGlobalContext } from "./context";

const MovieList = () => {
  const { movies, loading } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  if (movies.length < 1) {
    return (
      <h2 className="section-title">no movies matched your search criteria</h2>
    );
  }
  return (
    <section className="section">
      <section className="section-title">
        <h3>Recommended Movies</h3>
        <div className="underline"></div>
      </section>

      <div className="movies-center">
        {movies.map((item) => {
          return <Movie key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default MovieList;
