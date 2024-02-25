import React, { useState } from "react";
import Modal from "./Modal";

const Problem2 = () => {
  const [modalName, setModalName] = useState("");

  console.log(modalName);
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

          <div className="d-flex justify-content-center gap-3">
            <a
              className="btn btn-lg btn-outline-primary"
              href="#modalA"
              // onClick={getContacts}
              onClick={() => setModalName("modalA")}
            >
              All Contacts
            </a>
            <a
              className="btn btn-lg btn-outline-warning"
              href="#modalB"
              onClick={() => setModalName("modalB")}
            >
              US Contacts
            </a>
          </div>
        </div>
      </div>
      {modalName === "modalA" ? (
        <Modal
          setModalName={setModalName}
          defaultName=""
          modalName={modalName}
        />
      ) : modalName === "modalB" ? (
        <Modal
          setModalName={setModalName}
          defaultName="United States"
          modalName={modalName}
        />
      ) : null}
    </>
  );
};

export default Problem2;
