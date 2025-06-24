import { useState } from 'react';
import PropTypes from 'prop-types';

function BookingPopup({ hotelName, onClose, onConfirm }) {
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');

    const handleConfirm = () => {
        if (arrivalDate && departureDate) {
            if (new Date(departureDate) <= new Date(arrivalDate)) {
                alert('Departure date must be after arrival date.');
                return;
            }
            onConfirm({ arrivalDate, departureDate });
        } else {
            alert('Please select both arrival and departure dates.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Book Your Stay at {hotelName}</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <label htmlFor="arrival" className="block text-sm font-medium text-gray-700 mb-1">Arrival Date</label>
                        <input
                            type="date"
                            id="arrival"
                            value={arrivalDate}
                            onChange={(e) => setArrivalDate(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            min={new Date().toISOString().split('T')[0]} // Cannot book in the past
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                        <input
                            type="date"
                            id="departure"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            min={arrivalDate || new Date().toISOString().split('T')[0]} // Cannot be before arrival
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Confirm Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

BookingPopup.propTypes = {
    hotelName: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default BookingPopup; 