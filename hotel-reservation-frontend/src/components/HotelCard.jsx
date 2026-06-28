import { Link } from "react-router-dom";
import "../styles/hotelCard.css";
// import hotel1 from "../assets/images/hotel_1.png";
// import hotel2 from "../assets/images/hotel_2.png";
import {
    FaWifi,
    FaSwimmingPool,
    FaParking,
    FaArrowRight,
    FaStar
} from "react-icons/fa";

import { MdRestaurant } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

function HotelCard({ hotel }) {

    return (

        <div className="hotel-card">

            <div className="hotel-image">

                <img
                    src={hotel.imageUrl}
                    alt={hotel.hotelName}
                />

                <div className="hotel-badge">
                    <FaStar className="me-1" />
                    Popular
                </div>

            </div>

            <div className="hotel-content">

                <div className="location-badge">
                    <IoLocationSharp />
                    <span>{hotel.city}, {hotel.country}</span>
                </div>

                <h3>{hotel.hotelName}</h3>

                <p className="description">
                    Experience luxury and comfort with premium amenities and
                    exceptional hospitality.
                </p>

                <div className="amenities">

                    <span><FaWifi /> Free WiFi</span>
                    <span><FaSwimmingPool /> Swimming Pool</span>
                    <span><MdRestaurant /> Restaurant</span>
                    <span><FaParking /> Free Parking</span>

                </div>

                <div className="bottom">

                    <div>

                        <div className="rating">
                            <FaStar className="star-icon" />
                            <span>{hotel.rating}</span>
                            <small className="ms-2">(320 Reviews)</small>
                        </div>

                        <small>Starting from</small>

                        <h3>
                            ₹4,999 <small>/night</small>
                        </h3>

                    </div>

                    <Link
                        to={`/rooms/${hotel.id}`}
                        className="view-btn"
                    >
                       View Rooms <FaArrowRight />
                    </Link>

                </div>

            </div>

        </div>

    );
}

export default HotelCard;