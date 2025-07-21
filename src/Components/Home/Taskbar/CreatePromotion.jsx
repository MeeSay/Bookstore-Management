import React, {useState} from "react";

const CreatePromotion = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
            type="text"
            placeholder={"Bắt đầu từ"}
            autoComplete="off"
            onChange={(e) => setStartDate(e.target.value)}
          />

          <div className="text">Thời gian kết thúc</div>
          <input
            type="text"
            placeholder={"Kết thúc vào"}
            autoComplete="off"
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button>Thêm khuyến mãi</button>
        </div>

        {/* Khuyến mãi có thêm trạng thái */}
        <div className="import-right">Table promotion</div>
      </div>
    </div>
  );
};

export default CreatePromotion;
