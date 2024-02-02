import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@material-ui/core";
import { FaChevronRight } from "react-icons/fa";

export default function MainTrivia() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [trivia, setTrivia] = React.useState([]);
  const [triviaToShow, setTriviaToShow] = React.useState([]);
  const [offset, setOffset] = React.useState(1);

  React.useEffect(() => {
    setLoading(true);
    async function getTrivia() {
      fetch(`https://imdb8.p.rapidapi.com/title/get-trivia?tconst=${id}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d4225d746amsh3c36ac6a4dcaf9ep1c2235jsnfe11e2c62954",
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("trivia", data);
          const spoilt = data.spoilt;
          console.log("spoilt", spoilt);
          const unspoilt = data.unspoilt;
          console.log("unspoilt", unspoilt);
          const apiResponse = [...spoilt, ...unspoilt];
          console.log("apiResponse", apiResponse);
          if (apiResponse) {
            const newTrivia = [];
            apiResponse.map((item) => {
              const { text } = item;
              newTrivia.push({
                triviaText: text,
              });
            });
            console.log("newTrivia", newTrivia);
            setTrivia(newTrivia);
            setTriviaToShow(newTrivia.slice(0, offset));
          } else {
            setTrivia([]);
          }

          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }

    getTrivia();
  }, []);

  

  const renderTrivia = () => {
    return (
      <div>
        {triviaToShow.length === 0 ? (
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
                    Trivia
                  </h3>
                  <div
                    className="underline"
                    style={{ marginLeft: "0", marginRight: "0" }}
                  ></div>
                </div>
                <div className="next-btn">
                  <Link
                    to={`/trivia/${id}`}
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
              {triviaToShow.map((item , index) => {
                return (
                  <div className="trivia" key = {index}>
                    <Card>
                      <p>{item.triviaText}</p>
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
  return <div>{renderTrivia()}</div>;
}
