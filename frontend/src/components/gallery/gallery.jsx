import React from "react";
import "./gallery.css";
import GalleryItem from "../galleryItem/galleryItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const fetchPins = async ({ pageParam }) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/pin?cursor=${pageParam}`
  );
  return res.data;
};

const Gallery = () => {
  const { data, fetchNextPage, hasNextPage, status, error } = useInfiniteQuery({
    queryKey: ["pin"],
    queryFn: fetchPins,
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

  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more pins...</h4>}
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
