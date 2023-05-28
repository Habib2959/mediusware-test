import React, { useEffect, useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const [renderedData, setRenderedData] = useState([]);

  useEffect(() => {
    if (show === "all") {
      let sortedAllData = [];
      let otherData = [];
      data.map((item) => {
        if (item.status === "active") {
          sortedAllData.unshift(item);
        } else if (item.status === "completed") {
          sortedAllData.push(item);
        } else {
          otherData = data.filter(
            (item) => item.status !== "active" && item.status !== "completed"
          );
        }
      });
      setRenderedData([...sortedAllData, ...otherData]);
    }
  }, [data]);

  const handleClick = (val) => {
    let showData = data;
    let sortedAllData = [];
    let otherData = [];
    if (val === "all") {
      showData.map((item) => {
        if (item.status === "active") {
          sortedAllData.unshift(item);
        } else if (item.status === "completed") {
          sortedAllData.push(item);
        } else {
          otherData = showData.filter(
            (item) => item.status !== "active" && item.status !== "completed"
          );
        }
      });
      setRenderedData([...sortedAllData, ...otherData]);
    } else {
      showData = data.filter((item) => item.status === val);
      setRenderedData(showData);
    }
    setShow(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "" || status !== "") {
      const newData = { name: name, status: status };
      setData((prev) => [...prev, newData]);
    } else {
      alert("put a valid task");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                onChange={(e) => setStatus(e.target.value.toLocaleLowerCase())}
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
              {renderedData.map((items, i) => {
                return (
                  <tr key={i}>
                    <td>{items.name}</td>
                    <td>{items.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
