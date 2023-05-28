import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import "../assets/style.css";

const Problem2 = () => {
  const [show, setShow] = useState(false);
  const [contacts, setContacts] = useState([]);

  const handleClose = () => setShow(false);
  const handleShowAll = () => {
    handleApi("");
    setShow(true);
  };
  const handleShowUs = () => {
    handleApi("united states");
    setShow(true);
  };

  const handleApi = async (param) => {
    try {
      if (param === "") {
        const res = await axios.get(`${baseUrl}/contacts/`);
        const result = res.data;
        setContacts(result.results);
      } else {
        const res = await axios.get(`${baseUrl}/country-contacts/${param}/`);
        const result = res.data;
        setContacts(result.results);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button className="modal-btn-one btn-lg" onClick={handleShowAll}>
            All Contacts
          </button>
          <button className="modal-btn-two btn-lg" onClick={handleShowUs}>
            US Contacts
          </button>
        </div>
      </div>
      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Phone</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((items, i) => {
                return (
                  <tr key={i}>
                    <td>{items?.phone}</td>
                    <td>{items?.country?.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <button className="modal-btn-one" onClick={handleShowAll}>
            All contacts
          </button>
          <button className="modal-btn-two" onClick={handleShowUs}>
            US contacts
          </button>
          <button className="modal-btn-three" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Problem2;
