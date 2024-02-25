import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NestedModal from "./NestedModal";
import Footer from "./Footer";
import SearchBar from "./SearchBar";

function Modal({ setModalName, defaultName, modalName }) {
  // State variables
  const [count, setCount] = useState(0); // Total count of contacts
  const [singleCountryData, setSingleCountryData] = useState({}); // Data for a single country
  const [contacts, setContacts] = useState([]); // List of contacts
  const [pageSize, setPageSize] = useState(40); // Number of contacts to fetch per page
  const [countryName, setCountryName] = useState(defaultName); // Name of the country to fetch contacts for
  const [searchValue, setSearchValue] = useState(""); // Value of the search input
  const [isChecked, setIsChecked] = useState(false); // Whether checkbox is checked
  console.log(modalName);

  // Function to handle search
  const onSearch = (newValue) => {
    setSearchValue(newValue);
    let timeoutId;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setCountryName(newValue);
    }, 1000);
  };

  // Effect to fetch contacts when page size, country name, or modal name changes
  useEffect(() => {
    // Fetch contacts based on conditions
    if (countryName !== "United States" && modalName !== "modalB") {
      // Fetch contacts for a specific country if name is not empty
      if (countryName === "") {
        fetch(
          `https://contact.mediusware.com/api/contacts/?page=2&page_size=${pageSize}`
        )
          .then((res) => res.json())
          .then((data) => {
            setCount(data.count);
            setContacts(data?.results);
          });
      } else {
        fetch(
          `https://contact.mediusware.com/api/country-contacts/${countryName}/?page_size=${pageSize}`
        )
          .then((res) => res.json())
          .then((data) => {
            setCount(data.count);
            setContacts(data?.results);
          });
      }
    } else {
      // Fetch contacts for United States or specific country
      if (countryName !== "") {
        fetch(
          `https://contact.mediusware.com/api/country-contacts/${countryName}/?page_size=${pageSize}`
        )
          .then((res) => res.json())
          .then((data) => {
            setCount(data?.count);
            setContacts(data?.results);
          });
      } else {
        fetch(
          `https://contact.mediusware.com/api/country-contacts/United States/?page_size=${pageSize}`
        )
          .then((res) => res.json())
          .then((data) => {
            setCount(data.count);
            setContacts(data?.results);
          });
      }
    }
  }, [pageSize, countryName, modalName]);

  // Render component
  return (
    <div className="modal">
      <article className="modal-container">
        {/* Modal Header */}
        <header
          className="modal-container-header"
          style={{ paddingBottom: "3px", borderBottom: "0px" }}
        >
          <h1 className="modal-container-title">
            {modalName === "modalA" ? "Modal A" : "Modal B"}
          </h1>
          {/* Close button */}
          <a href="#" className="icon-button" onClick={() => setModalName("")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
              />
            </svg>
          </a>
        </header>
        {/* SearchBar Component */}
        <SearchBar onSearch={onSearch} searchValue={searchValue} />
        <section
          className="modal-container-body position-relative"
          id="scrollableDiv"
          style={{ width: "100%", padding: "20px 10px" }}
        >
          {/* InfiniteScroll Component */}
          <InfiniteScroll
            dataLength={contacts.length} // Number of contacts currently loaded
            next={() => setPageSize(pageSize + 40)} // Function to load more contacts
            hasMore={count > pageSize} // Whether there are more contacts to load
            loader={<h4>Loading...</h4>} // Loader displayed while loading more contacts
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            scrollableTarget="scrollableDiv"
          >
            {/* List of Contacts */}
            <ul className="list-group ">
              {contacts &&
                contacts.map((item) => (
                  <li
                    className="list-group-item"
                    key={item.id}
                    onClick={() => setSingleCountryData(item)}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>{item?.country?.name}</span>
                    <span>{item?.phone}</span>
                    {isChecked ? (
                      <span className="btn btn-info">{item?.country?.id}</span>
                    ) : null}
                  </li>
                ))}
            </ul>
          </InfiniteScroll>
          {/* NestedModal Component */}
          {Object.keys(singleCountryData).length > 0 ? (
            <NestedModal
              setSingleCountryData={setSingleCountryData}
              singleCountryData={singleCountryData}
            />
          ) : null}
        </section>
        {/* Footer Component */}
        <Footer
          setIsChecked={setIsChecked}
          isChecked={isChecked}
          setModalName={setModalName}
          setCountryName={setCountryName}
        />
      </article>
    </div>
  );
}

export default Modal;
