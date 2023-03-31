import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import "./postContent.css";
import parse from "html-react-parser";
import Update from "../update/Update";

export default function PostContent({ currentUser, postState, handleLike }) {
  const serverRoot = process.env.REACT_APP_SERVERROOT;
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handlePostDelete() {
    setIsDeleting(true);
    const res = await fetch(`${serverRoot}/api/posts/${postState.post._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });

    if (!res.ok) {
      console.log("Error occured. ");
      console.log(await res.json());
      return;
    }
    return window.location.replace("/");
  }

  async function showConfirmationModal() {
    const confirmationModal = document.querySelector(".confirmation-modal");
    confirmationModal.className = "confirmation-modal active";
  }

  async function handlePostUpdate() {
    setIsUpdate(true);
  }

  async function hideConfirmModal() {
    const confirmationModal = document.querySelector(".confirmation-modal");
    confirmationModal.className = "confirmation-modal";
  }

  useEffect(() => {
    function removeConfirmationModal(e) {
      const confirmationModal = document.querySelector(".confirmation-modal");
      if (e.target === confirmationModal) {
        confirmationModal.className = "confirmation-modal";
      }
    }

    document.addEventListener("click", removeConfirmationModal);

    return () => {
      document.removeEventListener("click", removeConfirmationModal);
    };
  }, []);

  if (isUpdate) {
    return <Update currentUser={currentUser} post={postState.post} />;
  }

  return (
    <div className="post-content">
      {postState.post.image && (
        <img
          src={`${serverRoot}/images/${postState.post.image}`}
          alt=""
          className="post-content-img"
        />
      )}
      <div className="post-content-title-container">
        <h1 className="post-content-title">{parse(postState.post.title)}</h1>
        {currentUser && currentUser.user.isBlogOwner ? (
          <div className="post-content-edit">
            <i
              id="post-content-icon-edit"
              className="post-content-icon fa-regular fa-pen-to-square"
              onClick={handlePostUpdate}
            ></i>
            <i
              id="post-content-icon-delete"
              className="post-content-icon fa-regular fa-trash-can"
              onClick={showConfirmationModal}
            ></i>
          </div>
        ) : null}
      </div>
      <div className="single-post-info">
        <span className="post-info-date">
          {new Date(postState.post.date).toDateString()}
        </span>
        <span className="post-info-author">
          Author: <b>Shirsho Dipto</b>
        </span>
      </div>
      <div className="post-content-description">
        {parse(postState.post.content)}
      </div>
      <div className="cm-like-container">
        <div className="cm-like-item-container">
          {Object.keys(postState.isLiked).length !== 0 ? (
            <i
              className="cm-like-item fa-regular fa-heart"
              onClick={handleLike}
              style={{ color: "red" }}
            ></i>
          ) : (
            <i
              className="cm-like-item fa-regular fa-heart"
              onClick={handleLike}
            ></i>
          )}

          <span className="number">{postState.post.numLikes}</span>
        </div>
        <div className="cm-like-item-container">
          <i className="fa-regular fa-comment"></i>
          <span className="number">{postState.post.numComments}</span>
        </div>
      </div>
      <div className="confirmation-modal">
        <div className="cm-content">
          {isDeleting ? (
            <div className="loading">
              <Icon path={mdiLoading} size={1} spin={0.5} />
            </div>
          ) : (
            <div className="cm-text">Are you sure?</div>
          )}
          {!isDeleting && (
            <div className="cb-container">
              <button className="confirmation-yes" onClick={handlePostDelete}>
                Yes
              </button>
              <button className="confirmation-no" onClick={hideConfirmModal}>
                No
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
