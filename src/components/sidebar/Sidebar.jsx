import "./sidebar.css";

export default function Sidebar() {
  const root = process.env.REACT_APP_ROOT;
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <div className="sidebar-title">ABOUT ME</div>
        <img
          className="sidebar-img"
          src={root + "/assets/images/testProfile.jpg"}
          alt=""
        />
        <p className="sidebar-text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Necessitatibus recusandae voluptatem officiis quis temporibus, nam{" "}
        </p>
      </div>
      <div className="sidebar-item">
        <div className="sidebar-title">CATEGORIES</div>
        <ul className="sidebar-list">
          <li className="sidebar-list-item">Life</li>
          <li className="sidebar-list-item">Sport</li>
          <li className="sidebar-list-item">Cinema</li>
          <li className="sidebar-list-item">Food</li>
          <li className="sidebar-list-item">Music</li>
          <li className="sidebar-list-item">Tech</li>
        </ul>
      </div>
      <div className="sidebar-item">
        <div className="sidebar-title">FOLLOW US</div>
        <div className="sidebar-social">
          <i className="sidebar-icon fa-brands fa-square-facebook"></i>
          <i className="sidebar-icon fa-brands fa-square-twitter"></i>
          <i className="sidebar-icon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  );
}
