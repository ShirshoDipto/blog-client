import "./post.css";
import parse from "html-react-parser";

export default function Post({ post, currentUser }) {
  const serverRoot = process.env.REACT_APP_SERVERROOT;

  return (
    <div className="post">
      {post.image ? (
        <img
          src={`${serverRoot}/images/${post.image}`}
          alt="Post Pic"
          className="post-img"
        />
      ) : (
        <img
          src="/assets/images/no-image.png"
          alt="Post Pic"
          className="post-img"
        />
      )}
      <div className="post-info">
        <div className="post-cats">
          <span className="post-cat">Music</span>
          <span className="post-cat">Life</span>
        </div>
        <span className="post-title">{post.title}</span>
        <hr />
        <span className="post-date">{new Date(post.date).toDateString()}</span>
      </div>
      <p className="post-desc">{post && parse(post.content)}</p>
    </div>
  );
}
