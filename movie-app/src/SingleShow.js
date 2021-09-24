import React from "react";
import Loading from "./Loading";
import { useParams, Link } from "react-router-dom";
import MainReview from "./MainReview";
import { Card } from "@material-ui/core";
import MainImages from './MainImages'
import Videos from './Videos'
import DidYouKnow from "./DidYouKnow";
import TopCast from "./TopCast";


export default function SingleShow() {
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = React.useState(false);
  const [plot, setPlot] = React.useState("");
  const [details, setDetails] = React.useState({});
  const [showLess, setShowLess] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    async function getPlot() {
      fetch(`https://imdb8.p.rapidapi.com/title/get-synopses?tconst=${id}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d4225d746amsh3c36ac6a4dcaf9ep1c2235jsnfe11e2c62954",
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const plot = data[0] ? data[0].text : "";
          console.log('plot' , plot)
          setPlot(plot);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }

    async function getDetails() {
      fetch(`https://imdb8.p.rapidapi.com/title/get-meta-data?ids=${id}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d4225d746amsh3c36ac6a4dcaf9ep1c2235jsnfe11e2c62954",
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const info = {
            image: data[id].title.image
              ? data[id].title.image.url
              : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
            title: data[id].title.title,
            titleType: data[id].title.titleType,
            year: data[id].title.year ? data[id].title.year : "Not available",
            rating: data[id].ratings.rating
              ? data[id].ratings.rating
              : "Not available",
            topRank: data[id].ratings.topRank
              ? data[id].ratings.topRank
              : "Not available",
            releaseDate: data[id].releaseDate
              ? data[id].releaseDate
              : "Not available",
            numberOfEpisodes: data[id].title.numberOfEpisodes
              ? data[id].title.numberOfEpisodes
              : "Not available",
            seriesStartYear: data[id].title.seriesStartYear
              ? data[id].title.seriesStartYear
              : "Not available",
            seriesEndYear: data[id].title.seriesEndYear
              ? data[id].title.seriesEndYear
              : "Not available",
          };
          setDetails(info);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
    
    getDetails();
    getPlot();
  }, []);

  if (loading) {
    return <Loading />;
  }
  const {
    image,
    titleType,
    title,
    year,
    rating,
    topRank,
    releaseDate,
    seriesEndYear,
    seriesStartYear,
    numberOfEpisodes,
  } = details;
  console.log(details);

  return (
    <section className="section movie-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <section className="section-title">
        <h2>{title}</h2>
        <div className="underline"></div>
      </section>
      <div className="single-movie">
        <img src={image} alt={image} className="img"></img>
        <div className="single-movie-info">
          <p>
            <span className="single-movie-data">Title Type:</span> {titleType}
          </p>
          <p>
            <span className="single-movie-data">Year:</span> {year}
          </p>
          <p>
            <span className="single-movie-data">Release date:</span>{" "}
            {releaseDate}
          </p>
          <p>
            <span className="single-movie-data">Running Time:</span>{" "}
            {seriesStartYear} - {seriesEndYear}
          </p>
          <p>
            <span className="single-movie-data">Number of Episodes:</span>{" "}
            {numberOfEpisodes}
          </p>
          <p>
            <span className="single-movie-data">Rating:</span> {rating}
          </p>
          <p>
            <span className="single-movie-data">Top Rank:</span> {topRank}
          </p>
        </div>
      </div>
      <div>
      {plot === "" ? (
          " "
        ) : (
          <Card>
            <section className="section-title">
              <h3 style={{ color: "black" }}>Storyline</h3>
              <div className="underline"></div>
            </section>
            <div className="plot">
              <p> {showLess ? `${plot.slice(0, 500)}` : plot}</p>
              {plot === "" ? (
                " "
              ) : (
                <>
                  <a
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => setShowLess(!showLess)}
                  >
                    Read {showLess ? "More" : "Less"}
                  </a>
                </>
              )}
            </div>
          </Card>
        )}
      </div>
      <div>{<TopCast/>}</div>
      <div>{<MainReview />}</div>
      <div>{<MainImages/>}</div>
      <div>{<DidYouKnow/>}</div>
    </section>
  );
}
