import "./comment.css";
import Replies from "../replies/Replies";
import CommentContent from "../commentContent/CommentContent";
import { useEffect, useState } from "react";

export default function Comment({ currentUser, post, comment }) {
  const serverUri = process.env.REACT_APP_PROXY;

  const [commentState, setCommentState] = useState({
    comment: comment,
    isLiked: {},
  });

  function handleLike() {
    console.log("handling like. ");
  }

  useEffect(() => {
    async function fetchLikes() {
      if (!currentUser) {
        return;
      }

      const res = await fetch(
        `${serverUri}/posts/${post._id}/comments/${comment._id}/likes`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const theLike = await res.json();

      if (!theLike.error) {
        return setCommentState({ comment: comment, isLiked: theLike });
      }

      console.log("like not found");
      return setCommentState({ comment: comment, isLiked: {} });
    }

    fetchLikes().catch((err) => {
      console.log(err);
    });
  }, [comment._id]);

  return (
    <div className="comment">
      <CommentContent
        currentUser={currentUser}
        comment={commentState.comment}
        isLiked={commentState.isLiked}
        handleLike={handleLike}
      />
      <Replies currentUser={currentUser} />
    </div>
  );
}
