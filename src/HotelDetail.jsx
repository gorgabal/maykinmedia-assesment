import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RoomTypeCard from './RoomTypeCards';

function HotelDetail() {
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHotel = async () => {
            try {
                const hotelData = await import(`./assets/reviews/${hotelId}.json`);
                setHotel(hotelData.default);
            } catch (error) {
                console.error('Error loading hotel:', error);
            } finally {
                setLoading(false);
            }
        };

        loadHotel();
    }, [hotelId]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!hotel) {
        return <div className="flex justify-center items-center h-screen">Hotel not found</div>;
    }

    const address = hotel.HotelInfo.Address || 'No address available';
    const description = hotel.HotelInfo.Description || 'No description available';

    // Placeholder room types
    const roomTypes = hotel.RoomTypes || [
        {
            name: 'Room type A',
            description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
            price: 'X',
        },
        {
            name: 'Room type B',
            description: 'This card has supporting text below as a natural lead-in to additional content.',
            price: 'Y',
        },
        {
            name: 'Room type C',
            description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
            price: 'Z',
        },
    ];

    return (
        <>
        <h1 className="bg-black text-gray-500 px-4 py-2 mb-4 font-medium">Hotel Details</h1>
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left/Main Content */}
            <div className="md:col-span-2">
                <div className="bg-gray-100 p-4 pt-16 mb-4">
                <h1 className="text-4xl font-light mb-2">{hotel.HotelInfo.Name}</h1>
                <p className="text-gray-500 mb-4">{description}</p>
                <div className="mb-6">
                    <div className="font-semibold">Address details:</div>
                    <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: address }} />
                </div>
                </div>
                {/* Room Types */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {roomTypes.map((room, i) => (
                        <RoomTypeCard key={i} room={room} />
                    ))}
                </div>
            </div>
            {/* Right/Sidebar */}
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
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-fit mt-auto">
                    Order now!
                </button>
            </div>
        </div>
        </>
    );
}

export default HotelDetail; 