import React from "react";
import "./Login.css";
import user_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";
import { useState, useEffect } from "react";
import userApi from "../../api/user";
import { Navigate } from "react-router-dom";
import RoleTypes from "../../Contstans/Roles.js";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [isLogged, setLogged] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      var response = await post();
      const data = await response.json();
      if (!response.ok) alert(data);
      else {
        localStorage.setItem("Token", data.token);
        localStorage.setItem("Role", data.userRole);
        setLogged(true);
      }
    } else alert("please provide a valid input");
  };

  const post = () => {
    var response = userApi.login(input.username, input.password);
    return response;
  };
  if (isLogged) {
    console.log(localStorage.getItem("Role") === RoleTypes.ADMIN);
    return localStorage.getItem("Role") === RoleTypes.ADMIN ? (
      <Navigate to="/User" />
    ) : (
      <Navigate to="/Product" />
    );
  } else
    return (
      <form className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Name"
              name="username"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="submit-container" onClick={handleSubmitEvent}>
          <div className="submit">Submit</div>
        </div>
      </form>
    );
};

export default Login;
