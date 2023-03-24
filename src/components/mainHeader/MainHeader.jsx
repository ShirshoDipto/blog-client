import "./mainHeader.css";

export default function MainHeader() {
  const root = process.env.REACT_APP_ROOT;
  return (
    <div className="main-header">
      <div className="mh-titles">
        <span className="mh-title-sm">React & Logo</span>
        <span className="mh-title-lg">Blog</span>
      </div>
      <img src={root + "/assets/images/mhImg2.jpg"} alt="" className="mh-img" />
    </div>
  );
}
