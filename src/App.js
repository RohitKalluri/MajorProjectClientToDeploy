import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Logs from "./components/logs/logs";
import Navbar from "./components/navbar/navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/logs" element={<Logs />} />
      </Routes>
    </Router>
  );
};

export default App;