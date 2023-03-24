import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./user.css";

export default function User({ currentUser, setCurrentUser }) {
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
            placeholder={currentUser.user.firstName}
            name="firstName"
          />
          <label>Last Name</label>
          <input
            type="text"
            placeholder={currentUser.user.lastName}
            name="lastName"
          />
          <label>Email</label>
          <input
            type="text"
            placeholder={currentUser.user.email}
            name="email"
            disabled={true}
          />
          <label>Password</label>

          <button className="user-update">Update Account</button>
          <button className="user-logout">Log Out</button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
