import React, {useState, useEffect} from "react";
import "./HomePage.css"; // Assuming you have a CSS file for styling
import axios from "axios";

const SearchCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3001/getCustomers") // Thay bằng endpoint thực tế
      .then((res) => {
        setCustomers(res.data); // Giả sử API trả về mảng khách hàng
      })
      .catch((err) => console.log("Lỗi khi lấy dữ liệu:", err));
  }, []);

  useEffect(() => {
    setError("");}, [searchCustomer]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    if (!searchCustomer) {
      // Kiểm tra xem tất cả các trường có được nhập hay không
      setError("Hãy nhập tên khách hàng cần tìm");
      return;
    }
    // console.log("Searching for customer:", searchCustomer);
    if(error === "") {
      axios
        .post("http://localhost:3001/searchCustomer", {searchCustomer})
        .then((res) => {
          if (res.data.message === "Database error") {
            console.log("Database error:", res.data.error);
            return;
          }
          setCustomers(res.data.customers); // Giả sử API trả về mảng khách hàng tìm được
        })
        .catch((err) => console.log("Axios error:", err));
    }

    setError(""); // Reset error message
  }

  return (
    <div className="search">
      <div className="title">Search</div>
      <div className="search-input">
        <input type="text" placeholder="Search for a customer..." onChange={(e) => setSearchCustomer(e.target.value)} />
        <button type="submit" onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="search-customer">
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
  );
};

export default SearchCustomer;
