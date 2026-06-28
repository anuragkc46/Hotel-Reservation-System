import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import upiLogo from "../assets/icons/upi.svg";
import cardLogo from "../assets/icons/card.png";
import cashLogo from "../assets/icons/cash.png";
import "../styles/payment.css";




function Payment() {

    const { bookingId } = useParams();
    const navigate = useNavigate();

    const [method, setMethod] = useState("UPI");
    const [booking, setBooking] = useState(null);
    useEffect(() => {

        api.get(`/bookings/${bookingId}`)
            .then((response) => {
                setBooking(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [bookingId]);
    const [card, setCard] = useState({
        number: "",
        holder: "",
        expiry: "",
        cvv: "",
        upiId: ""
    });

const handleCardChange = (e) => {

    setCard({
        ...card,
        [e.target.name]: e.target.value
    });

};

    const handlePayment = () => {
        if (!booking) {
            return;
        }
        const payment = {

            amount: booking.totalAmount,

            paymentMethod: method,

            paymentStatus: "SUCCESS",

            booking: {
                id: bookingId
            }

        };

        api.post("/payments", payment)
            .then(() => {

                alert("Payment Successful!");

                navigate("/");

            })
           .catch((error) => {

               console.log(error);
               console.log(error.response);
               console.log(error.response.data);

               alert(JSON.stringify(error.response.data, null, 2));

           });

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">

                                Payment

                            </h2>

                            <h4 className="mb-4">

                               Amount : ₹{booking?.totalAmount}

                            </h4>

                            <h5 className="mb-3">Choose Payment Method</h5>

                            <div className="form-check d-flex align-items-center mb-2">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    checked={method === "UPI"}
                                    onChange={() => setMethod("UPI")}
                                />

                                <label className="form-check-label d-flex align-items-center">
                                    <img
                                        src={upiLogo}
                                        alt="UPI"
                                        width="28"
                                        height="28"
                                        className="me-2"
                                    />
                                    UPI
                                </label>
                            </div>

                            <div className="form-check d-flex align-items-center mb-2">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    checked={method === "CARD"}
                                    onChange={() => setMethod("CARD")}
                                />

                                <label className="form-check-label d-flex align-items-center">
                                    <img
                                        src={cardLogo}
                                        alt="Card"
                                        width="28"
                                        height="28"
                                        className="me-2"
                                    />
                                    Credit / Debit Card
                                </label>
                            </div>

                            <div className="form-check d-flex align-items-center mb-4">
                                <input
                                    className="form-check-input me-2"
                                    type="radio"
                                    checked={method === "CASH"}
                                    onChange={() => setMethod("CASH")}
                                />

                                <label className="form-check-label d-flex align-items-center">
                                    <img
                                        src={cashLogo}
                                        alt="Pay at Hotel"
                                        width="28"
                                        height="28"
                                        className="me-2"
                                    />
                                    Pay at Hotel
                                </label>
                            </div>

                            {method === "UPI" && (

                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Enter UPI ID"
                                    name="upiId"
                                    value={card.upiId}
                                    onChange={handleCardChange}
                                />

                            )}

                        {method === "CARD" && (

                        <>
                            <input
                                className="form-control mb-3"
                                placeholder="Card Number"
                                name="number"
                                value={card.number}
                                onChange={handleCardChange}
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Card Holder Name"
                                name="holder"
                                value={card.holder}
                                onChange={handleCardChange}
                            />

                            <div className="row">

                                <div className="col">

                                    <input
                                        className="form-control"
                                        placeholder="MM/YY"
                                        name="expiry"
                                        value={card.expiry}
                                        onChange={handleCardChange}
                                    />

                                </div>

                                <div className="col">

                                    <input
                                        className="form-control"
                                        placeholder="CVV"
                                        name="cvv"
                                        value={card.cvv}
                                        onChange={handleCardChange}
                                    />

                                </div>

                            </div>

                        </>

                        )}

                    {method === "CASH" && (

                    <div className="alert alert-info">

                        Pay at Hotel Reception during check-in.

                    </div>

                    )}

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handlePayment();
                                }}
                            >

                                {/* All payment inputs here */}

                                <button
                                    type="submit"
                                    className="btn btn-success w-100 mt-4"
                                    disabled={!booking}
                                >
                                    {booking ? "Pay Now" : "Loading..."}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Payment;