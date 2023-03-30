import "./write.css";
import TinyMce from "../tinyMce/TinyMce";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Write({ currentUser }) {
  const serverUri = process.env.REACT_APP_PROXY;
  const [contentEditor, setContentEditor] = useState("Write your post here");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  async function handleEditorChange(content, editor) {
    setContentEditor(content);
  }

  async function handleWriteSubmit(e) {
    e.preventDefault();
    const form = e.target;
    let formData = new FormData();

    if (image) {
      const fileName = uuidv4();
      formData.append("imageName", fileName + image.name);
      formData.append("image", image);
    }

    formData.append("title", title);
    formData.append("content", contentEditor);
    // const data = new URLSearchParams(formData); // use this to send only data and not any files.

    const res = await fetch(`${serverUri}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      console.log("Error Occured.");
      console.log(await res.json());
    }

    const resData = await res.json();
    window.location.replace(`/posts/${resData.post._id}`);
  }

  return (
    <div className="write">
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="post pic"
          className="write-img"
        />
      )}
      <form onSubmit={handleWriteSubmit} className="write-form">
        <div className="write-form-group">
          <label htmlFor="fileInput" className="post-default-image">
            <i class="write-icon fa-regular fa-image"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            name="imageName"
            style={{ display: "none" }}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <input
            type="text"
            placeholder="Title"
            id="write-title"
            name="title"
            className="write-title-input"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="write-form-group">
          <TinyMce
            isMenubar={true}
            contentEditor={contentEditor}
            handleEditorChange={handleEditorChange}
          />
        </div>
        <button className="write-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
