import React from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { searchTerm, setsearchTerm, fetchMovies } = useGlobalContext();

  function handleSubmit(e) {
    console.log("Im clicked");
    e.preventDefault();
    fetchMovies();
  }

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your movies</label>
          <input
            type="text"
            name="name"
            id="name"
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
