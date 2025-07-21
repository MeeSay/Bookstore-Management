import React, {useState} from "react";
import "./HomePage.css"; // Assuming you have a CSS file for styling

const ImportBook = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [position, setPosition] = useState("");

  return (
    <div>
      <div className="title">Quản lý sách</div>
      <div className="import">
        <div className="import-left">
          <div className="text">Tên sách</div>
          <input
            type="text"
            placeholder={"Tên sách"}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />

          <div className="text">Số lượng</div>
          <input
            type="text"
            placeholder={"Số lượng nhập"}
            autoComplete="off"
            onChange={(e) => setQuantity(e.target.value)}
          />

          <div className="text">Giá nhập</div>
          <input
            type="text"
            placeholder={"Giá nhập vào"}
            autoComplete="off"
            onChange={(e) => setCost(e.target.value)}
          />

          <div className="text">Giá bán</div>
          <input
            type="text"
            placeholder={"Giá bán ra"}
            autoComplete="off"
            onChange={(e) => setPrice(e.target.value)}
          />

          <div className="text">Thể loại</div>
          <input
            type="text"
            placeholder={"Thể loại"}
            autoComplete="off"
            onChange={(e) => setCategory(e.target.value)}
          />

          <div className="text">Vị trí</div>
          <input
            type="text"
            placeholder={"Vị trí kệ sách"}
            autoComplete="off"
            onChange={(e) => setPosition(e.target.value)}
          />

          <button>Thêm sách</button>
        </div>

        <div className="import-right">
          Table books
        </div>
      </div>
    </div>
  );
};

export default ImportBook;
