import React, { useState } from "react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isExpanded, toggleSidebar }) => {

  return (
    <div
      className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}
      onClick={toggleSidebar}>
      <Button variant="contained">Hello world</Button>;
      {/* Sidebar content goes here */}
    </div>
  );
};

export default Sidebar;
