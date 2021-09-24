import React from "react";

export default function PopularMovie() {
  const [titleID , setTitleID] = React.useState([])
  React.useEffect(() => {
    function getPopularMovie() {
      fetch(
        "https://imdb8.p.rapidapi.com/title/get-most-popular-movies?",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "d4225d746amsh3c36ac6a4dcaf9ep1c2235jsnfe11e2c62954",
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
          },
        }
      )
        .then((response => response.json()))
        .then((data)=> {
          console.log("popular",data);
          const apiResponse = [];
          apiResponse.push(data);
          const arr = apiResponse.toString();
          const title = arr.split("/")
          console.log("title" , title)
          const titleID = [];
          title.forEach((value) => {
            //console.log("value" , value);
            if (value.startsWith("tt")) {
              titleID.push({ tt: value });
            }
          });
          console.log("titleID", titleID);
        })
        .catch((err) => {
          console.error(err);
        })
    }
    getPopularMovie();
  },[]);

  return <div></div>;
}
