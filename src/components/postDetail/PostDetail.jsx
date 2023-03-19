import "./postDetail.css"
import Sidebar from "../sidebar/Sidebar"
import PostContent from "../PostContent/PostContent"

export default function PostDetail() {
  return (
    <div className="post-detail">
      <PostContent />
      <Sidebar />
    </div>
  )
}
