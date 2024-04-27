import { NavLink } from "react-router-dom";

const Sidebar = ({ isExpanded, toggleSidebar }) => {

  return (
    <nav className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>

      {/* CODE FOR THE CHEVRON */}

      <div className="chevron" onClick={toggleSidebar}>
        <i
          className={`toggle bx ${
            isExpanded ? "bx-chevron-left" : "bx-chevron-right"
          }`}></i>
      </div>

      {/* CODE FOR THE MAIN CONTENT */}

      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
              <NavLink to={"/dashboard"} activeclassname="active">
                <i className="bx bxs-home icon"></i>
                <span className="text nav-text">DashBoard</span>
              </NavLink>
            </li>

            <li className="nav-link">
              <NavLink to={"/sales"} activeclassname="active">
                <i className="bx bx-receipt icon"></i>
                <span className="text nav-text">Make Sales</span>
              </NavLink>
            </li>  
            <li className="nav-link">
              <NavLink to={"/customers"} activeclassname="active">
                <i className="bx bxs-user-plus icon"></i>
                <span className="text nav-text">Customers</span>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink to={"/products"} activeclassname="active">
                <i className="bx bx-cart-alt icon"></i>
                <span className="text nav-text">Stock</span>
              </NavLink>
            </li>
{/* 
            <li className="nav-link">
              <NavLink to={"/stocks"} activeclassname="active">
                <i className="bx bxs-user-plus icon"></i>
                <span className="text nav-text">Create Class</span>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink to={"/lecturer/analytics"} activeclassname="active">
                <i className="bx bxs-pie-chart-alt-2 icon"></i>
                <span className="text nav-text">Analysis</span>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink to={"/"} activeclassname="active">
                <i className="bx bx-cart-add icon"></i>
                <span className="text nav-text">Analysis</span>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink to={"/lecturer/analytics"} activeclassname="active">
                <i className="bx bxs-bell icon"></i>
                <span className="text nav-text">Notifications</span>
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
