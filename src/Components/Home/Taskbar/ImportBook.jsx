import React, { useEffect, useState } from "react";
import "./HomePage.css"; // Assuming you have a CSS file for styling
import axios from "axios";
const ImportBook = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [position, setPosition] = useState("");

  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/getBooks") 
      .then((res) => {
        setBooks(res.data); //API trả về mảng sách
      })
      .catch((err) => console.log("Lỗi khi lấy dữ liệu:", err));
  }, []);

  useEffect(() => {
    setError("");
  }, [name, quantity, cost, price, category, position]);

  const handleImport = (e) => {
    e.preventDefault();
    if (!name || !quantity || !cost || !price || !category || !position) {
      // Kiểm tra xem tất cả các trường có được nhập hay không
      setError("Không được để trống tất cả các trường");
      return;
    }

    if (error === "") {
      axios
        .post("http://localhost:3001/importbook", {
          name,
          quantity,
          cost,
          price,
          category,
          position,
        })
        .then((res) => {
          if (res.data.message === "Database error") {
            console.log("Database error:", res.data.error);
            return;
          }
          console.log("Import successful:", res.data);
        })
        .catch((err) => console.log("Axios error:", err));
    }
    setError(""); // Reset error message after handling
  };
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
          <button type="submit" onClick={handleImport}>
            Thêm sách
          </button>
        </div>

        <div className="import-right">
          <div className="small-title">Danh sách sách</div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Số lượng</th>
                  <th>Giá nhập</th>
                  <th>Giá bán</th>
                  <th>Vị trí kệ</th>
                  <th>Thể loại</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={index}>
                    <td>{book.name}</td>
                    <td>{book.quantity}</td>
                    <td>{book.cost}</td>
                    <td>{book.price}</td>
                    <td>{book.position}</td>
                    <td>{book.category}</td>
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

export default ImportBook;
