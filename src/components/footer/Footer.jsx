import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-bar">
        <div className="footer-social">
          <span className="fs-name">FIND ME</span>
          <i className="sidebar-icon fa-brands fa-square-facebook"></i>
          <i className="sidebar-icon fa-brands fa-square-twitter"></i>
          <i className="sidebar-icon fa-brands fa-square-instagram"></i>
        </div>
        <div className="footer-logo">Shirsho</div>
        <div className="footer-moto">Thoughts Stories And Ideas.</div>
      </div>
      <hr className="footer-hr" />
      <div className="footer-cats">
        <span className="footer-cats-item">Life</span>
        <span className="footer-cats-item">Sport</span>
        <span className="footer-cats-item">Cinema</span>
        <span className="footer-cats-item">Food</span>
        <span className="footer-cats-item">Music</span>
        <span className="footer-cats-item">Tech</span>
      </div>
      <div className="footer-copyrights">
        <span className="copyrights-item">
          Copyright <i className="copyright fa-regular fa-copyright"></i>{" "}
          Shirsho Dipto
        </span>
        <span className="copyrights-item">PRIVACY</span>
        <span className="copyrights-item">TERMS</span>
      </div>
    </div>
  );
}
