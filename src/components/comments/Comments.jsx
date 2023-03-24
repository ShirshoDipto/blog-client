import "./comments.css";
import CommentForm from "../commentForm/CommentForm";
import AllComments from "../allComments/AllComments";

export default function Comments({ currentUser, post, allComments }) {
  function handleCommentSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // const formJson = Object.fromEntries(formData.entries());
  }

  return (
    <div className="comments">
      <CommentForm
        currentUser={currentUser}
        handleCommentSubmit={handleCommentSubmit}
      />

      <AllComments
        currentUser={currentUser}
        post={post}
        allComments={allComments}
      />
    </div>
  );
}
