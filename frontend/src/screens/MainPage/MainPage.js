import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Item from "../../components/Item/Item";
import "./MainPage.css";
import axios from "axios";

const MainPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const response = await axios.get("/items");
    if (response.data.success) {
      let items = response.data.items;
      setItems(items);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main id="table">
        <h2>All Products</h2>
        <h2>Reading Data from Database</h2>
        <div className="table-body">
          <div className="table-title">
            <div className="itemId">Id</div>
            <div className="name">Tên sản phẩm</div>
            <div className="cost">Giá</div>
            <div className="status">Tình trạng</div>
            <div className="brand">Thương hiệu</div>
            <div className="add"></div>
          </div>
          {items.map(({ id, brand, image, price, number, summary, title }) => {
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
              />
            );
          })}
        </div>
      </main>
    </React.Fragment>
  );
};

export default MainPage;
