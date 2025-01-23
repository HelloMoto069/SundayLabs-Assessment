import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "./Layout.css";


export default function Layout({ toggleSidebar }) {
  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      <div >
        <Sidebar />
        <div >
          {/* This is where the individual pages like MyTask, Inbox will be rendered */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
