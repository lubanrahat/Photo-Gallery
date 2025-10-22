import React from "react";
import "./gallery.css";
import GalleryItem from "../galleryItem/galleryItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const fetchPins = async ({ pageParam, search }) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/pin?cursor=${pageParam}&search=${
      search || ""
    }`
  );
  return res.data;
};

const Gallery = ({ search }) => {
  const { data, fetchNextPage, hasNextPage, status, error } = useInfiniteQuery({
    queryKey: ["pin"],
    queryFn: ({ pageParam = 0 }) => fetchPins(pageParam, search),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (status === "pending") {
    return (
      <div className="loading-wrap">
        <span className="loader"></span>
        <span className="loading-text">Loading...</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="error">
        Failed to load pins: {error?.message || "Unknown error"}
      </div>
    );
  }

  const allPins = data?.pages.flatMap((page) => page.pins) || [];

  if (!allPins.length) {
    return <div className="no-pins">No pins available yet.</div>;
  }

  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={() => {
        if (hasNextPage) fetchNextPage();
      }}
      hasMore={!!hasNextPage}
      loader={
        <div className="loading-wrap">
          <span className="loader"></span>
          <span className="loading-text">Loading more...</span>
        </div>
      }
      endMessage={<h3>All pins loaded</h3>}
    >
      <div className="gallery">
        {allPins.map((item) => (
          <GalleryItem key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Gallery;
