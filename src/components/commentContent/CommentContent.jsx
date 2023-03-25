import "./commentContent.css";
import parse from "html-react-parser";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function CommentContent({
  currentUser,
  comment,
  isLiked,
  handleLike,
  handleCommentDelete,
}) {
  return (
    <div className="comment-content">
      <div className="comment-title">
        <div className="comment-author">{`${comment.author.firstName} ${comment.author.lastName}`}</div>
        {(currentUser && currentUser.user.isBlogOwner) ||
        (currentUser && currentUser.user._id === comment.author.authorId) ? (
          <div className="post-content-edit">
            <i
              id="post-content-icon-edit"
              className="post-content-icon fa-regular fa-pen-to-square"
            ></i>
            <i
              onClick={handleCommentDelete}
              id="post-content-icon-delete"
              className="post-content-icon fa-regular fa-trash-can"
            ></i>
          </div>
        ) : null}
      </div>
      <div className="comment-date">
        {new Date(comment.date).toDateString()}
      </div>
      <div className="comment-desc">{parse(comment.content)}</div>
      <div className="comment-likes">
        {Object.keys(isLiked).length !== 0 ? (
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
        <div className="number">{comment.numLikes}</div>
        <div className="replies-text">Replies({comment.numReplies})</div>
      </div>
    </div>
  );
}
