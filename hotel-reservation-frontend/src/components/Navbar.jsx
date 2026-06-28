import { Link } from "react-router-dom";
import { FaHotel } from "react-icons/fa";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">

      <div className="container">

        <Link className="navbar-brand brand-logo" to="/">
          <FaHotel className="me-2" />
          StayEase
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">

          <ul className="navbar-nav mx-auto">

              <li className="nav-item">
                  <Link className="nav-link" to="/">
                      Home
                  </Link>
              </li>

              <li className="nav-item">
                  <a className="nav-link" href="#hotels">
                      Hotels
                  </a>
              </li>

              <li className="nav-item">
                  <a className="nav-link" href="#">
                      About
                  </a>
              </li>

              <li className="nav-item">
                  <a className="nav-link" href="#">
                      Contact
                  </a>
              </li>

          </ul>

          <button className="book-btn">
            Book Now
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;