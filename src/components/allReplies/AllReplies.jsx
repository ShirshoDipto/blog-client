import "./allReplies.css";
import Reply from "../reply/Reply";

export default function AllReplies({ currentUser, comment, allReplies }) {
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
