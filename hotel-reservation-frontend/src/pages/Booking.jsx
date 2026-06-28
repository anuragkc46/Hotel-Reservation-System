import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "../styles/booking.css";
import {
    FaCalendarAlt,
    FaUsers,
    FaHotel,
    FaMoneyBillWave
} from "react-icons/fa";

function Booking() {

    const { roomId } = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState({
        checkInDate: "",
        checkOutDate: "",
        numberOfGuests: 1
    });

    const [room, setRoom] = useState(null);

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        });
    };

     useEffect(() => {

         api.get(`/rooms/${roomId}`)
             .then((response) => {
                 setRoom(response.data);
             })
             .catch((error) => {
                 console.log(error);
             });

     }, [roomId]);

    const calculateNights = () => {

        if (!booking.checkInDate || !booking.checkOutDate) {
            return 0;
        }

        const checkIn = new Date(booking.checkInDate);
        const checkOut = new Date(booking.checkOutDate);

        const difference = checkOut - checkIn;

        return Math.max(0, difference / (1000 * 60 * 60 * 24));

    };

    const totalAmount = room
        ? room.pricePerNight * calculateNights()
        : 0;


    const handleSubmit = (e) => {

        e.preventDefault();

         if (calculateNights() <= 0) {
                alert("Check-out date must be after the check-in date.");
                return;
            }

        if (room && booking.numberOfGuests > room.capacity) {
            alert(`This room allows a maximum of ${room.capacity} guests.`);
            return;
        }

        const data = {
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate,
            numberOfGuests: booking.numberOfGuests,
            totalAmount: totalAmount,

            user: {
                id: 1
            },

            room: {
                id: roomId
            }
        };

        api.post("/bookings", data)
            .then((response) => {
                console.log(response.data);

                alert("Booking Successful!");

                navigate(`/payment/${response.data.id}`);

            })
            .catch((error) => {

                console.log(error.response);

                alert(error.response?.data || "Booking Failed");

            });

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-lg-6 col-md-8">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="booking-title">
                                Book Your Stay
                            </h2>

                            <p className="booking-subtitle">
                                Complete the details below to confirm your reservation.
                            </p>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>
                                        <FaCalendarAlt className="me-2" />
                                        Check-In Date
                                    </label>

                                    <input
                                        type="date"
                                        name="checkInDate"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>
                                        <FaCalendarAlt className="me-2" />
                                        Check-Out Date
                                    </label>

                                    <input
                                        type="date"
                                        name="checkOutDate"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>
                                        <FaUsers className="me-2" />
                                        Number of Guests
                                    </label>

                                    <input
                                        type="number"
                                        name="numberOfGuests"
                                        className="form-control"
                                        value={booking.numberOfGuests}
                                        onChange={handleChange}
                                    />

                                </div>

                                {room && (

                                <div className="booking-summary">

                                    <h4>
                                        <FaHotel className="me-2" />
                                        Booking Summary
                                    </h4>

                                    <p>
                                        <strong>Hotel:</strong> {room.hotel.hotelName}
                                    </p>

                                    <p>
                                        <strong>Room:</strong> {room.category}
                                    </p>

                                    <p>
                                        <strong>City:</strong> {room.hotel.city}
                                    </p>

                                    <p>
                                        <strong>Guests:</strong> {booking.numberOfGuests}
                                    </p>

                                    <p>
                                        <FaMoneyBillWave className="me-2" />
                                        <strong>Price:</strong> ₹{room.pricePerNight}/night
                                    </p>

                                    <p>
                                        <strong>Nights:</strong> {calculateNights()}
                                    </p>

                                    <hr />

                                    <h4>
                                        Total : ₹{totalAmount}
                                    </h4>

                                </div>

                                )}

                                <button
                                    type="submit"
                                    className="booking-btn"
                                >
                                    Confirm Booking
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Booking;