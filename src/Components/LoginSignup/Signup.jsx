import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import axios from "axios";

import user_icon from "../../Assets/person.png";
import email_icon from "../../Assets/email.png";
import password_icon from "../../Assets/password.png";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {setError(""); }, [name, email, password]);

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      // Kiểm tra xem username, email và mật khẩu có được nhập hay không
      setError("Không được để trống tên, email hoặc mật khẩu");
    }
    if (error === "") {
      axios
        .post("http://localhost:3001/signup", { name, email, password })
        .then((res) => {
          if (res.data.message === "Database error") {
            if (res.data.error.includes("Duplicate entry")) {
              if (res.data.error.includes("email")) {
                // Kiểm tra nếu lỗi là do email đã tồn tại
                setError("Email đã được sử dụng");
              }
              else if (res.data.error.includes("name")) {
                // Kiểm tra nếu lỗi là do tên đã tồn tại
                setError("Tên đã được sử dụng");
              }
            }
            console.log("Server error:", res.data.error);
            return;
          }
          navigate("/Login");
        })
        .catch((err) => console.log("Axios error:", err));
    }
    setError(""); // Reset error message after handling
  };

  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="text">Đăng ký</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Name"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="submit-container">
          <button className="submit" onClick={handleSignup}>
            Sign Up
          </button>
          <Link to="/login" className="submit gray">
            Login
          </Link>
        </div>
        {error ? <div className="error-message">{error}</div> : null}
      </div>
    </div>
  );
};

export default Signup;
