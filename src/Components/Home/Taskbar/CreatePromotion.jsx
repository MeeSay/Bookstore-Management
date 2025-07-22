import React, { useEffect, useState } from "react";
import "./HomePage.css"; // Assuming you have a CSS file for styling
import axios from "axios";

const CreatePromotion = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [promotions, setPromotions] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getPromotions")
      .then((res) => {
        setPromotions(res.data);
      })
      .catch((err) => console.log("Lỗi khi lấy dữ liệu:", err));
  }, [success]);

  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [name, detail, startDate, endDate]);

  const handleCreatePromotion = (e) => {
    e.preventDefault();
    if (!name || !detail || !startDate || !endDate) {
      setError("Hãy điền đầy đủ thông tin");
      return;
    }
    if (startDate >= endDate) {
      setError("Thời gian kết thúc phải sau thời gian bắt đầu");
      return;
    }
    axios
      .post("http://localhost:3001/createPromotion", {
        name,
        detail,
        startDate,
        endDate,
      })
      .then((res) => {
        if (res.data.message === "Database error") {
          console.log("Database error:", res.data.error);
          return;
        }
        setSuccess(true);
        alert("Khuyến mãi đã được tạo thành công");
        setError("");
      })
      .catch((err) => console.log("Axios error:", err));
  };
  return (
    <div>
      <div className="title">Quản lý khuyến mãi</div>
      <div className="import">
        <div className="import-left">
          <div className="text">Tên chương trình</div>
          <input
            type="text"
            placeholder={"Tên chương trình"}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />

          <div className="text">Mô tả</div>
          <input
            type="text"
            placeholder={"Mô tả chương trình"}
            autoComplete="off"
            onChange={(e) => setDetail(e.target.value)}
          />

          <div className="text">Thời gian bắt đầu</div>
          <input
            type="date"
            placeholder={"Bắt đầu từ"}
            autoComplete="off"
            onChange={(e) => setStartDate(e.target.value)}
          />

          <div className="text">Thời gian kết thúc</div>
          <input
            type="date"
            placeholder={"Kết thúc vào"}
            autoComplete="off"
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button type="submit" onClick={handleCreatePromotion}>
            Thêm khuyến mãi
          </button>
          {error && <div className="error-message">{error}</div>}
        </div>

        {/* Khuyến mãi có thêm trạng thái */}
        <div className="import-right">
          <div className="small-title">Danh sách khuyến mãi</div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Tên chương trình</th>
                  <th>Mô tả</th>
                  <th>Bắt đầu</th>
                  <th>Kết thúc</th>
                </tr>
              </thead>
              <tbody>
                {promotions.map((promotion, index) => (
                  <tr key={index}>
                    <td>{promotion.name}</td>
                    <td>{promotion.detail}</td>
                    <td>{promotion.startDate}</td>
                    <td>{promotion.endDate}</td>
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

export default CreatePromotion;
