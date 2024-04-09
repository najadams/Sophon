import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return <div className="page">Dashboard
    <div><NavLink to="/products">products</NavLink></div>
  </div>;
};

export default Dashboard;
