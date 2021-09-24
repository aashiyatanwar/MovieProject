import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@material-ui/core";
import { FaChevronRight } from "react-icons/fa";

export default function MainCrazyCredits() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState([]);
  const [creditsToShow, setCreditsToShow] = useState([]);

  React.useEffect(() => {
    setLoading(true);
    function getCredits() {
      fetch(
        `https://imdb8.p.rapidapi.com/title/get-crazycredits?tconst=${id}`,
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
          console.log("data", data);
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
            setCreditsToShow(newCredits.slice(0, 1));
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

  const renderCredits = () => {
    return (
      <div>
        {creditsToShow.length === 0 ? (
          " "
        ) : (
          <div>
            <Card>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "0.04fr 0.04fr",
                  gridGap: "2px",
                }}
              >
                <div
                  className="section-title"
                  style={{
                    marginBottom: "0rem",
                    textAlign: "left",
                    marginTop: "3.5rem",
                    paddingLeft: "2rem",
                  }}
                >
                  <h3
                    style={{
                      color: "black",
                      marginBottom: "0rem",
                    }}
                  >
                    Crazycredits
                  </h3>
                  <div
                    className="underline"
                    style={{ marginLeft: "0", marginRight: "0" , width:"18rem" }}
                  ></div>
                </div>
                <div className="next-btn">
                  <Link
                    to={`/credits/${id}`}
                    className="btn btn-primary btn-details"
                    target="_blank"
                  >
                    <span style={{ size: "7rem" }}>
                      <FaChevronRight />
                    </span>
                  </Link>
                </div>
              </div>
            </Card>
            <Card>
              {creditsToShow.map((item, index) => {
                return (
                  <div className="trivia" key={index}>
                    <Card>
                      <p>{item.text}</p>
                    </Card>
                  </div>
                );
              })}
            </Card>
          </div>
        )}
      </div>
    );
  };

  return <div>{renderCredits()}</div>;
}
