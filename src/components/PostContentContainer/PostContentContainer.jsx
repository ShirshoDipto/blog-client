import "./postContentContainer.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentContainer from "../commentContainer/CommentContainer";
import PostContent from "../postContent/PostContent";

export default function PostContentContainer({ currentUser }) {
  const postPlaceholder = {
    title: "",
    content: "",
    date: "",
    author: {
      authorId: "",
      firstName: "",
      lastName: "",
    },
    numComments: "",
    numLikes: "",
    isPublished: "",
  };

  const params = useParams();
  const [postState, setPostState] = useState({
    post: postPlaceholder,
    isLiked: {},
  });

  const serverUri = process.env.REACT_APP_PROXY;

  async function deleteLike() {
    const res = await fetch(
      `${serverUri}/posts/${params.postId}/likes/${postState.isLiked.postLike._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    if (!res.ok) {
      return "Something bad happened. Error Ocurred. ";
    }
  }

  async function addLike() {
    const res = await fetch(`${serverUri}/posts/${params.postId}/likes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });

    if (!res.ok) {
      return "Something bad happened. Error Ocurred. ";
    }
    const like = await res.json();
    return like;
  }

  async function delLikeFromPost() {
    const res = await fetch(`${serverUri}/posts/${params.postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updateType: "like",
        numLikes: postState.post.numLikes - 1,
      }),
    });

    if (!res.ok) {
      console.log(await res.json());
      return "Something bad happened.";
    }

    const resData = await res.json();
    return resData.post;
  }

  async function addLikeToPost() {
    const res = await fetch(`${serverUri}/posts/${params.postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updateType: "like",
        numLikes: postState.post.numLikes + 1,
      }),
    });

    if (!res.ok) {
      console.log(await res.json());
      return "Something bad happened.";
    }

    const resData = await res.json();
    return resData.post;
  }

  async function handleLike() {
    if (!currentUser) {
      return alert("Log in to Like. ");
    }
    if (Object.keys(postState.isLiked).length > 0) {
      const responses = await Promise.all([deleteLike(), delLikeFromPost()]);
      return setPostState({ post: responses[1], isLiked: {} });
    } else {
      const responses = await Promise.all([addLike(), addLikeToPost()]);
      return setPostState({ post: responses[1], isLiked: responses[0] });
    }
  }

  useEffect(() => {
    async function fetchPostsAndLikes() {
      if (currentUser) {
        const postsAndLikes = await Promise.all([
          fetch(`${serverUri}/posts/${params.postId}`),
          fetch(`${serverUri}/posts/${params.postId}/likes`, {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }),
        ]);
        const thePost = await postsAndLikes[0].json();
        const theLike = await postsAndLikes[1].json();

        if (!theLike.error) {
          return setPostState({ post: thePost.post, isLiked: theLike });
        }
        return setPostState({ post: thePost.post, isLiked: {} });
      } else {
        const res = await fetch(`${serverUri}/posts/${params.postId}`);
        const thePost = await res.json();
        return setPostState({ post: thePost.post, isLiked: {} });
      }
    }

    fetchPostsAndLikes().catch((err) => {
      console.log(err);
    });
  }, [params.postId]);

  return (
    <div className="post-content-container">
      <div className="post-content-wrapper">
        <PostContent
          currentUser={currentUser}
          postState={postState}
          handleLike={handleLike}
        />
        <CommentContainer currentUser={currentUser} post={postState.post} />
      </div>
    </div>
  );
}
