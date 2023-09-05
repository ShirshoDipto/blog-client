import { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";

export default function Header({ currentUser }) {
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const dropdown = useRef();
  const dropdownTrigger = useRef();

  const handleDropdownTrigger = () => {
    setDropdownStatus(!dropdownStatus);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdown.current &&
        !dropdown.current.contains(e.target) &&
        !dropdownTrigger.current.contains(e.target)
      ) {
        setDropdownStatus(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <div className="logo">
          <Link to="/" className="link">
            Shirsho
          </Link>
        </div>
      </div>
      <div className="header-center">
        <i
          className={`fa-solid fa-caret-down dropdown-trigger ${
            dropdownStatus && "rotate180"
          }`}
          ref={dropdownTrigger}
          onClick={handleDropdownTrigger}
        ></i>
        <ul
          className="header-list"
          ref={dropdown}
          id={dropdownStatus && "show-dropdown"}
        >
          <li className="header-item">
            <Link
              to="/"
              className="link"
              onClick={() => setDropdownStatus(false)}
            >
              Home
            </Link>
          </li>
          <li className="header-item">
            <Link
              to="/about"
              className="link"
              onClick={() => setDropdownStatus(false)}
            >
              About
            </Link>
          </li>
          <li className="header-item">
            <Link
              to="/contact"
              className="link"
              onClick={() => setDropdownStatus(false)}
            >
              Contact
            </Link>
          </li>
          {currentUser && currentUser.user.isBlogOwner && (
            <li className="header-item">
              <Link
                to="/write"
                className="link"
                onClick={() => setDropdownStatus(false)}
              >
                Write
              </Link>
            </li>
          )}
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

        {/* <i className="header-search-icon fa-solid fa-magnifying-glass"></i> */}
      </div>
    </div>
  );
}
