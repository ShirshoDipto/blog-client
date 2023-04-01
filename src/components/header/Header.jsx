import "./header.css";
import { Link } from "react-router-dom";

export default function Header({ currentUser }) {
  return (
    <div className="header">
      <div className="header-left">
        <div className="logo">Shirsho</div>
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
          {currentUser && currentUser.user.isBlogOwner ? (
            <li className="header-item">
              <Link to="/write" className="link">
                Write
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
      <div className="header-right">
        {currentUser ? (
          <Link className="link" to={"/user"}>
            <i className="account fa-solid fa-user"></i>
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
