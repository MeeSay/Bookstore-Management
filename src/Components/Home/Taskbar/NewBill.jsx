import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./HomePage.css";

const NewBill = () => {
  // format của 1 sản phẩm được mua
  const [formData, setFormData] = useState({
    name: "",
    bookid: "",
    price: "",
    quantity: "",
    date: "",
  });

  // const [newBill, setNewBill] = useState({
  //   id: "",
  //   date: "",
  //   total: "",
  // });

  const [bills, setBills] = useState([]); // hóa đơn
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  // Đặt ngày mặc định
  const setToday = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    setFormData((prev) => ({ ...prev, date: `${yyyy}-${mm}-${dd}` }));
  };

  // Xóa lỗi khi thay đổi input
  useEffect(() => {
    setError("");
  }, [formData.name, formData.quantity, formData.date]);

  // Lấy danh sách sách từ API
  useEffect(() => {
    axios
      .get("http://localhost:3001/getBooks")
      .then((response) => {
        // console.log("Books data:", response.data);
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  // Xử lý khi chọn sách
  const handleBookChange = (e) => {
    const selectedName = e.target.value;
    const selectedBook = books.find((book) => book.name === selectedName);

    if (selectedBook) {
      setFormData({
        name: selectedName,
        bookid: selectedBook.ID || "",
        price: selectedBook.price || "",
        quantity: formData.quantity || "1", // Mặc định số lượng là 1
        date: formData.date || format(new Date(), "yyyy-MM-dd"), // Mặc định ngày hiện tại
      });
    } else {
      setFormData({
        name: "",
        price: "",
        quantity: "",
        date: "",
      });
    }
  };

  // Xử lý thêm vào hóa đơn
  const handleAddToBill = () => {
    if (
      !formData.name ||
      !formData.price ||
      !formData.quantity ||
      !formData.date
    ) {
      setError("Vui lòng điền đầy đủ các trường");
      return;
    }

    setBills([...bills, formData]);
    setError("");
    setFormData({
      name: "",
      price: "",
      quantity: "",
      date: "",
    });
  };

  const handleSaveBill = async (e) => {
    e.preventDefault();
    const total = bills.reduce((sum, bill) => {
      const price = parseFloat(bill.price) || 0;
      const quantity = parseInt(bill.quantity) || 0;
      return sum + price * quantity;
    }, 0);

    try {
      const response = await axios.get("http://localhost:3001/getBills");
      const tmpBills = {
        id: response.data.data[0].total + 1,
        total: total,
        date: format(new Date(), "yyyy-MM-dd"),
      };

      // setNewBill({
      //   id: response.data.data[0].total + 1,
      //   total: total,
      //   date: format(new Date(), "yyyy-MM-dd"),
      // });
      // console.log(bills, tmpBills);
      const saveResponse = await axios.post("http://localhost:3001/saveBill", {
        newBill: tmpBills,
        bills,
      });

      alert("Lưu thành công!");
      setBills([]);
      setError("");
    } catch (error) {
      console.error("Error saving bill:", error.message);
      setError("Lỗi khi lưu hóa đơn: " + error.message);
    }
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
                <select value={formData.name} onChange={handleBookChange}>
                  <option value="">-- Chọn sách --</option>
                  {books.map((book, index) => (
                    <option key={index} value={book.name}>
                      {book.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="bill-text">Đơn giá</div>
                <input
                  type="number"
                  value={formData.price}
                  readOnly
                  placeholder="Book price"
                />
              </div>
            </div>
            <div className="bill-left-input">
              <div>
                <div className="bill-text">Số lượng</div>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  placeholder="Quantity"
                  autoComplete="off"
                />
              </div>
              <div>
                <div className="bill-text">Ngày mua</div>
                <input
                  type="date"
                  value={formData.date}
                  onFocus={setToday}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  placeholder="Billing Date"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="button-error">
            {error && <div className="error-message">{error}</div>}
            <button type="button" onClick={handleAddToBill}>
              Thêm vào hóa đơn
            </button>
          </div>
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
                  <th>Ngày mua</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill, index) => (
                  <tr key={index}>
                    <td>{bill.name}</td>
                    <td>{bill.price}</td>
                    <td>{bill.quantity}</td>
                    <td>
                      {bill.date
                        ? format(new Date(bill.date), "dd/MM/yyyy")
                        : "Không có dữ liệu"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" onClick={handleSaveBill}>
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewBill;
