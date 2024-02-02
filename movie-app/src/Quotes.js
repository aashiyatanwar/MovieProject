import React, { useState} from "react";
import { useParams } from "react-router-dom";


export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [quotesToShow, setQuotesToShow] = useState([]);
  const [offset, setOffset] = useState(5);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    setLoading(true);
    function getQuotes() {
      fetch(
        `https://imdb8.p.rapidapi.com/title/get-quotes?tconst=${id}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "466f03b123msh7e7e90710dbdd84p1501a6jsn34030e99a776",
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          const apiResponse = data.quotes
          console.log("apiResponse", apiResponse);
          if(apiResponse){
              const newQuotes=[]
              apiResponse.map((item)=>{
                  
                  const {lines} = item
                 
                  newQuotes.push({
                      charName:lines.characters.character?lines.characters.character:"",
                      text:lines.text
                  })
                
                  
                
                
              })
              console.log("newQuotes", newQuotes);
              setQuotes(newQuotes)
          }
         
        
          
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
    getQuotes();
  }, []);

  /*const handleClick = () => {
    const newOffset = offset + 5;
    setOffset(newOffset);
    setReviewsToShow(reviews.slice(0, newOffset));
  };

  const shouldBeDisabled = () => {
    console.log("offset: ", offset);
    console.log("reviews.length: ", reviews.length);
    return offset > reviews.length;
  };

  const renderReviews = () => {
    return (
      <div>
        {reviewsToShow.length === 0 ? (
          ""
        ) : (
          <div>
            <Card>
              <section className="section-title">
                <h3 style={{ color: "black" }}>User Reviews</h3>
                <div className="underline"></div>
              </section>
            </Card>
            {reviewsToShow.map((review) => {
              return (
                <Card>
                  <div className="reviews">
                    <h3 style={{ textAlign: "left", color: "black" }}>
                      <span className="icon">
                        <FaUserAlt></FaUserAlt>
                      </span>
                      {review.username}
                    </h3>
                    <p>{review.reviewText}</p>
                    <h3 style={{ textAlign: "left", color: "black" }}>
                      <span className="icon">
                        <FaThumbsUp />
                      </span>

                      {review.upVotes}
                      <span className="icon">
                        <FaThumbsDown />
                      </span>

                      {review.downVotes}
                    </h3>
                    <div
                      className="underline"
                      style={{ width: "45 rem" }}
                    ></div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  };*/

  return (
    <div>
      {/*renderReviews()*/}
      {/*<button
        style={{align: "center"}}
        className="btn btn-primary btn-details"
        disabled={shouldBeDisabled()}
        onClick={handleClick}
      >
        {shouldBeDisabled() ? "No Reviews" : "Click here for more reviews"}
      </button>*/}
    </div>
  );
}
