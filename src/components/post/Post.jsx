import "./post.css";
import parse from "html-react-parser";

export default function Post({ post, currentUser }) {
  const root = process.env.REACT_APP_ROOT;
  return (
    <div className="post">
      <img
        src={root + "/assets/images/postPic.jpg"}
        alt="Post Pic"
        className="post-img"
      />
      <div className="post-info">
        <div className="post-cats">
          <span className="post-cat">Music</span>
          <span className="post-cat">Life</span>
        </div>
        <span className="post-title">{post.title}</span>
        <hr />
        <span className="post-date">{new Date(post.date).toDateString()}</span>
      </div>
      <p className="post-desc">{parse(post.content)}</p>
    </div>
  );
}
