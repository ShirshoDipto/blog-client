import Footer from "../footer/Footer";
import "./contact.css";

export default function Contact() {
  const root = process.env.REACT_APP_ROOT;

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <div className="contact-header">
          <img src={`${root}/assets/images/login4.jpg`} alt="" />
          <div className="contact-title">
            <span>CONTACT ME</span>
          </div>
        </div>
        <div className="contact-form-wrapper">
          <form className="contact-form">
            <div className="contact-formgroup">
              <input
                className="contact-input"
                type="text"
                id="contactFirstName"
                placeholder="First Name"
                name="firstName"
              />
              <input
                className="contact-input"
                type="text"
                id="contactLastName"
                placeholder="Last Name"
                name="lastName"
              />
            </div>
            <input
              className="contact-input"
              type="text"
              id="contactEmail"
              placeholder="Email"
              name="email"
            />
            <textarea
              className="contact-input"
              name="contactInquiry"
              id="contact-detail"
              cols="30"
              rows="10"
              placeholder="Tell us about your inquiry"
            ></textarea>
            <button className="contact-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
