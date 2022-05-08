import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <i className="fas fa-user-graduate"></i> Attendance Portal
      </div>
      <div className="nav-links">
      <Link to="/logs" className="nav-link"><i className="fas fa-calendar-alt"></i> Attendance Logs</Link>
    </div>
    </div>
  );
};

export default Navbar;