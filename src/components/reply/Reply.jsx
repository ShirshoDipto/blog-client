import "./reply.css";

export default function Reply({ currentUser }) {
  return (
    <div className="reply">
      <div className="reply-title">
        <div className="reply-author">Shirsho Dipto</div>
        <div className="reply-date">19 Mar, 2023</div>
      </div>
      <div className="reply-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
        omnis reiciendis aliquid facilis consectetur unde aut fugit laboriosam
        doloremque
      </div>
    </div>
  );
}
