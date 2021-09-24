import React from "react";
import { useParams } from "react-router-dom";
import { Card } from "@material-ui/core";
import Loading from "./Loading";

export default function TopCast() {
  const { id } = useParams();
  const [castId, setCastId] = React.useState([]);
  const [cast, setCast] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const newCast = [];

  React.useEffect(() => {
    setLoading(true);
    function getCast() {
      fetch(`https://imdb8.p.rapidapi.com/title/get-top-cast?tconst=${id}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d4225d746amsh3c36ac6a4dcaf9ep1c2235jsnfe11e2c62954",
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("dataCast", data);
          const apiResponse = [];
          apiResponse.push(data);
          const arr = apiResponse.toString();
          const cast = arr.split("/");
          console.log("castArr", cast);
          const castID = [];
          cast.forEach((value) => {
            //console.log("value" , value);
            if (value.startsWith("nm")) {
              castID.push({ cID: value });
            }
          });
          console.log("castId", castID);
          setCastId(castID.slice(0, 3));
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
    getCast();
  }, []);

  React.useEffect(() => {
    setLoading(true);
    castId.map((ids) => {
      fetch(
        `https://imdb8.p.rapidapi.com/title/get-charname-list?id=${ids.cID}&tconst=${id}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "d4225d746amsh3c36ac6a4dcaf9ep1c2235jsnfe11e2c62954",
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("charnameData", data);
          const apiResponse = data[ids.cID].charname;
          console.log("apiResponse", apiResponse);
          if (apiResponse) {
            apiResponse.map((item) => {
              const {
                characters,
                endYear,
                episodeCount,
                image,
                name,
                startYear,
              } = item;
              newCast.push({
                charname: characters ? characters : "Not available",
                endYear: endYear ? endYear : "Not available",
                startYear: startYear ? startYear : "Not available",
                episodeCount: episodeCount ? episodeCount : "Not available",
                image: image.url
                  ? image.url
                  : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
                name: name ? name : "Not available",
              });
            });
          }
          setLoading(false);
        });
    });

    setCast(newCast);
    console.log("cast", newCast);
  }, [castId]);

  return (
    <div>
      <Card>
        <section className="section-title">
          <h3 style={{ color: "black" }}>Cast</h3>
          <div className="underline"></div>
        </section>
      </Card>
      <Card>
        {cast.map((item, index) => {
          return (
            <div key={index}>
              <div className="single-movie">
                <img
                  src={item.image}
                  alt={item.image}
                  className="person-img"
                ></img>
                <div className="single-movie-info" style={{ color: "black" }}>
                  <p>
                    <span className="single-movie-data"></span> {item.name}
                  </p>
                  <p>
                    <span className="single-movie-data"></span> {item.charname}
                  </p>
                  <p>
                    <span className="single-movie-data"></span> {item.startYear}
                    -{item.endYear}
                  </p>
                  <p>
                    <span className="single-movie-data"></span>
                    {item.episodeCount}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
