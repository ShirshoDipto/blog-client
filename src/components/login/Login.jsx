import "./login.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const serverUri = process.env.REACT_APP_PROXY;
  const [errors, setErrors] = useState([]);
  const [userExistError, setUserExistError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    const res = await fetch(`${serverUri}/login`, {
      method: form.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson),
    });

    let resData;

    if (!res.ok) {
      setErrors([]);
      setUserExistError("");

      if (res.status === 401) {
        return setUserExistError("Invalid User. Create a new account. ");
      }

      resData = await res.json();
      if (resData.error) {
        return setUserExistError(resData.error);
      }

      return setErrors(resData.errors);
    } else {
      resData = await res.json();
      localStorage.setItem("user", JSON.stringify(resData));
      window.location.replace("/");
    }
  }

  return (
    <div className="login">
      <div className="user-exist-div">{userExistError}</div>
      <form method="POST" className="login-form" onSubmit={handleLogin}>
        <div className="login-title">Login</div>
        <div className="login-form-email">
          <label htmlFor="loginEmail">Email:</label>

          {errors.email &&
            errors.email.map((err) => {
              return <span className="error-msg">{err}</span>;
            })}

          <input
            className="login-input"
            type="text"
            id="loginEmail"
            placeholder="Email"
            name="email"
          />
        </div>
        <div className="login-form-password">
          <div className="login-password-container">
            <label htmlFor="loginPassword">Password:</label>
            <Link className="link anchor-like" to="reset-password">
              Forgot Password?
            </Link>
          </div>

          {errors.password &&
            errors.password.map((err) => {
              return <span className="error-msg">{err}</span>;
            })}

          <input
            className="login-input"
            type="password"
            id="loginPassword"
            placeholder="Password"
            name="password"
          />
        </div>
        <button type="submit" className="login-submit">
          Submit
        </button>
      </form>
      <div className="login-redirect">
        Don't have an account?{" "}
        <Link className="link anchor-like" to={"/signup"}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}
