import "./allComments.css";
import Comment from "../comment/Comment";

export default function AllComments({ currentUser, post, allComments }) {
  const allCommentsArray = allComments.map((comment) => {
    return (
      <Comment
        key={comment._id}
        currentUser={currentUser}
        post={post}
        comment={comment}
      />
    );
  });

  return <div className="all-comments">{allCommentsArray}</div>;
}
