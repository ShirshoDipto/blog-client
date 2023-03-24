import "./postDetail.css";
import Sidebar from "../sidebar/Sidebar";
import PostContent from "../PostContentContainer/PostContentContainer";

export default function PostDetail({ currentUser }) {
  return (
    <div className="post-detail">
      <PostContent currentUser={currentUser} />
      <Sidebar />
    </div>
  );
}
