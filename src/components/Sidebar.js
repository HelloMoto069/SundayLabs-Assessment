import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom"; // Ensure you are using 'Link' from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="container1">
      <div>
        <h2>asana</h2>
        <ul className="list-unstyled">
          <li>
            <Link to="/home" className="text-white text-decoration-none">
              Home
            </Link>
          </li>

          <li>
            <Link to="/myTask" className="text-white text-decoration-none">
              My Task
            </Link>
          </li>
          <li>
            <Link to="/inbox" className="text-white text-decoration-none">
              Inbox
            </Link>
          </li>
          <hr />

          <li>
            <Link to="#insights" className="text-white text-decoration-none">
              Insights
            </Link>
          </li>

          <li>
            <Link to="#reporting" className="text-white text-decoration-none">
              Reporting
            </Link>
          </li>
          <li>
            <Link to="#portfolios" className="text-white text-decoration-none">
              Portfolios
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
