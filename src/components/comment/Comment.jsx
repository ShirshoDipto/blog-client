import "./comment.css";
import Replies from "../replies/Replies";
import CommentContent from "../commentContent/CommentContent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Comment({ currentUser, post, comment }) {
  const serverUri = process.env.REACT_APP_PROXY;
  const params = useParams();

  const [commentState, setCommentState] = useState({
    comment: comment,
    isLiked: {},
  });

  async function deleteLike() {
    const res = await fetch(
      `${serverUri}/posts/${params.postId}/comments/${commentState.comment._id}/likes/${commentState.isLiked.commentLike._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    if (!res.ok) {
      return "Something bad happened. Error Ocurred. ";
    }
  }

  async function addLike() {
    const res = await fetch(
      `${serverUri}/posts/${params.postId}/comments/${commentState.comment._id}/likes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    if (!res.ok) {
      return "Something bad happened. Error Ocurred. ";
    }
    const like = await res.json();
    return like;
  }

  async function delCommentLike() {
    const res = await fetch(
      `${serverUri}/posts/${params.postId}/comments/${commentState.comment._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updateType: "like",
          numLikes: commentState.comment.numLikes - 1,
        }),
      }
    );

    if (!res.ok) {
      console.log(await res.json());
      return "Something bad happened.";
    }

    const resData = await res.json();
    return resData.comment;
  }

  async function addLikeToComment() {
    const res = await fetch(
      `${serverUri}/posts/${params.postId}/comments/${commentState.comment._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updateType: "like",
          numLikes: commentState.comment.numLikes + 1,
        }),
      }
    );

    if (!res.ok) {
      console.log(await res.json());
      return "Something bad happened.";
    }

    const resData = await res.json();
    return resData.comment;
  }

  async function handleLike() {
    if (!currentUser) {
      return alert("Log in to Like. ");
    }
    if (Object.keys(commentState.isLiked).length > 0) {
      const responses = await Promise.all([deleteLike(), delCommentLike()]);
      return setCommentState({ comment: responses[1], isLiked: {} });
    } else {
      const responses = await Promise.all([addLike(), addLikeToComment()]);
      return setCommentState({ comment: responses[1], isLiked: responses[0] });
    }
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
