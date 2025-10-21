import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loginAPI } from "../../API/login";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/userSlice";
import "./Login.scss";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const buttonStyle = loading
    ? {
        backgroundColor: "#ccc",
        cursor: "not-allowed",
        border: "none",
        padding: ".5rem",
        borderRadius: "1rem",
      }
    : {
        backgroundColor: "#4CAF50",
        cursor: "pointer",
        border: "none",
        padding: ".5rem",
        borderRadius: "1rem",
      };

  // useEffect(() => {
  //   debugger;
  //   if (token) {
  //     debugger;
  //     nav("/home");
  //   }
  // }, [nav, token]);

  // Call login API
  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    const username = e.target.username.value;
    const password = e.target.password.value;

    const response = await loginAPI(username, password);
    setLoading(false);

    if (response.status === 200) {
      dispatch(logIn(response.token));
      nav("/home");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login">
      <form className="login-form shadow" onSubmit={login}>
        <h2>Login</h2>
        <div className="form-group">
          <div>
            <label htmlFor="username">Username:</label>
          </div>
          <input
            className="inp"
            type="text"
            id="username"
            name="username"
            required
          />
        </div>
        <div className="form-group">
          <div>
            <label htmlFor="password">Password:</label>
          </div>
          <input
            className="inp"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
