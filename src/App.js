import "./App.css";
import Login from "./Components/Login/Login.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./Pages/User.jsx";
import Product from "./Pages/Product.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/User" element={<User />} />
        <Route path="/Product" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
