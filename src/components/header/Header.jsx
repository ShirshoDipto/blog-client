import "./header.css";
import { Link } from "react-router-dom";

export default function Header() {
  const root = process.env.REACT_APP_ROOT;
  const user = localStorage.getItem("user");

  return (
    <div className="header">
      <div className="header-left">
        <i className="header-icon fa-brands fa-square-facebook"></i>
        <i className="header-icon fa-brands fa-square-twitter"></i>
        <i className="header-icon fa-brands fa-square-instagram"></i>
      </div>
      <div className="header-center">
        <ul className="header-list">
          <li className="header-item">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="header-item">
            <Link to="/about" className="link">
              About
            </Link>
          </li>
          <li className="header-item">
            <Link to="/contact" className="link">
              Contact
            </Link>
          </li>
          <li className="header-item">
            {user && (
              <Link to="/logout" className="link">
                Logout
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div className="header-right">
        {user ? (
          <Link className="link" to={"/user"}>
            <img
              className="header-image"
              src={root + "/assets/images/testProfile.jpg"}
              alt="Profile Pic"
            />
          </Link>
        ) : (
          <ul className="header-list">
            <li className="header-item">
              <Link className="link" to={"/login"}>
                Login
              </Link>
            </li>
            <li className="header-item">
              <Link className="link" to={"/signup"}>
                Signup
              </Link>
            </li>
          </ul>
        )}

        <i className="header-search-icon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
