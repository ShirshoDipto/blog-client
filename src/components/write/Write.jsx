import "./write.css";
import TinyMce from "../tinyMce/TinyMce";

export default function Write() {
  return (
    <div className="write">
      <img
        src="/assets/images/postPic.jpg"
        alt="post pic"
        className="write-img"
      />
      <form action="" className="write-form">
        <div className="write-form-group">
          <label htmlFor="fileInput" className="post-default-image">
            <i class="write-icon fa-regular fa-image"></i>
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} />
          <input
            type="text"
            placeholder="Title"
            id="write-title"
            className="write-title-input"
            autoFocus={true}
          />
        </div>
        <div className="write-form-group">
          <TinyMce isMenubar={true} />
        </div>
        <button className="write-submit">Submit</button>
      </form>
    </div>
  );
}
