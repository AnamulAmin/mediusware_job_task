import _ from "lodash";
import React, { useEffect, useState } from "react";

const Problem1 = () => {
  // State variables
  const [show, setShow] = useState("all"); // Show filter option ("all", "active", "completed")
  const [immutableList, setImmutableList] = useState([]); // Immutable list of items
  const [list, setList] = useState([]); // Filtered list of items based on show

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let status = e.target.status.value;

    if (name === "" || status === "") return;

    // Filtering items based on status
    let activeItem = immutableList.filter((item) => item.status === "active");
    let completedItem = immutableList.filter(
      (item) => item.status === "completed"
    );
    let otherItem = immutableList.filter(
      (item) => item.status !== "completed" && item.status !== "active"
    );

    // Adding new item to the appropriate list
    if (!list.some((item) => item.name === name && item.status === status)) {
      if (status === "active") {
        activeItem.push({ name, status });
      } else if (status === "completed") {
        completedItem.push({ name, status });
      } else {
        otherItem.push({ name, status });
      }
      // Updating list and make unique
      const uniqueActiveItem = _.uniq(activeItem);
      const uniqueCompletedItem = _.uniq(completedItem);
      const uniqueOtherItem = _.uniq(otherItem);

      setList([
        ...uniqueActiveItem,
        ...uniqueCompletedItem,
        ...uniqueOtherItem,
      ]);

      setImmutableList([
        ...uniqueActiveItem,
        ...uniqueCompletedItem,
        ...uniqueOtherItem,
      ]);
    }

    // Clearing form inputs
    e.target.name.value = "";
    e.target.status.value = "";
  };

  // Function to handle filter button clicks
  const handleClick = (val) => {
    setShow(val);
  };

  // Effect to update filtered list based on show
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

      setList([
        ...new Set(activeItem),
        ...new Set(completedItem),
        ...new Set(otherItem),
      ]);
    }
  }, [show]);

  // JSX
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          {/* Form for adding new items */}
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
          {/* Filter buttons */}
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
          {/* Table to display items */}
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Rendering list of items */}
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
