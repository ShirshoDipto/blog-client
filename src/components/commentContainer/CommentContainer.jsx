import "./commentContainer.css";
import Comments from "../comments/Comments";
import { useState } from "react";

export default function CommentContainer({ currentUser, post }) {
  const serverUri = process.env.REACT_APP_PROXY;
  const [toggleComments, setToggleComments] = useState({
    text: "Show Comments",
    allComments: [],
  });

  async function handleToggleComments() {
    if (toggleComments.text === "Show Comments") {
      const res = await fetch(`${serverUri}/posts/${post._id}/comments`);
      const resData = await res.json();
      return setToggleComments({
        text: "Hide Comments",
        allComments: resData.comments,
      });
    }
    return setToggleComments({ text: "Show Comments", allComments: [] });
  }

  return (
    <div className="comment-container">
      <div className="toggle-comments" onClick={handleToggleComments}>
        {toggleComments.text}
      </div>
      {toggleComments.text === "Hide Comments" && (
        <Comments
          currentUser={currentUser}
          post={post}
          allComments={toggleComments.allComments}
        />
      )}
    </div>
  );
}
