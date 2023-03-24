import "./allComments.css";
import Comment from "../comment/Comment";
import { useEffect } from "react";

export default function AllComments({ currentUser, allComments }) {
  const allCommentsArray = allComments.map((comment) => {
    return (
      <Comment key={comment._id} currentUser={currentUser} comment={comment} />
    );
  });

  return <div className="all-comments">{allCommentsArray}</div>;
}
