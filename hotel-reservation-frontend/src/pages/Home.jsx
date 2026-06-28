import { useEffect, useState } from "react";
import api from "../api/api";
import Hero from "../components/Hero";
import HotelCard from "../components/HotelCard";

function Home() {

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    api.get("/hotels")
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Hero />

      <div className="container py-5" id="hotels">

        <h2 className="text-center fw-bold mb-5">
          Available Hotels
        </h2>

        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
          />
        ))}

      </div>
    </>
  );
}

export default Home;