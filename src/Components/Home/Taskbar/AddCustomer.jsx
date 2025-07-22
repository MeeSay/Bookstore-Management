import React, { useEffect, useState } from "react";
import "./HomePage.css"; // Assuming you have a CSS file for styling
import axios from "axios";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("false");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getCustomers") // Thay bằng endpoint thực tế
      .then((res) => {
        setCustomers(res.data); // Giả sử API trả về mảng khách hàng
      })
      .catch((err) => console.log("Lỗi khi lấy dữ liệu:", err));
  }, []);

  useEffect(() => {
    setError("");
  }, [name, phone, address]);

  useEffect(() => {
    setSuccess("false");
  }, [name, phone, address]);

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      // Kiểm tra xem tất cả các trường có được nhập hay không
      setError("Không được để trống tất cả các trường");
      return;
    }

    if (error === "") {
      axios
        .post("http://localhost:3001/addCustomer", {
          name,
          phone,
          address,
        })
        .then((res) => {
          if (res.data.message === "Database error") {
            console.log("Database error:", res.data.error);
            if (res.data.error.includes("Duplicate entry")) {
              setError("Số điện thoại đã tồn tại");
            }
            return;
          }
          setSuccess("true");
          axios.get("http://localhost:3001/getCustomers").then((res) => {
            setCustomers(res.data);
          });
        })
        .catch((err) => console.log("Axios error:", err));
    }
    setError(""); // Reset error message after handling
  };
  return (
    <div>
      <div className="title">Quản lý khách hàng</div>
      <div className="import">
        <div className="import-left">
          <div className="text">Tên khách hàng</div>
          <input
            type="text"
            placeholder={"Tên khách hàng"}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />

          <div className="text">Số điện thoại</div>
          <input
            type="text"
            placeholder={"Số điện thoại"}
            autoComplete="off"
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="text">Địa chỉ</div>
          <input
            type="text"
            placeholder={"Địa chỉ"}
            autoComplete="off"
            onChange={(e) => setAddress(e.target.value)}
          />

          <button type="submit" onClick={handleAddCustomer}>
            Thêm khách hàng
          </button>
          {error && <div className="error-message">{error}</div>}
          {success === "true" && (
            <div className="success-message">Thêm khách hàng thành công</div>
          )}
        </div>

        <div className="import-right">
          <div className="small-title">Danh sách khách hàng</div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
