import React, {useState} from "react";
import "./HomePage.css"; // Assuming you have a CSS file for styling

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

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

          <button>Thêm khách hàng</button>
        </div>

        <div className="import-right">
          Table customer
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
