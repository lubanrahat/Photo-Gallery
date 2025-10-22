import React, { useState } from "react";
import "./profilePage.css";
import Image from "../../components/image/image";
import Gallery from "../../components/gallery/gallery";
import Collections from "../../components/collections/collections";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";

const ProfilePage = () => {
  const [type, setType] = useState("created");
  const { username } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
  });

  console.log(data);

  if (isPending) return <span>Loading...</span>;

  if (error) {
    const serverMsg = error?.response?.data?.message;
    return (
      <span>
        An error has occurred: {serverMsg || error?.message || "Unknown error"}
      </span>
    );
  }

  if (!data) return <span>Data not found</span>;

  return (
    <div className="profilePage">
      <Image
        className="profileImg"
        w={100}
        h={100}
        path={data.img || "/general/noAvatar.png"}
        alt="Profile"
      />
      <h1 className="profileName">{data.displayName || "Unknown User"}</h1>
      <span className="profileUsername">@{data.username}</span>
      <div className="followCounts">
        {data.followers?.length || 0} followers · {data.following?.length || 0}{" "}
        following
      </div>

      <div className="profileInteractions">
        <Image path="/general/share.svg" alt="Share" />
        <div className="profileButtons">
          <button>Message</button>
          <button>Follow</button>
        </div>
        <Image path="/general/more.svg" alt="More" />
      </div>

      <div className="profileOptions">
        <span
          onClick={() => setType("created")}
          className={type === "created" ? "active" : ""}
        >
          Created
        </span>
        <span
          onClick={() => setType("saved")}
          className={type === "saved" ? "active" : ""}
        >
          Saved
        </span>
      </div>

      {type === "created" ? (
        <Gallery userId={data._id} />
      ) : (
        <Collections userId={data._id} />
      )}
    </div>
  );
};

export default ProfilePage;
