import "./commentForm.css";

export default function CommentForm({ currentUser, handleCommentSubmit }) {
  return (
    <div className="comment-form">
      <form
        method="POST"
        className="comment-write-area"
        onSubmit={handleCommentSubmit}
      >
        <textarea
          className="comment-textarea"
          name="comment"
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
