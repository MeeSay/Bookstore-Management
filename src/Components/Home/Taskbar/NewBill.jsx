import React, { useState } from "react";
import "./HomePage.css";
const NewBill = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  return (
    <div className="bill">
      <div className="bill-left">
        <div className="title">Thêm vào hóa đơn</div>
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
                type="text"
                placeholder={"Billing Date"}
                autoComplete="off"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button>Add to bill</button>
      </div>
      <div className="bill-right">
        <div className="title">Client's Bill</div>
        <button>Print</button>
      </div>
    </div>
  );
};

export default NewBill;
