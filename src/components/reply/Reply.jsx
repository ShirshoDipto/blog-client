import "./reply.css";
import parse from "html-react-parser";
import ReplyForm from "../replyForm/ReplyForm";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Reply({ currentUser, comment, reply, updateReplyNum }) {
  const serverUri = process.env.REACT_APP_PROXY;
  const params = useParams();
  const [replyState, setReplyState] = useState({
    reply: reply,
    isUpdating: false,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  let postContentEdit = null;
  if (currentUser && currentUser.user._id === reply.author.authorId) {
    postContentEdit = (
      <div className="post-content-edit">
        <i
          style={{ fontSize: "0.9rem" }}
          onClick={() =>
            setReplyState({ reply: replyState.reply, isUpdating: true })
          }
          id="post-content-icon-edit"
          className="post-content-icon fa-regular fa-pen-to-square"
        ></i>
        <i
          style={{ fontSize: "0.9rem" }}
          onClick={handleReplyDelete}
          id="post-content-icon-delete"
          className="post-content-icon fa-regular fa-trash-can"
        ></i>
      </div>
    );
  } else if (currentUser && currentUser.user.isBlogOwner) {
    postContentEdit = (
      <div className="post-content-edit">
        <i
          style={{ fontSize: "0.9rem" }}
          onClick={handleReplyDelete}
          id="post-content-icon-delete"
          className="post-content-icon fa-regular fa-trash-can"
        ></i>
      </div>
    );
  }

  async function handleReplyDelete() {
    const res = await fetch(
      `${serverUri}/posts/${params.postId}/comments/${comment._id}/replies/${replyState.reply._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    if (!res.ok) {
      console.log("Error Occured. ");
      console.log(await res.json());
    }

    const resData = await res.json();
    setIsDeleting(true);
    updateReplyNum(resData.comment);
  }

  async function handleReplyUpdate(e) {
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const res = await fetch(
      `${serverUri}/posts/${params.postId}/comments/${comment._id}/replies/${replyState.reply._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          content: formJson.reply,
        }),
      }
    );

    if (!res.ok) {
      console.log("Error Occured. ");
      console.log(await res.json());
    }

    const resData = await res.json();
    const updatedReply = resData.reply;

    setReplyState({ reply: updatedReply, isUpdating: false });
  }

  if (isDeleting) {
    return null;
  }

  return (
    <div className="reply">
      <div className="reply-title">
        <div className="reply-author">{`${replyState.reply.author.firstName} ${replyState.reply.author.lastName}`}</div>
        {postContentEdit}
      </div>
      <div className="reply-date">
        {new Date(replyState.reply.date).toDateString()}
      </div>
      <div className="reply-content">
        {replyState.isUpdating ? (
          <ReplyForm
            currentUser={currentUser}
            handleAddReply={handleReplyUpdate}
            defaultValue={replyState.reply.content}
          />
        ) : (
          parse(replyState.reply.content)
        )}
      </div>
    </div>
  );
}
