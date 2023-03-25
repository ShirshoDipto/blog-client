import "./comments.css";
import CommentForm from "../commentForm/CommentForm";
import AllComments from "../allComments/AllComments";
import { useParams } from "react-router-dom";

export default function Comments({
  currentUser,
  post,
  allComments,
  setToggleComments,
}) {
  const params = useParams();
  const serverUri = process.env.REACT_APP_PROXY;

  async function handleCommentSubmit(e) {
    e.preventDefault();
    if (!currentUser) {
      return alert("Log in to comment. ");
    }
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const res = await fetch(`${serverUri}/posts/${params.postId}/comments`, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        content: formJson.content,
      }),
    });

    if (!res.ok) {
      console.log(await res.json());
      return;
    }

    const res2 = await fetch(`${serverUri}/posts/${params.postId}/comments`);
    const res2Data = await res2.json();
    const comments = res2Data.comments;
    setToggleComments({ text: "Hide Comments", allComments: comments });
    e.target.reset();
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
