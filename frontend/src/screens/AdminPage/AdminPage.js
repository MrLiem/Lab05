import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./AdminPage.css";
import axios from "axios";
import Item from "../../components/Item/Item";

const AdminPage = () => {
  const [adminItems, setAdminItems] = useState([]);
  const [adminEmail, setAdminEmail] = useState("");

  const getAdminItems = async () => {
    const response = await axios.get("/items/admin", {
      withCredentials: true,
    });
    if (response.data.success) {
      let items = response.data.items;
      let email = response.data.email;
      setAdminItems(items);
      setAdminEmail(email);
    } else {
      alert(response.data.message);
    }
  };

  const deleteItem = async (id) => {
    // Delete Item
    const response = await axios.delete(
      "/items",
      { data: { id } },
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      alert("Delete Item Ok");
      let newAdminItems = adminItems.filter((item) => item.id !== id);
      setAdminItems(newAdminItems);
    } else {
      alert(response.data.message);
    }
  };
  useEffect(() => {
    getAdminItems();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <main id="table">
        <h2>Admin: {adminEmail} </h2>
        <h2>Danh sách sản phẩm</h2>
        <button>
          <Link to="/addItemPage">Create New</Link>
        </button>
        <div className="table-body">
          <div className="table-title">
            <div className="itemId">Id</div>
            <div className="name">Tên sản phẩm</div>
            <div className="cost">Giá</div>
            <div className="status">Tình trạng</div>
            <div className="operate"></div>
          </div>
          {adminItems.map(
            ({
              id,
              brand,
              image,
              price,
              number,
              summary,
              title,
              isAdmin = true,
            }) => {
              return (
                <Item
                  key={id}
                  id={id}
                  brand={brand}
                  image={image}
                  price={price}
                  number={number}
                  summary={summary}
                  title={title}
                  isAdmin={isAdmin}
                  deleteItem={deleteItem}
                />
              );
            }
          )}
        </div>
      </main>
    </React.Fragment>
  );
};

export default AdminPage;
