import "./post.css";

export default function Post() {
  return (
    <div className="post">
      <img
        src="./assets/images/postPic.jpg"
        alt="Post Pic"
        className="post-img"
      />
      <div className="post-info">
        <div className="post-cats">
          <span className="post-cat">Music</span>
          <span className="post-cat">Life</span>
        </div>
        <span className="post-title">
          Officia consequuntur nam, repellendus commodi similique.
        </span>
        <hr />
        <span className="post-date">1 hour ago</span>
      </div>
      <p className="post-desc">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
        tenetur modi at explicabo ipsa iure. Nemo autem soluta minima. At
        repudiandae quod atque Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Quisquam tenetur modi at explicabo ipsa iure. Nemo
        autem soluta minima. At repudiandae quod atque Lorem ipsum dolor, sit
        amet consectetur adipisicing elit. Quisquam tenetur modi at explicabo
        ipsa iure. Nemo autem soluta minima. At repudiandae quod atque Lorem
        ipsum dolor, sit amet consectetur adipisicing elit. Quisquam tenetur
        modi at explicabo ipsa iure. Nemo autem soluta minima. At repudiandae
        quod atque Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Quisquam tenetur modi at explicabo ipsa iure. Nemo autem soluta minima.
        At repudiandae quod atque
      </p>
    </div>
  );
}
