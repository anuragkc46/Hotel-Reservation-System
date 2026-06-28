import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import "../styles/rooms.css";
import roomImage from "../assets/images/hotel_1.png";

import {
    FaWifi,
    FaUsers,
    FaSnowflake,
    FaArrowRight,
} from "react-icons/fa";

function Rooms() {

    const { hotelId } = useParams();

    const [rooms, setRooms] = useState([]);

    useEffect(() => {

        api.get(`/rooms/hotel/${hotelId}`)
            .then((response) => {
                setRooms(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [hotelId]);

    return (

        <div className="container mt-5">

            <h1 className="text-center mb-5">
                Available Rooms
            </h1>

            <div className="row">

                {rooms.map((room) => (

                    <div className="col-md-4 mb-4" key={room.id}>

                            <div className="room-card">

                                <img
                                    src={roomImage}
                                    className="room-image"
                                    alt="Room"
                                />

                                <div className="room-content">

                                    <div className="room-top">

                                        <h3>
                                            {room.category
                                                .replace("_", " ")
                                                .toLowerCase()
                                                .replace(/\b\w/g, (char) => char.toUpperCase())
                                            }{" "}
                                            Room
                                        </h3>

                                        <span
                                            className={
                                                room.available
                                                    ? "available"
                                                    : "booked"
                                            }
                                        >
                                            {room.available ? "Available" : "Booked"}
                                        </span>

                                    </div>

                                    <p className="room-number">
                                        Room {room.roomNumber}
                                    </p>

                                    <div className="room-features">

                                        <span>
                                            <FaUsers /> {room.capacity} Guests
                                        </span>

                                        <span>
                                            <FaWifi /> Free WiFi
                                        </span>

                                        <span>
                                            <FaSnowflake /> Air Conditioning
                                        </span>

                                    </div>

                                    <p className="room-description">
                                        {room.description}
                                    </p>

                                    <div className="room-bottom">

                                        <div>

                                            <h3>
                                                ₹{room.pricePerNight}
                                                <small> /night</small>
                                            </h3>

                                        </div>

                                        <Link
                                            to={`/booking/${room.id}`}
                                            className={
                                                room.available
                                                    ? "room-btn"
                                                    : "room-btn disabled"
                                            }
                                        >
                                            {room.available
                                                ? <>Book Now <FaArrowRight /></>
                                                : "Already Booked"}
                                        </Link>

                                    </div>

                                </div>

                            </div>
                        </div>

                ))}

            </div>

        </div>

    );
}

export default Rooms;