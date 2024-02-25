import React from "react";

function NestedModal({ singleCountryData, setSingleCountryData }) {
  return (
    <div
      className="modal-container bg-light position-fixed top-50 start-50 translate-middle"
      style={{ maxWidth: "300px", maxHeight: "350px" }}
    >
      <a
        href="#"
        className="icon-button"
        onClick={() => setSingleCountryData({})}
      >
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
      <ul class="list-group ">
        <li class="list-group-item pt-4 position-relative">
          <span className="d-block">
            <b>Name:</b> {singleCountryData?.country.name}
          </span>
          <span className="d-block">
            <b>Phone:</b> {singleCountryData?.phone}
          </span>
          <span className="d-block">
            <b>Id:</b>
            {singleCountryData?.country?.id}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default NestedModal;
