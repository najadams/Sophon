import React, { useState } from "react";

const SearchField = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch(searchTerm);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="search-box"
      style={{
        display: "flex",
        outline: "thin",
        borderRadius: 20,
        padding: 10,
        boxShadow: 1,
        maxWidth : 200
      }}>
      <i
        className="bx bx-search-alt icon"
        style={{ fontSize: 30, paddingTop: 5 }}></i>
      <input
        type="search"
        className="searcox"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};

export default SearchField;