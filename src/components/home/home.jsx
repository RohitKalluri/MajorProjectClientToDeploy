import Register from "../register/register";
import "./home.css";
import grad from "../../assets/events.svg";

const Home = () => {
  return (
    <div className="auth-left">
      <div className="form-selector">
        <div className="main-header">
          Welcome to <span style={{ color: "#a6c" }}>Attendance Portal</span><br /><br />
          <img className="main-img" src={grad} alt="grad" />
        </div>
        <Register />
      </div>
    </div>
  );
};

export default Home;