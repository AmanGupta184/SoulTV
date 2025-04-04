import React from "react";

function Head({title}) {
  return (
    <div className="w-full bg-deepGray lg:h-64 h-40 relative overflow-hidden rounded-md">
      <img
        src="https://springboard-cdn.appadvice.com/wp-content/appadvice-v2-media/2016/11/Netflix-background_860c8ece6b34fb4f43af02255ca8f225.jpg"
        alt="aboutus"
        className="w-full h-full object-cover"
      />
      <div className="absolute lg:top-24 left-0 w-full flex-colo">
        <h1 className="text-2xl lg:text-h1 text-white text-center font-bold">{title&&title}</h1>
      </div>
    </div>
  );
}

export default Head;
