import { useState } from "react";
import Sidebar from "../about/About";
import "./user.css";

export default function User({ currentUser, setCurrentUser }) {
  async function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.replace("/");
  }

  return (
    <div className="user">
      <div className="user-wrapper">
        <div className="user-title">
          <div className="user-title-your-account">Your Account</div>
          <div className="user-title-delete">Delete Account</div>
        </div>
        <form className="user-form">
          <label>First Name</label>
          <input
            type="text"
            placeholder={currentUser && currentUser.user.firstName}
            name="firstName"
          />
          <label>Last Name</label>
          <input
            type="text"
            placeholder={currentUser && currentUser.user.lastName}
            name="lastName"
          />
          <label>Email</label>
          <input
            type="text"
            placeholder={currentUser && currentUser.user.email}
            name="email"
            disabled={true}
          />

          <button className="user-update">Update Account</button>
          <button className="user-logout" onClick={handleLogout}>
            Log Out
          </button>
        </form>
      </div>
      {/* <Sidebar /> */}
    </div>
  );
}
