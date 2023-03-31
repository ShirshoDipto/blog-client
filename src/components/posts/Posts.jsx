import "./posts.css";
import Post from "../post/Post";
import { Link } from "react-router-dom";

export default function Posts({ posts, currentUser }) {
  const allPosts = posts.map((post) => {
    return (
      <Link key={post._id} className="link" to={`/posts/${post._id}`}>
        <Post post={post} currentUser={currentUser} />
      </Link>
    );
  });

  return (
    <div className="allposts-container">
      <div className="ac-title">Latest Posts</div>
      <div className="posts">{allPosts}</div>
    </div>
  );
}
