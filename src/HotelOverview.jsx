import { useState, useEffect } from "react";
import HotelTeaser from "./HotelTeaser";
import ReactPaginate from "react-paginate";

function HotelOverview() {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // react-paginate uses 0-based index
  const hotelsPerPage = 6;

  useEffect(() => {
    const loadHotels = async () => {
      try {
        // List of hotel IDs to load (I don't use a backend for this demo so this is the best I can do for now)
        const hotelIds = [ "100407", "100504", "100505", "100506", "100507", "100508", "100509", "100513", "100527", "1005302", "100531", "100537", "100538", "100540", "100542", "100544", "1005459", "100547", "100550", "100554", "100560", "100561", "1005628", "100562", "100564", "1005656", "100565", "100567", "100569", "100570", "100574", "100577", "1005794", "100581", "100584", "100585", "100586", "100587", "100589", "100597", "100600", "100602", "100603", "100605", "1006063", "100610", "100615", "100617", "100619", "1006211", ];

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

        // Filter out any failed loads
        const validHotels = loadedHotels.filter((hotel) => hotel !== null);
        setHotels(validHotels);
      } catch (error) {
        console.error("Error loading hotels:", error);
      }
    };

    loadHotels();
  }, []);

  const pageCount = Math.ceil(hotels.length / hotelsPerPage);
  const offset = currentPage * hotelsPerPage;
  const currentHotels = hotels.slice(offset, offset + hotelsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <>
      <h1 className="bg-black text-gray-500 px-4 py-2 mb-4 font-medium">Hotel Overview</h1>
      <div className="flex flex-wrap gap-8 justify-center max-w-7xl mx-auto my-0">
        {currentHotels.map((hotel, index) => (
          <HotelTeaser
            key={hotel.HotelInfo.HotelID || index}
            HotelID={hotel.HotelInfo.HotelID}
            name={hotel.HotelInfo.Name}
            price={hotel.HotelInfo.Price}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            imageURL={hotel.HotelInfo.ImgURL}
            url={`/detail/${hotel.HotelInfo.HotelID}`}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6 mb-6">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"flex space-x-2"}
          pageClassName={"px-3 py-1 bg-white rounded text-blue-500 border border-gray-500"}
          activeClassName={"bg-gray-200 text-gray-700"}
          previousClassName={"px-3 py-1 bg-white rounded text-blue-500 border border-gray-500"}
          nextClassName={"px-3 py-1 bg-white rounded text-blue-500 border border-gray-500"}
          disabledClassName={"opacity-50"}
          forcePage={currentPage}
        />
      </div>
    </>
  );
}

export default HotelOverview;
