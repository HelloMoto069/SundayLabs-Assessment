import React from "react";
// import "./Navbar.css";
import { FaSearch } from "react-icons/fa";

export default function Navbar({ toggleSidebar }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <button className="action_button" onClick={toggleSidebar}>
          Toggle
        </button>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="https://logos-world.net/wp-content/uploads/2021/02/Asana-Logo.jpg"
              alt="Menu"
              style={{ height: "50px", paddingLeft: "1rem", width: "90px" }}
            />
          </a>

          {/* Centering the search bar */}
          <div className="d-flex justify-content-center flex-grow-1">
            <form className="d-flex" role="search">
              <div className="input-group">
                <input
                  className="form-control me-2 rounded-start bg-light-gray text-white"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success rounded-end"
                  type="submit"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
