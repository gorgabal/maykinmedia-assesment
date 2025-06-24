import React from "react";

function HotelTeaser({ name, price, description, imageURL, url, reviewCount, averageRating }) {
  return (
    <a 
      href={url} 
    >
      <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white h-full">
        <div className="bg-gray-300 h-32 flex items-center justify-center">
          <img
            src={imageURL || "https://placehold.co/350x150"}
            alt={name}
            className="object-cover w-full h-32"
          />
        </div>
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h5 className="font-bold text-lg mb-1">{name}</h5>
            <div className="flex items-center mb-2">
              <span className="text-xs mr-1">{averageRating}</span>
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>
              <span className="text-xs text-gray-500 ml-1">({reviewCount} reviews)</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                Available
              </span>
              <span className="bg-cyan-500 text-white text-xs font-semibold px-2 py-1 rounded">
                EUR {price}
              </span>
            </div>
          </div>
          <p className="text-gray-700 text-sm mt-4">{description}</p>
        </div>
      </div>
    </a>
  );
}

export default HotelTeaser;
