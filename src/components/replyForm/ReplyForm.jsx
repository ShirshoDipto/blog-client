import { useState } from "react";
import "./replyForm.css";

export default function ReplyForm({
  currentUser,
  handleAddReply,
  defaultValue,
}) {
  console.log(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  function verifyUser(e) {
    if (!currentUser) {
      return alert("Log in to comment. ");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    await handleAddReply(e);
    setIsLoading(false);
  }

  return (
    <form className="reply-form" onSubmit={handleSubmit} onClick={verifyUser}>
      <textarea
        type="text"
        className="reply-input"
        name="reply"
        placeholder="Reply"
        id="reply-textarea"
        cols="30"
        rows="2"
        defaultValue={defaultValue}
        autoFocus={true}
      ></textarea>
      <button className="reply-button" type="submit">
        {isLoading ? "(...)" : "Reply"}
      </button>
    </form>
  );
}
