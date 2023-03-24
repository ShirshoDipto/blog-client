import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import PostDetail from "./components/postDetail/PostDetail";
import Write from "./components/write/Write";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/user/User";
import { useState } from "react";
import ScrollToTop from "./ScrollToTop";

function App() {
  const user = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState(JSON.parse(user));

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <Header currentUser={currentUser} />
        <Routes>
          <Route path="/" element={<Main currentUser={currentUser} />} />
          <Route
            path="/signup"
            element={
              currentUser ? (
                <Main currentUser={currentUser} />
              ) : (
                <Signup setCurrentUser={setCurrentUser} />
              )
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? (
                <Main currentUser={currentUser} />
              ) : (
                <Login setCurrentUser={setCurrentUser} />
              )
            }
          />
          <Route
            path="/write"
            element={
              currentUser ? <Write currentUser={currentUser} /> : <Signup />
            }
          />
          <Route
            path="/post/:postId"
            element={<PostDetail currentUser={currentUser} />}
          />
          <Route
            path="/user"
            element={
              <User currentUser={currentUser} setCurrentUser={setCurrentUser} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
