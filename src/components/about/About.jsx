import Footer from "../footer/Footer";
import "./about.css";

export default function About() {
  const root = process.env.REACT_APP_ROOT;
  return (
    <div className="about-container">
      <div className="about">
        <div className="about-item">
          {/* <div className="about-title">ABOUT ME</div> */}
          <img
            className="about-img"
            src={root + "/assets/images/profilePic.jpeg"}
            alt=""
          />
          <p className="about-text">
            Shirsho Dipto dolor sit, amet consectetur adipisicing elit.
            Necessitatibus recusandae voluptatem officiis quis temporibus, Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Repellat eius
            sequi dolorem dolores sapiente obcaecati ducimus corrupti tempore
            molestiae et fuga iure officia exercitationem illum, architecto
            impedit, esse voluptatibus repellendus.
          </p>
        </div>
        <div className="about-item">
          <div className="about-title">WHAT DO I WRITE?</div>
          <p className="about-text">
            Shirsho Dipto dolor sit, amet consectetur adipisicing elit.
            Necessitatibus recusandae voluptatem officiis quis temporibus, Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Repellat eius
            sequi dolorem dolores sapiente obcaecati ducimus corrupti tempore
            molestiae et fuga iure officia exercitationem illum, architecto
            impedit, esse voluptatibus repellendus.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
