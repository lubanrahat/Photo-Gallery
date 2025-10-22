import React from "react";
import "./searchPage.css";
import Gallery from "../../components/gallery/gallery";
import { useSearchParams } from "react-router";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  return (
    <div className="searchPage">
      <Gallery search={search} />
    </div>
  );
};

export default SearchPage;
