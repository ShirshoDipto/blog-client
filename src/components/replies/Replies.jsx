import Reply from "../reply/Reply";
import "./replies.css";

export default function Replies({ currentUser }) {
  return (
    <div className="replies">
      <form method="POST" className="reply-form">
        <input
          type="text"
          className="reply-input"
          name="reply"
          placeholder="Reply"
        />
        <button className="reply-button" type="submit">
          Reply
        </button>
      </form>
      <div className="all-replies">
        <Reply currentUser={currentUser} />
        <Reply currentUser={currentUser} />
        <Reply currentUser={currentUser} />
        <Reply currentUser={currentUser} />
        <Reply currentUser={currentUser} />
      </div>
    </div>
  );
}
