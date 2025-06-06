import { useState, useEffect } from "react";
import HotelTeaser from "./HotelTeaser";

function HotelOverview() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        // List of hotel IDs to load (I don't use a backend for this demo so this is the best I can do for now)
        const hotelIds = [
          "100407",
          "100504",
          "100505",
          "100506",
          "100507",
          "100508",
          "100509",
          "100513",
          "100527",
          "1005302",
          "100531",
          "100537",
          "100538",
          "100540",
          "100542",
          "100544",
          "1005459",
          "100547",
          "100550",
          "100554",
          "100560",
          "100561",
          "1005628",
          "100562",
          "100564",
          "1005656",
          "100565",
          "100567",
          "100569",
          "100570",
          "100574",
          "100577",
          "1005794",
          "100581",
          "100584",
          "100585",
          "100586",
          "100587",
          "100589",
          "100597",
          "100600",
          "100602",
          "100603",
          "100605",
          "1006063",
          "100610",
          "100615",
          "100617",
          "100619",
          "1006211",
        ];

        // Load each hotel file
        const hotelPromises = hotelIds.map((id) =>
          import(`./assets/reviews/${id}.json`)
            .then((module) => module.default)
            .catch((error) => {
              console.error(`Error loading hotel ${id}:`, error);
              return null;
            }),
        );

        const loadedHotels = await Promise.all(hotelPromises);

        console.log("loadedHotels: ", loadedHotels);

        // Filter out any failed loads and take first 6
        const validHotels = loadedHotels.filter((hotel) => hotel !== null);

        console.log(validHotels);
        setHotels(validHotels);
      } catch (error) {
        console.error("Error loading hotels:", error);
      }
    };

    loadHotels();
  }, []);

  //TODO: make sure all HotelInfo is present in the teaser, then start styling.
  return (
    <>
      <h1>Hotel Overview</h1>
      <div className="hotel-list">
        {hotels.map((hotel, index) => (
          <HotelTeaser
            key={index}
            HotelID={hotel.HotelInfo.HotelID}
            name={hotel.HotelInfo.Name}
            availability={hotel.HotelInfo.availability}
            price={hotel.HotelInfo.Price}
            description={hotel.HotelInfo.description}
            imageURL={hotel.HotelInfo.ImgURL}
          />
        ))}
      </div>
    </>
  );
}

export default HotelOverview;
