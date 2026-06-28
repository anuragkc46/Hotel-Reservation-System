import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/rooms/:hotelId" element={<Rooms />} />

        <Route path="/booking/:roomId" element={<Booking />} />

        <Route path="/payment/:bookingId" element={<Payment />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;