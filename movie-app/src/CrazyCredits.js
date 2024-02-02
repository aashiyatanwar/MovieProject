import React from "react";
import { useParams} from "react-router-dom";
import { Card } from "@material-ui/core";

export default function MainCrazyCredits() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [info, setInfo] = React.useState({});
  const [credits, setCredits] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    function getCredits() {
      fetch(
        `https://imdb8.p.rapidapi.com/title/get-crazycredits?tconst=${id}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "6c8a14bc4emsh8f861d6c77a91e6p1e1bd5jsnfcd3fe38fba3",
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          const newInfo = {
            title: data.title,
            titleType: data.titleType,
            year: data.year,
          };
          console.log("newInfo", newInfo);
          setInfo(newInfo);

          const apiResponse = data.crazycredits;
          console.log(apiResponse);
          if (apiResponse) {
            const newCredits = [];
            apiResponse.map((item) => {
              const { text } = item;
              newCredits.push({
                text: text,
              });
            });
            console.log("newCredits", newCredits);
            setCredits(newCredits);
          } else {
            setCredits([]);
          }

          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
    getCredits();
  }, []);

  const { title, titleType, year } = info;
  console.log("info", info);

  const renderCredits = () => {
    return (
      <div>
        <Card>
          <div
            className="section-title"
            style={{ textAlign: "left", marginTop: "2rem" }}
          >
            <h3
              style={{ textAlign: "left", color: "black", paddingLeft: "2rem" }}
            >
              {title}
            </h3>
          </div>
          <div
            className="underline"
            style={{ marginLeft: "2rem", marginRight: "2rem" }}
          ></div>
          <div>
            <h5
              style={{ textAlign: "left", color: "black", paddingLeft: "2rem" }}
            >
              {titleType}
            </h5>
            <h5
              style={{ textAlign: "left", color: "black", paddingLeft: "2rem" }}
            >
              {year}
            </h5>
          </div>
        </Card>
        <div style={{ marginBottom: "25rem" }}>
          <Card>
            {credits.map((item, index) => {
              return (
                <div
                  className="trivia"
                  key={index}
                  style={{ marginTop: "3rem" }}
                >
                  <p>{item.text}</p>
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Card>{renderCredits()}</Card>
    </div>
  );
}
