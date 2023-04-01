import "./mainHeader.css";

export default function MainHeader() {
  const root = process.env.REACT_APP_ROOT;
  return (
    <div className="main-header">
      <div className="mh-titles">
        <span className="mh-title-lg">Welcome</span>
        <span className="mh-title-sm">to my thoughts, stories, and ideas.</span>
      </div>
      <img
        src={root + "/assets/images/homepage_cropped.jpg"}
        alt=""
        className="mh-img"
      />
    </div>
  );
}
