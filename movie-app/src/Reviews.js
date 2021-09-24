import React from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaUserAlt } from "react-icons/fa";
import { Card } from "@material-ui/core";

export default function Reviews() {
  const [reviews, setReviews] = React.useState([]);
  const [reviewsToShow, setReviewsToShow] = React.useState([]);
  const [offset, setOffset] = React.useState(5);
  const [loading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    setLoading(true);
    function getReviews() {
      fetch(
        `https://imdb8.p.rapidapi.com/title/get-user-reviews?tconst=${id}`,
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
          const reviews = data.reviews;
          console.log(reviews);
          if (reviews) {
            const newReview = [];
            reviews.map((item) => {
              const { author, interestingVotes, reviewText } = item;
              newReview.push({
                username: author.displayName,
                downVotes: interestingVotes.down ? interestingVotes.down : "0",
                upVotes: interestingVotes.up ? interestingVotes.up : "0",
                reviewText: reviewText,
              });
            });
            console.log(newReview);
            setReviews(newReview);
            setReviewsToShow(newReview.slice(0, offset));
          } else {
            setReviews([]);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
    getReviews();
  }, []);

  const handleClick = () => {
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
            {reviewsToShow.map((review , index) => {
              return (
                <Card>
                  <div className="reviews" key = {index}>
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
  };

  return (
    <div>
      {renderReviews()}
      <button
        style={{align: "center"}}
        className="btn btn-primary btn-details"
        disabled={shouldBeDisabled()}
        onClick={handleClick}
      >
        {shouldBeDisabled() ? "No Reviews" : "Click here for more reviews"}
      </button>
    </div>
  );
}
