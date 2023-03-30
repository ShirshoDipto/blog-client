import "./replies.css";
import ReplyForm from "../replyForm/ReplyForm";
import AllReplies from "../allReplies/AllReplies";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Replies({ currentUser, comment }) {
  const serverUri = process.env.REACT_APP_PROXY;
  const params = useParams();
  const [allReplies, setAllReplies] = useState([]);

  async function fetchAllReplies() {
    const res = await fetch(
      `${serverUri}/posts/${params.postId}/comments/${comment._id}/replies`
    );

    const resData = await res.json();

    if (!res.ok) {
      console.log("Error Occured while fetching replies. ");
      console.log(resData);
      return setAllReplies([]);
    }

    return setAllReplies(resData.replies);
  }

  async function createReply(formJson) {
    const res = await fetch(
      `${serverUri}/posts/${params.postId}/comments/${comment._id}/replies`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: formJson.reply,
        }),
      }
    );

    if (!res.ok) {
      console.log("Error occured. ");
      console.log(await res.json());
    }
  }

  async function handleAddReply(e) {
    if (!currentUser) {
      return alert("Log in to comment. ");
    }

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    await createReply(formJson);
    await fetchAllReplies();

    form.reset();
  }

  useEffect(() => {
    fetchAllReplies().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="replies">
      <ReplyForm currentUser={currentUser} handleAddReply={handleAddReply} />
      {allReplies.length === 0 ? (
        <div>This comment doesn't have any reply yet. </div>
      ) : (
        <AllReplies
          currentUser={currentUser}
          comment={comment}
          allReplies={allReplies}
        />
      )}
    </div>
  );
}
