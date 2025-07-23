import React, { useEffect, useState } from "react";
import axios from "axios";

import "./HomePage.css";
const NewBill = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [bills, setBills] = useState([]);

  const [error, setError] = useState("");

  const setToday = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
    setDate(`${yyyy}-${mm}-${dd}`);
  };

  const handleAddToBill = (e) => {
    if (!name || !price || !quantity || !date) {
      setError("Please fill in all fields");
      return;
    }

    const billData = {
      name,
      price,
      quantity,
      date,
    };

    setBills([...bills, billData]);
    setError(""); // Reset error message
    //reset input fields
    setName("");
    setPrice("");
    setQuantity("");
    setDate("");
  };

  return (
    <div>
      <div className="title">Tạo hóa đơn</div>
      <div className="bill">
        <div className="bill-left">
          <div className="small-title">Thêm vào hóa đơn</div>
          <div className="bill-left-body">
            <div className="bill-left-input">
              <div>
                <div className="bill-text">Tên sách</div>
                <input
                  type="text"
                  placeholder={"Book's name"}
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <div className="bill-text">Đơn giá</div>
                <input
                  type="text"
                  placeholder={"Book price"}
                  autoComplete="off"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="bill-left-input">
              <div>
                <div className="bill-text">Số lượng</div>
                <input
                  type="text"
                  placeholder={"Quantity"}
                  autoComplete="off"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div>
                <div className="bill-text">Ngày mua</div>
                <input
                  type="date"
                  onFocus={() => setToday()}
                  placeholder={`Billing Date ${date}`}
                  autoComplete="off"
                  value={date}
                />
              </div>
            </div>
          </div>
          <button type="submit" onClick={handleAddToBill}>
            Add to bill
          </button>
        </div>
        <div className="bill-right">
          <div className="small-title">Client's Bill</div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Tên sách</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Ngày nhập</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill, index) => (
                  <tr key={index}>
                    <td>{bill.name}</td>
                    <td>{bill.price}</td>
                    <td>{bill.quantity}</td>
                    <td>{bill.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button>Print</button>
        </div>
      </div>
    </div>
  );
};

export default NewBill;
