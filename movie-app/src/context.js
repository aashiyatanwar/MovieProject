import React, { useState, useContext } from "react";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setloading] = useState(true);
  const [searchTerm, setsearchTerm] = useState("");
  const [movies, setmovies] = useState([]);

  const fetchMovies = () => {
    setloading(true);
    fetch(`https://imdb8.p.rapidapi.com/title/find?q=${searchTerm}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "d4225d746amsh3c36ac6a4dcaf9ep1c2235jsnfe11e2c62954",
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const apiresponse = data.results;
        console.log(apiresponse);

        if (apiresponse) {
          const newMovies = [];
          apiresponse.map((item) => {
            if (!("knownFor" in item)) {
              const { id, titleType, image, title, year } = item;
              newMovies.push({
                id: id.substr(7, id.length - 1),
                name: title,
                image: image
                  ? image.url
                  : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
                titleType: titleType,
                year: year,
              });
            }
          });
          console.log(newMovies);
          setmovies(newMovies);
        } else {
          setmovies([]);
        }
        setloading(false);
      })
      .catch((err) => {
        console.error(err);
        setloading(false);
      });
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        searchTerm,
        movies,
        setsearchTerm,
        setmovies,
        setloading,
        fetchMovies,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
