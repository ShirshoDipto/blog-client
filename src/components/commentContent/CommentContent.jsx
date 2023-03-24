import "./commentContent.css";

export default function CommentContent({
  currentUser,
  comment,
  isLiked,
  handleLike,
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
              id="post-content-icon-delete"
              className="post-content-icon fa-regular fa-trash-can"
            ></i>
          </div>
        ) : null}
      </div>
      <div className="comment-date">
        {new Date(comment.date).toDateString()}
      </div>
      <div className="comment-desc">{comment.content}</div>
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
