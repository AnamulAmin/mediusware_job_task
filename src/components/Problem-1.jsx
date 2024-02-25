import React, { useEffect, useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [immutableList, setImmutableList] = useState([]);
  const [list, setList] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let status = e.target.status.value;

    if (name === "" || status === "") return;
    let activeItem = immutableList.filter((item) => item.status === "active");
    let completedItem = immutableList.filter(
      (item) => item.status === "completed"
    );
    let otherItem = immutableList.filter(
      (item) => item.status !== "completed" && item.status === "active"
    );

    if (!list.some((item) => item.name === name && item.status === status)) {
      if (status === "active") {
        activeItem.push({ name, status });
      } else if (status === "completed") {
        completedItem.push({ name, status });
      } else {
        otherItem.push({ name, status });
      }
      setList([...activeItem, ...completedItem, ...otherItem]);
      setImmutableList([...activeItem, ...completedItem, ...otherItem]);
    }

    e.target.name.value = "";
    e.target.status.value = "";

    console.log([...activeItem, completedItem, otherItem]);
  };

  const handleClick = (val) => {
    setShow(val);
  };

  useEffect(() => {
    if (show === "active") {
      setList(() => immutableList.filter((item) => item.status === "active"));
    } else if (show === "completed") {
      setList(() =>
        immutableList.filter((item) => item.status === "completed")
      );
    } else {
      const activeItem = immutableList.filter(
        (item) => item.status === "active"
      );
      const completedItem = immutableList.filter(
        (item) => item.status === "completed"
      );
      const otherItem = immutableList.filter(
        (item) => item.status !== "completed" && item.status === "active"
      );

      setList([...activeItem, ...completedItem, ...otherItem]);
    }
  }, [show]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={onSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                name="status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {list &&
                list.map((item, index) => (
                  <tr key={index} style={{ textTransform: "capitalize" }}>
                    <td scope="col">{item.name}</td>
                    <td scope="col">{item.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
