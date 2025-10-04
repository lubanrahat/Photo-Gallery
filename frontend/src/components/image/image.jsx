import React from "react";
import { Image } from "@imagekit/react";

const image = ({path, alt, className, w, h }) => {
  return (
    <Image
      urlEndpoint="https://ik.imagekit.io/znnwwc7qk"
      src={path}
      transformation={[
        {
          width: w,
          height: h,
          crop: "at_max",
          focus: "center",
        },
      ]}
      alt={alt || "gallery image"}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      className={className}
    />
  );
};

export default image;
