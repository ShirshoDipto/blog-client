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
      `${serverUri}/posts/${params.postId}/likes/${postState.isLiked._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    if (!res.ok) {
      console.log("Something bad happened. Error Ocurred.");
      console.log(await res.json());
      return;
    }

    const resData = await res.json();
    return resData;
  }

  async function addLike() {
    const res = await fetch(`${serverUri}/posts/${params.postId}/likes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });

    if (!res.ok) {
      console.log("Something bad happened. Error Ocurred.");
      console.log(await res.json());
      return;
    }

    const resData = await res.json();
    return resData;
  }

  async function handleLike() {
    if (!currentUser) {
      return alert("Log in to Like. ");
    }
    if (Object.keys(postState.isLiked).length > 0) {
      const responses = await deleteLike();
      setPostState({ post: responses.post, isLiked: {} });
    } else {
      const responses = await addLike();
      setPostState({ post: responses.post, isLiked: responses.postLike });
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
          return setPostState({
            post: thePost.post,
            isLiked: theLike.postLike,
          });
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
