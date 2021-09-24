import React from "react";
import MovieList from "./MovieList";
import SearchForm from "./SearchForm";
import PopularMovie from "./PopularMovie";

const Home = () => {
  return (
    <main>
      <SearchForm />
      <PopularMovie/>
      <MovieList />
    </main>
  );
};

export default Home;
