import "./replyForm.css";

export default function ReplyForm({ currentUser, handleAddReply }) {
  function verifyUser() {
    if (!currentUser) {
      return alert("Log in to comment. ");
    }
  }

  return (
    <form className="reply-form" onSubmit={handleAddReply} onClick={verifyUser}>
      <textarea
        type="text"
        className="reply-input"
        name="reply"
        placeholder="Reply"
        id="reply-textarea"
        cols="30"
        rows="2"
      ></textarea>
      <button className="reply-button" type="submit">
        Reply
      </button>
    </form>
  );
}
