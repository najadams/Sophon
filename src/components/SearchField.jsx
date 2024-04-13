import React from "react";

const SearchField = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
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
      />
    </form>
  );
};

export default SearchField;
