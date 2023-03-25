import "./allReplies.css";
import Reply from "../reply/Reply";

export default function AllReplies({ currentUser, comment, allReplies }) {
  if (!allReplies) {
    return (
      <div className="all-replies">
        This comment doesn't have any reply yet.
      </div>
    );
  }

  const replies = allReplies.map((reply) => {
    return (
      <Reply
        key={reply._id}
        currentUser={currentUser}
        comment={comment}
        reply={reply}
      />
    );
  });

  return <div className="all-replies">{replies}</div>;
}
