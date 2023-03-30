import "./update.css";
import TinyMce from "../tinyMce/TinyMce";
import { useState } from "react";

export default function Update({ currentUser, post }) {
  const serverUri = process.env.REACT_APP_PROXY;
  const [contentEditor, setContentEditor] = useState(post.content);
  const [title, setTitle] = useState(post.title);

  const serverRoot = process.env.REACT_APP_SERVERROOT;
  const root = process.env.REACT_APP_ROOT;

  async function handleEditorChange(content, editor) {
    setContentEditor(content);
  }

  async function handlePostUpdate(e) {
    e.preventDefault();
    const form = e.target;
    let formData = new FormData(form);
    formData.append("content", contentEditor);
    const data = new URLSearchParams(formData); // use this to send only data and not any files.

    const res = await fetch(`${serverUri}/posts/${post._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: data,
    });

    if (!res.ok) {
      console.log("Error Occured.");
      console.log(await res.json());
    }

    window.location.reload();
  }

  return (
    <div className="update">
      {post.image && (
        <img
          src={`${serverRoot}/images/${post.image}`}
          alt="post pic"
          className="update-img"
        />
      )}
      <form onSubmit={handlePostUpdate} className="update-form">
        <div className="update-form-group">
          <input
            type="text"
            placeholder="Title"
            id="update-title"
            name="title"
            className="update-title-input"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="update-form-group">
          <TinyMce
            isMenubar={true}
            contentEditor={contentEditor}
            handleEditorChange={handleEditorChange}
          />
        </div>
        <button className="update-submit" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
