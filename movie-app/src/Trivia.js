import React from "react";
import { useParams} from "react-router-dom";
import { Card } from "@material-ui/core";

export default function Trivia() {
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
            "6c8a14bc4emsh8f861d6c77a91e6p1e1bd5jsnfcd3fe38fba3",
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
        {trivia.length === 0 ? (
          " "
        ) : (
          <div>
            <Card>
              <section className="section-title">
                <h3 style={{ color: "black" }}>Trivia</h3>
                <div className="underline"></div>
              </section>
            </Card>
            <Card>
              
              {trivia.map((item,index) => {
                return (
                  <div className="trivia" key={index}>
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
