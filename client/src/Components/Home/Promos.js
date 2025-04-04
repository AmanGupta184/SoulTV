import React from "react";
import {FiUser} from 'react-icons/fi';

function Promo() {
  return (
    <div className="my-20 py-10 md:px-20 px-8 bg-dry">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex lg:gap-10 gap-6 flex-col">
          <h1 className="xl:text-2xl text-xl capitalize font-sans font-medium xl:leading-loose">
            Download Your Movies Watch Offline.
            <br />
            Enjoy on Your Mobile
          </h1>
          <p className="text-text text-sm xl:text-base leading-6 xl:leading-8">
            Video provides a powerful way to help you prove your point. When you
            click Online Video, you can paste in the embed code for the video
            you want to add. You can also type a keyword to search online for
            the video that best fits your document.
          </p>
          <div className="flex gap-4 md:text-lg text-sm">
            <div className="flex-colo bg-black text-subMain px-6 py-3 rounded font-bold">
              HD 4K
            </div>
            <div className="flex-rows gap-4 bg-black text-subMain px-6 py-3 rounded font-bold">
              <FiUser/>2K
            </div>
          </div>
        </div>
        <div className="">
          <img src="https://global-uploads.webflow.com/618fa90c201104b94458e1fb/6305fcca75b16915c33e9754_6f74fa51-9490-42f4-b7fa-bc99b365f50e.png" alt="Mobile App" className="w-full object-contain"/>
        </div>
      </div>
    </div>
  );
}

export default Promo;
