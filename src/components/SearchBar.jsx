import React from "react";

function SearchBar({ onSearch, searchValue }) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="btn btn-primary" type="button" id="button-addon2">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
