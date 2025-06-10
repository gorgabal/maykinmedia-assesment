import React from "react";

function HotelTeaser({ name, price, description, imageURL, url }) {
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
        <div className="p-4 flex flex-col justify-between">
          <div className="flex items-center mb-2 flex-wrap justify-between">
            <h5 className="font-bold text-lg mr-2">{name}</h5>
            <div className="flex justify-between w-full mt-2">
              <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mr-2">
                Available
              </span>
              <span className="bg-cyan-500 text-white text-xs font-semibold px-2 py-1 rounded">
                EUR {price}
              </span>
            </div>
          </div>
          <p className="text-gray-700 text-sm">{description}</p>
        </div>
      </div>
    </a>
  );
}

export default HotelTeaser;
