import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@material-ui/core";

export default function MainImages() {
  const { id } = useParams();
  const [images, setimages] = React.useState([]);
  const [imagesToShow, setImagesToShow] = React.useState([]);
  const [offset, setOffset] = React.useState(3);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    async function getImages() {
      fetch(`https://imdb8.p.rapidapi.com/title/get-all-images?tconst=${id}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d4225d746amsh3c36ac6a4dcaf9ep1c2235jsnfe11e2c62954",
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
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }

    getImages();
  }, []);

  

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
                    <div className="images-center"  key ={index}>
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
      <Link
        to={`/images/${id}`}
        className="btn btn-primary btn-details"
        target="_blank"
      >
        Click here for more images
      </Link>
    </div>
  );
}
