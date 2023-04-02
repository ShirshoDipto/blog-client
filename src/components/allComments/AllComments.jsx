import "./allComments.css";
import Comment from "../comment/Comment";

export default function AllComments({
  currentUser,
  updateCommentNum,
  allComments,
}) {
  if (!allComments) {
    return (
      <div className="all-comments">
        This post doesn't have any comment yet.
      </div>
    );
  }
  const allCommentsArray = allComments.map((comment) => {
    return (
      <Comment
        key={comment._id}
        currentUser={currentUser}
        updateCommentNum={updateCommentNum}
        comment={comment}
      />
    );
  });

  return <div className="all-comments">{allCommentsArray}</div>;
}
