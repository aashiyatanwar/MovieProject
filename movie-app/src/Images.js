import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@material-ui/core";


export default function Images() {
  const { id } = useParams();
  const [images, setimages] = useState([]);
  const [imagesToShow, setImagesToShow] = useState([]);
  const [offset, setOffset] = useState(9);
  const [loading,setLoading] = useState(true)

  React.useEffect(() => {
    setLoading(true);
    async function getImages() {
      fetch(`https://imdb8.p.rapidapi.com/title/get-all-images?tconst=${id}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "6c8a14bc4emsh8f861d6c77a91e6p1e1bd5jsnfcd3fe38fba3",
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          const apiResponse = data.resource.images;
          console.log(apiResponse);
          if (apiResponse) {
            const newImages = [];
            apiResponse.map((item) => {
              const { url } = item;
              newImages.push({
                images: url,
              });
            });
            console.log("newImage", newImages);
            setimages(newImages);
            setImagesToShow(newImages.slice(0, offset));
          } else {
            setimages([]);
          }
          setLoading(false)
        })
        .catch((err) => {
          console.error(err);
          setLoading(false)
        });
    }

    getImages();
  }, []);

  const handleClick = () => {
    const newOffset = offset + 10;
    setOffset(newOffset);
    setImagesToShow(images.slice(0, newOffset));
  };

  const shouldBeDisabled = () => {
    console.log("offset: ", offset);
    console.log("images.length: ", images.length);
    return offset > images.length;
  };

  const renderImages = () => {
    return (
      <div>
        {imagesToShow.length === 0 ? (
          " "
        ) : (
          <div>
            <Card>
              <section className="section-title">
                <h3 style={{ color: "black" }}>Photos</h3>
                <div className="underline"></div>
              </section>
            </Card>
            <Card>
              <div className="images-center">
                {imagesToShow.map((image , index) => {
                  return (
                    <div className="images-center" key={index}>
                      <article className="image">
                        <div className="images img">
                          <img src={image.images}></img>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {renderImages()}
      <button
        className="btn btn-primary btn-details"
        disabled={shouldBeDisabled()}
        onClick={handleClick}
      >
        {shouldBeDisabled() ? "No More Images" : "Click here for more Images"}
      </button>
    </div>
  );
}
