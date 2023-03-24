import React from "react";
import parse from "html-react-parser";

export default function PostContent({ currentUser, postState, handleLike }) {
  const root = process.env.REACT_APP_ROOT;

  return (
    <div className="post-content">
      <img
        src={root + "/assets/images/postContent.jpg"}
        alt=""
        className="post-content-img"
      />
      <div className="post-content-title-container">
        <h1 className="post-content-title">{parse(postState.post.title)}</h1>
        {currentUser && currentUser.user.isBlogOwner ? (
          <div className="post-content-edit">
            <i
              id="post-content-icon-edit"
              className="post-content-icon fa-regular fa-pen-to-square"
            ></i>
            <i
              id="post-content-icon-delete"
              className="post-content-icon fa-regular fa-trash-can"
            ></i>
          </div>
        ) : null}
      </div>
      <div className="post-info">
        <span className="post-info-author">
          Author:{" "}
          <b>
            {postState.post.author.firstName +
              " " +
              postState.post.author.lastName}
          </b>
        </span>
        <span className="post-info-date">
          {new Date(postState.post.date).toDateString()}
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
    </div>
  );
}
