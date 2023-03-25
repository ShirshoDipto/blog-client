import "./replies.css";
import ReplyForm from "../replyForm/ReplyForm";
import AllReplies from "../allReplies/AllReplies";

export default function Replies({
  currentUser,
  comment,
  allReplies,
  handleAddReply,
}) {
  return (
    <div className="replies">
      <ReplyForm currentUser={currentUser} handleAddReply={handleAddReply} />
      <AllReplies
        currentUser={currentUser}
        comment={comment}
        allReplies={allReplies}
      />
    </div>
  );
}
