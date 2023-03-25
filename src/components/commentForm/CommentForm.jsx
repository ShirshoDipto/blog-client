import "./commentForm.css";

export default function CommentForm({ currentUser, handleCommentSubmit }) {
  function verifyUser() {
    if (!currentUser) {
      return alert("Log in to comment. ");
    }
  }

  return (
    <div className="comment-form">
      <form
        onClick={verifyUser}
        className="comment-write-area"
        onSubmit={handleCommentSubmit}
      >
        <textarea
          className="comment-textarea"
          name="content"
          id="comment"
          cols="30"
          rows="7"
          placeholder="Write your comment..."
        ></textarea>
        <div className="comment-submit-comtainer">
          <button className="comment-submit" type="submit">
            Comment
          </button>
        </div>
      </form>
    </div>
  );
}
