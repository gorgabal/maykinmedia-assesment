import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import RoomTypeCard from './RoomTypeCards';
import StarRating from './StarRating';
import BookingPopup from './BookingPopup';

function HotelDetail() {
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState(null);
    const [reviewsCurrentPage, setReviewsCurrentPage] = useState(0);
    const [isBooking, setIsBooking] = useState(false);
    const reviewsPerPage = 5;

    useEffect(() => {
        const loadHotel = async () => {
            try {
                const hotelData = await import(`./assets/reviews/${hotelId}.json`);
                setHotel(hotelData.default);
            } catch (error) {
                console.error('Error loading hotel:', error);
            }
        };

        loadHotel();
    }, [hotelId]);

    if (!hotel) {
        return <div className="flex justify-center items-center h-screen">Hotel not found</div>;
    }

    const handleReviewsPageClick = (event) => {
        setReviewsCurrentPage(event.selected);
    };

    const handleBookingConfirm = (details) => {
        alert(`Booking confirmed for ${hotel.HotelInfo.Name} from ${details.arrivalDate} to ${details.departureDate}`);
        console.log('Booking confirmed:', details);
        setIsBooking(false);
    };

    const sortedReviews = hotel.Reviews
        ? [...hotel.Reviews].sort((a, b) => new Date(b.Date) - new Date(a.Date))
        : [];

    const reviewsPageCount = Math.ceil((sortedReviews.length || 0) / reviewsPerPage);
    const reviewsOffset = reviewsCurrentPage * reviewsPerPage;
    const currentReviews = sortedReviews.slice(reviewsOffset, reviewsOffset + reviewsPerPage);

    const address = hotel.HotelInfo.Address || 'No address available';
    const description = hotel.HotelInfo.Description || 'No description available';

    // Placeholder room types
    const roomTypes = hotel.RoomTypes || [
        {
            name: 'Room type A',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim minim veniam.',
            price: 'X',
        },
        {
            name: 'Room type B', 
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
            price: 'Y',
        },
        {
            name: 'Room type C',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            price: 'Z',
        },
    ];

    return (
        <>
        <Link to="/">
            <h1 className="bg-black text-gray-500 px-4 py-2 mb-4 font-medium hover:bg-gray-800 cursor-pointer">Hotel Details</h1>
        </Link>
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
                <div className="bg-gray-100 p-4 pt-16 mb-4">
                <h1 className="text-4xl font-light mb-2">{hotel.HotelInfo.Name}</h1>
                <p className="text-gray-500 mb-4">{description}</p>
                <div className="mb-6">
                    <div className="font-semibold">Address details:</div>
                    <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: address }} />
                </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {roomTypes.map((room, i) => (
                        <RoomTypeCard key={i} room={room} />
                    ))}
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                    {currentReviews.length > 0 ? (
                        <div className="space-y-4">
                            {currentReviews.map((review) => (
                                <div key={review.ReviewID} className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-bold text-lg">{review.Title}</h3>
                                    <p className="text-sm text-gray-500 mb-2">
                                        by {review.Author} on {review.Date}
                                    </p>
                                    <p className="text-gray-700 mb-4">{review.Content}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                        {Object.entries(review.Ratings).map(([key, value]) => (
                                            <StarRating key={key} label={key} rating={value} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No reviews available for this hotel.</p>
                    )}
                    {reviewsPageCount > 1 && (
                        <div className="flex justify-center mt-6">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                pageCount={reviewsPageCount}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={2}
                                onPageChange={handleReviewsPageClick}
                                containerClassName={"flex space-x-2"}
                                pageClassName={"px-3 py-1 bg-white rounded text-blue-500 border border-gray-500"}
                                activeClassName={"bg-gray-200 text-gray-700"}
                                previousClassName={"px-3 py-1 bg-white rounded text-blue-500 border border-gray-500"}
                                nextClassName={"px-3 py-1 bg-white rounded text-blue-500 border border-gray-500"}
                                disabledClassName={"opacity-50"}
                                forcePage={reviewsCurrentPage}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-white rounded-lg shadow border p-4 flex flex-col max-h-100">
                <div className="bg-gray-200 w-full h-48 flex items-center justify-center mb-4">
                    <img
                        src={hotel.HotelInfo.ImgURL || 'https://placehold.co/320x200'}
                        alt="Main image"
                        className="object-cover w-full h-48"
                    />
                </div>
                <div className="text-lg font-semibold mb-1">{hotel.HotelInfo.Name}</div>
                <div className="text-gray-500 mb-4 flex-1">Available from EUR {hotel.HotelInfo.Price} per night</div>
                <button
                    onClick={() => setIsBooking(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-fit mt-auto"
                >
                    Order now!
                </button>
            </div>
        </div>
        {isBooking && (
            <BookingPopup
                hotelName={hotel.HotelInfo.Name}
                onClose={() => setIsBooking(false)}
                onConfirm={handleBookingConfirm}
            />
        )}
        </>
    );
}

export default HotelDetail; 