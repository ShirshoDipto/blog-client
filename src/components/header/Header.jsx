import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <i className="header-icon fa-brands fa-square-facebook"></i>
        <i className="header-icon fa-brands fa-square-twitter"></i>
        <i className="header-icon fa-brands fa-square-instagram"></i>
      </div>
      <div className="header-center">
        <ul className="header-list">
          <li className="header-item">Home</li>
          <li className="header-item">About</li>
          <li className="header-item">Contact</li>
          <li className="header-item">Logout</li>
        </ul>
      </div>
      <div className="header-right">
        <img
          className="header-image"
          src="./assets/images/testProfile.jpg"
          alt="Profile Pic"
        />
        <i className="header-search-icon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
