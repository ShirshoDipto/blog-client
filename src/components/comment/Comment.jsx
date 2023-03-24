import "./comment.css";
import Replies from "../replies/Replies";
import CommentContent from "../commentContent/CommentContent";

export default function Comment({ currentUser, comment }) {
  return (
    <div className="comment">
      <CommentContent currentUser={currentUser} comment={comment} />
      <Replies currentUser={currentUser} />
    </div>
  );
}
