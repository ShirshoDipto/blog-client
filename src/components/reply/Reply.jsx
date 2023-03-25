import "./reply.css";

export default function Reply({ currentUser, comment, reply }) {
  return (
    <div className="reply">
      <div className="reply-title">
        <div className="reply-author">{`${reply.author.firstName} ${reply.author.lastName}`}</div>
        <div className="reply-date">{new Date(reply.date).toDateString()}</div>
      </div>
      <div className="reply-content">{reply.content}</div>
    </div>
  );
}
