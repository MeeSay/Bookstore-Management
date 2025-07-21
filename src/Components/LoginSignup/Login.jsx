import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import axios from "axios";

import user_icon from "../../Assets/person.png";
import password_icon from "../../Assets/password.png";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [name, password]);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); //ngăn reload trang khi nhấn nút đăng nhập
    if (!name || !password) {
      // Kiểm tra xem tên và mật khẩu có được nhập hay không
      setError("Không được để trống tên hoặc mật khẩu");
      return;
    }

    if (error === "") {
      axios
        .post("http://localhost:3001/login", { name, password })
        .then((res) => {
          if (res.data.message === "Database error") {
            console.log("Database error:", res.data.error);
            return;
          } else {
            if (res.data.message === "Wrong password") {
              setError("Sai mật khẩu");
            } else if (res.data.message === "User not found") {
              setError("Người dùng không tồn tại");
            } else {
              navigate("/dashboard"); // Chuyển hướng đến trang chính nếu đăng nhập thành công
            }
          }
        })
        .catch((err) => console.log("Axios error:", err));
    }
    setError(""); // Reset error message after handling
  };

  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="text">Đăng nhập</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder={"name"}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder={"password"}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="forgot-password">
          Lost Password? <span>Click here!</span>
        </div>
        <div className="submit-container">
          <Link to="/signup" className="submit gray">
            Sign Up
          </Link>
          <button className="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
        {error ? <div className="error-message">{error}</div> : null}
      </div>
    </div>
  );
};

export default Login;
