import "./signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register({ setCurrentUser }) {
  const serverUri = process.env.REACT_APP_PROXY;
  const [errors, setErrors] = useState([]);
  const [userExistError, setUserExistError] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    const res = await fetch(`${serverUri}/signup`, {
      method: form.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson),
    });

    const resData = await res.json();

    if (!res.ok) {
      setErrors([]);
      setUserExistError("");
      if (resData.error) {
        return setUserExistError(resData.error);
      }
      return setErrors(resData.errors);
    } else {
      localStorage.setItem("user", JSON.stringify(resData));
      window.location.replace("/");
    }
  }

  return (
    <div className="signup">
      <div className="user-exist-div">{userExistError}</div>
      <form method="POST" className="signup-form" onSubmit={handleSignup}>
        <div className="signup-title">Sign Up</div>
        <div className="signup-formgroup">
          <label htmlFor="signupFirstName">First Name:</label>

          {errors.firstName &&
            errors.firstName.map((err) => {
              return <span className="error-msg">{err}</span>;
            })}

          <input
            className="signup-input"
            type="text"
            id="signupFirstName"
            placeholder="First Name"
            name="firstName"
          />
        </div>
        <div className="signup-formgroup">
          <label htmlFor="signupLastName">First Name:</label>

          {errors.lastName &&
            errors.lastName.map((err) => {
              return <span className="error-msg">{err}</span>;
            })}

          <input
            className="signup-input"
            type="text"
            id="signupLastName"
            placeholder="Last Name"
            name="lastName"
          />
        </div>
        <div className="signup-formgroup">
          <label htmlFor="signupEmail">Email:</label>
          {errors.email &&
            errors.email.map((err) => {
              return <span className="error-msg">{err}</span>;
            })}
          <input
            className="signup-input"
            type="text"
            id="signupEmail"
            placeholder="Email"
            name="email"
          />
        </div>
        <div className="signup-formgroup">
          <label htmlFor="signupPassword">Password:</label>
          {errors.password &&
            errors.password.map((err) => {
              return <span className="error-msg">{err}</span>;
            })}
          <input
            className="signup-input"
            type="password"
            id="signupPassword"
            placeholder="Password"
            name="password"
          />
        </div>
        <div className="signup-formgroup">
          <label htmlFor="signupConfirmPassword">Confirm Password:</label>
          {errors.confirmPassword &&
            errors.confirmPassword.map((err) => {
              return <span className="error-msg">{err}</span>;
            })}
          <input
            className="signup-input"
            type="password"
            id="signupConfirmPassword"
            placeholder="Confirm Password"
            name="confirmPassword"
          />
        </div>
        <button className="signup-submit" type="submit">
          Submit
        </button>
      </form>
      <div className="signup-redirect">
        <span className="signup-redirect-text">Already have an account? </span>
        <Link className="link anchor-like" to="/login">
          Log In
        </Link>
      </div>
    </div>
  );
}
