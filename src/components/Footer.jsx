import React from "react";

function Footer({ setIsChecked, isChecked, setModalName, setCountryName }) {
  return (
    <footer className="modal-container-footer">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={isChecked}
          id="flexCheckChecked"
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="flexCheckChecked">
          Only Event
        </label>
      </div>
      <a
        href="#modalA"
        className="btn btn-primary"
        onClick={() => {
          setModalName("modalA");
          setCountryName("");
        }}
      >
        Modal A
      </a>
      <a
        href="#modalB"
        className="btn btn-success"
        onClick={() => {
          setModalName("modalB");
          setCountryName("United States");
        }}
      >
        Modal B
      </a>
      <a href="#" className="btn btn-warning" onClick={() => setModalName("")}>
        Close
      </a>
    </footer>
  );
}

export default Footer;
