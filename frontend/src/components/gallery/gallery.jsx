import React from "react";
import "./gallery.css";
import GalleryItem from "../galleryItem/galleryItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

// Temporary fallback
// const items = [
//   { id: 1, media: "/pins/pin1.jpeg", width: 1260, height: 1000 },
//   { id: 2, media: "/pins/pin2.jpeg", width: 1260, height: 1400 },
//   { id: 3, media: "/pins/pin3.jpeg", width: 1260, height: 1400 },
//   // ... (rest of your items)
// ];

const fetchPins = async ({pageParam}) => {
  const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/pin?cursor=${pageParam}`);
  return res.data;
};

const Gallery = () => {
  const { data,fetchNextPage,hasNextPage,status } = useInfiniteQuery({
    queryKey: ["pin"],
    queryFn: fetchPins,
    initialPageParam: 0,
    getNextPageParam: (lastPage,pages) => lastPage.nextCursor,
  });

  if (status === "pending") return <div>Loading...</div>;

  if (status === "error")
    return <div className="error">Failed to load pins:</div>;

  // fallback to local items if API returns nothing
  console.log(data);

  return (
    <div className="gallery">
      {/* {data?.map((item) => (
        <GalleryItem key={item._id} item={item} />
      ))} */}
    </div>
  );
};

export default Gallery;
