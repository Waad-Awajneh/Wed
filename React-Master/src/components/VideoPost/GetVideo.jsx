import React, { useState, useEffect } from "react";

function GetVideo({id,isSingle=false}) {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/getVideo/${id}`)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => setVideoUrl(url));
  }, []);

  // Render the video in the component
  return <>{videoUrl && <video style={{ width: "100vw" }}  className={isSingle?  "rounded-2xl hover:scale-105 w-full duration-300 h-full":"rounded-xl hover:scale-105  duration-300 w-auto " } src={videoUrl} controls muted autoPlay  />}</>;
}

export default GetVideo;
