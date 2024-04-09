import React, { useState } from "react";
import Button from "@mui/material/Button";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

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
