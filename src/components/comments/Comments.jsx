import "./comments.css";
import { useEffect, useState } from "react";
import CommentForm from "../commentForm/CommentForm";
import AllComments from "../allComments/AllComments";

export default function Comments({ currentUser, post, allComments }) {
  const serverUri = process.env.REACT_APP_PROXY;

  // useEffect(() => {
  //   async function fetchComments() {
  //     const res = await fetch(`${serverUri}/posts/${post._id}/comments`);
  //     const resData = await res.json();
  //     console.log(resData);
  //     setAllComments(resData);
  //   }

  //   fetchComments().catch((err) => {
  //     console.log(err);
  //   });
  // }, []);

  function handleCommentSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    // setNewComment(parse(formJson.comment));
  }

  return (
    <div className="comments">
      <CommentForm
        currentUser={currentUser}
        handleCommentSubmit={handleCommentSubmit}
      />

      <AllComments currentUser={currentUser} allComments={allComments} />
    </div>
  );
}
