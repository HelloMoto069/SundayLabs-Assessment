import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; 
import MyTask from "./components/otherPages/MyTask";

function App() {
  const [show, setShow] = useState(false);

  const toggleSidebar = () => {
    setShow(!show);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout toggleSidebar={toggleSidebar} />}>
          <Route path="/home" element={<MyTask />} />
          <Route path="/myTask" element={<MyTask />} />
          <Route path="/inbox" element={<MyTask />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
