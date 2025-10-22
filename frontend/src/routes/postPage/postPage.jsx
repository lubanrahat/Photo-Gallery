import React from "react";
import "./postPage.css";
import Image from "../../components/image/image";
import PostInreractions from "../../components/postInreractions/postInreractions";
import { Link, useParams } from "react-router";

import Comments from "../../components/comments/comments";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";

const PostPage = () => {
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["pin", id],
    queryFn: () => apiRequest.get(`/pin/${id}`).then((res) => res.data),
  });
  if (isPending) {
    return <span>Loading...</span>;
  }
  if (error) {
    const serverMsg = error?.response?.data?.message;
    return (
      <span>
        An error has occurred: {serverMsg || error?.message || "Unknown error"}
      </span>
    );
  }
  if (!data) {
    return <span>Data not found</span>;
  }
  console.log(data.user.img);
  return (
    <div className="postPage">
      <Link to="/">
        <svg
          height="20"
          viewBox="0 0 24 24"
          width="20"
          style={{ cursor: "pointer" }}
        >
          <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
        </svg>
      </Link>
      <div className="postContainer">
        <div className="postImg">
          <Image path={data.media} />
        </div>
        <div className="postDetails">
          <PostInreractions />
          <Link to={`/${data.user.username}`} className="postUser">
            <Image path={data.user.img || "general/noAvatar.png"} />
            <span>{data.user.displayName}</span>
          </Link>
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
