import "./commentContent.css";
import parse from "html-react-parser";
import CommentForm from "../commentForm/CommentForm";

export default function CommentContent({
  currentUser,
  comment,
  isLiked,
  isUpdate,
  setIsUpdateToTrue,
  handleLike,
  handleCommentDelete,
  handleCommentUpdate,
  handleGetAllReplies,
}) {
  let postContentEdit = null;
  if (currentUser && currentUser.user._id === comment.author.authorId) {
    postContentEdit = (
      <div className="post-content-edit">
        <i
          onClick={setIsUpdateToTrue}
          id="post-content-icon-edit"
          className="post-content-icon fa-regular fa-pen-to-square"
        ></i>
        <i
          onClick={handleCommentDelete}
          id="post-content-icon-delete"
          className="post-content-icon fa-regular fa-trash-can"
        ></i>
      </div>
    );
  } else if (currentUser && currentUser.user.isBlogOwner) {
    postContentEdit = (
      <div className="post-content-edit">
        <i
          onClick={handleCommentDelete}
          id="post-content-icon-delete"
          className="post-content-icon fa-regular fa-trash-can"
        ></i>
      </div>
    );
  }

  return (
    <div className="comment-content">
      <div className="comment-title">
        <div className="comment-author">{`${comment.author.firstName} ${comment.author.lastName}`}</div>
        {postContentEdit}
      </div>
      <div className="comment-date">
        {new Date(comment.date).toDateString()}
      </div>
      <div className="comment-desc">
        {isUpdate ? (
          <CommentForm
            currentUser={currentUser}
            handleCommentSubmit={handleCommentUpdate}
            defaultValue={parse(comment.content)}
          />
        ) : (
          parse(comment.content)
        )}
      </div>
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
        <div className="replies-text" onClick={handleGetAllReplies}>
          Replies({comment.numReplies})
        </div>
      </div>
    </div>
  );
}
