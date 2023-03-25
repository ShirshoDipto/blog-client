import "./comment.css";
import Replies from "../replies/Replies";
import CommentContent from "../commentContent/CommentContent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

export default function Comment({ currentUser, post, comment }) {
  const serverUri = process.env.REACT_APP_PROXY;
  const params = useParams();

  const [isDelete, setIsDelete] = useState(false);
  const [commentState, setCommentState] = useState({
    comment: comment,
    isLiked: {},
    isUpdate: false,
  });
  const [repliesState, setRepliesState] = useState({
    toggleReply: false,
    allReplies: [],
  });

  async function handleCommentDelete() {
    const res = await fetch(
      `${serverUri}/posts/${params.postId}/comments/${commentState.comment._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    if (!res.ok) {
      console.log("Error occured.");
      console.log(await res.json());
    }

    setIsDelete(true);
  }

  async function handleCommentUpdate(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const res = await fetch(
      `${serverUri}/posts/${params.postId}/comments/${commentState.comment._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: formJson.content,
          numLikes: commentState.comment.numLikes,
          numReplies: commentState.comment.numReplies,
        }),
      }
    );

    if (!res.ok) {
      console.log("Error Occured");
      console.log(await res.json());
      return;
    }

    const resData = await res.json();
    const newComment = resData.comment;
    setCommentState({
      comment: newComment,
      isLiked: commentState.isLiked,
      isUpdate: false,
    });
    form.reset();
  }

  async function deleteLike() {
    const res = await fetch(
      `${serverUri}/posts/${params.postId}/comments/${commentState.comment._id}/likes/${commentState.isLiked._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    if (!res.ok) {
      console.log("Something bad happened. Error Ocurred.");
      console.log(await res.json());
      return;
    }

    const like = await res.json();
    return like;
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
      console.log("Something bad happened. Error Ocurred.");
      console.log(await res.json());
      return;
    }

    const like = await res.json();
    return like;
  }

  async function handleLike() {
    if (!currentUser) {
      return alert("Log in to Like. ");
    }
    if (Object.keys(commentState.isLiked).length > 0) {
      const responses = await deleteLike();
      return setCommentState({
        comment: responses.comment,
        isLiked: {},
        isUpdate: commentState.isUpdate,
      });
    } else {
      const responses = await addLike();
      return setCommentState({
        comment: responses.comment,
        isLiked: responses.commentLike,
        isUpdate: commentState.isUpdate,
      });
    }
  }

  function setIsUpdateToTrue() {
    setCommentState({
      comment: commentState.comment,
      isLiked: commentState.isLiked,
      isUpdate: true,
    });
  }

  async function handleGetAllReplies() {
    if (repliesState.toggleReply) {
      return setRepliesState({ toggleReply: false, allReplies: [] });
    }

    console.log("Getting all replies. ");
    const res = await fetch(
      `${serverUri}/posts/${post._id}/comments/${commentState.comment._id}/replies`
    );

    const resData = await res.json();

    if (!res.ok) {
      console.log("Error Occured while fetching replies. ");
      console.log(resData);
    }

    return setRepliesState({ toggleReply: true, allReplies: resData.replies });
  }

  async function handleAddReply(e) {
    console.log("Add reply function is working. ");
  }

  useEffect(() => {
    async function fetchLike() {
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
        return setCommentState({
          comment: comment,
          isLiked: theLike.commentLike,
          isUpdate: commentState.isUpdate,
        });
      }

      console.log("like not found");
      return setCommentState({
        comment: comment,
        isLiked: {},
        isUpdate: commentState.isUpdate,
      });
    }

    fetchLike().catch((err) => {
      console.log(err);
    });
  }, [comment._id]);

  if (isDelete) {
    return null;
  }

  return (
    <div className="comment">
      <CommentContent
        currentUser={currentUser}
        comment={commentState.comment}
        isLiked={commentState.isLiked}
        isUpdate={commentState.isUpdate}
        setIsUpdateToTrue={setIsUpdateToTrue}
        handleLike={handleLike}
        handleCommentDelete={handleCommentDelete}
        handleCommentUpdate={handleCommentUpdate}
        handleGetAllReplies={handleGetAllReplies}
      />
      {repliesState.toggleReply && (
        <Replies
          currentUser={currentUser}
          comment={commentState.comment}
          allReplies={repliesState.allReplies}
          handleAddReply={handleAddReply}
        />
      )}
    </div>
  );
}
