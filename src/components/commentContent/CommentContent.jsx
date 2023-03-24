import "./commentContent.css";

export default function CommentContent({ currentUser, comment }) {
  return (
    <div className="comment-content">
      <div className="comment-title">
        <div className="comment-author">{`${comment.author.firstName} ${comment.author.lastName}`}</div>
        <div className="comment-date">
          {new Date(comment.date).toDateString()}
        </div>
      </div>
      <div className="comment-desc">{comment.content}</div>
      <div className="comment-likes">
        <i className="cm-like-item fa-regular fa-heart"></i>
        <div className="number">{comment.numLikes}</div>
        <div className="replies-text">Replies({comment.numReplies})</div>
      </div>
    </div>
  );
}
