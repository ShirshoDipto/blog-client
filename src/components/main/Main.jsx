import "./main.css";
import MainHeader from "../mainHeader/MainHeader";
import Sidebar from "../about/About";
import Posts from "../posts/Posts";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../footer/Footer";

export default function Main({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const serverUri = process.env.REACT_APP_PROXY;
  const { search } = useLocation();

  useEffect(() => {
    async function fetchAllPosts() {
      const res = await fetch(`${serverUri}/posts`);
      const resData = await res.json();
      setPosts(resData.allPosts);
    }

    fetchAllPosts().catch((err) => {
      console.log(err);
    });
  }, [search]);

  return (
    <div className="main">
      <MainHeader />
      <div className="home">
        <Posts posts={posts} currentUser={currentUser} />
      </div>
      <Footer />
    </div>
  );
}
