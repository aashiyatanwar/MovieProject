import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@material-ui/core";
//import { ReactVideo } from "reactjs-media";

export default function Videos() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [videoID, setVideoID] = React.useState([]);
  const [playURL , setPlayUrl] = React.useState([])

  React.useEffect(() => {
    setLoading(true);
    async function getVideos() {
      fetch(`https://imdb8.p.rapidapi.com/title/get-videos?tconst=${id}`, {
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
          const apiResponse = data.resource.videos;
          console.log("apiResponse", apiResponse);
          if (apiResponse) {
            const newVideo = [];
            apiResponse.map((item) => {
              const { id } = item;
              newVideo.push({
                vidID: id.substr(9, id.length),
              });
            });
            console.log("newVideo", newVideo);
            setVideoID(newVideo.slice(0, 5));
          }

          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }

    getVideos();
  }, []);

  React.useEffect(() => {
    const playURLs = [];
    videoID.map((id) => {
      fetch(`https://imdb8.p.rapidapi.com/title/get-video-playback?viconst=${id.vidID}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "6c8a14bc4emsh8f861d6c77a91e6p1e1bd5jsnfcd3fe38fba3",
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log("playback", data)
        const apiResponse = []
        apiResponse.push(data.resource)
        console.log("apiResponse" , apiResponse)
        if(apiResponse){
        apiResponse.map((resource) => {
           //resource.previews && playURLs.push(resource.previews);
           if("previews" in resource){
             const { previews } = resource
             playURLs.push({previews : previews})
           }
        })
        console.log("playURLs",playURLs)
        setPlayUrl(playURLs)
      }
      })
    })
  }, [videoID]);

  return (<div>
    <Card>
    {playURL.map((item,index)=>{
      return(
        <div key ={index}>
          <video src = {item.previews.playUrl}  controls/>
        </div>
      )
    })}
    </Card>
  </div>);
}
