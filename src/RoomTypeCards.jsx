import React from "react";

function RoomTypeCard({ room }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow border flex flex-col h-full">
      <div className="bg-gray-400 h-48 flex items-center justify-center">
        <img
          src="https://placehold.co/400x300"
          alt={room.name}
          className="object-cover w-full h-48"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="p-4 pb-0">
          <div className="font-bold text-lg mb-2">{room.name}</div>
          <div className="text-gray-700 text-sm mb-4">{room.description}</div>
        </div>
        <div className="bg-gray-100 text-gray-400 text-sm font-semibold px-4 py-2 mt-auto">
          Price per night: {room.price}
        </div>
      </div>
    </div>
  );
}

export default RoomTypeCard; 