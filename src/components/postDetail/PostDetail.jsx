import "./postDetail.css";
import Sidebar from "../about/About";
import PostContent from "../PostContentContainer/PostContentContainer";
import Footer from "../footer/Footer";

export default function PostDetail({ currentUser }) {
  return (
    <div className="post-detail-wrapper">
      <PostContent currentUser={currentUser} />
      <div className="post-detail">{/* <Sidebar /> */}</div>
      <Footer />
    </div>
  );
}
