import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import "./SeenItemsPage.css";
import axios from "axios";
import Item from "../../components/Item/Item";

const SeenItemPage = () => {
  const [seenItems, setSeenItems] = useState([]);
  const [getFrom, setGetFrom] = useState("");

  useEffect(() => {
    // Get Seen Items from session storage , if Seen items === undefined, query seen Items from user
    let sessSeenItems = sessionStorage.getItem("seenItems");
    let encodeSeenItems = encodeURIComponent(sessSeenItems);

    if (sessSeenItems) {
      getSeenItemsFromSess(encodeSeenItems);
      setGetFrom("Session Storage");
    } else {
      getSeenItemsFromUser();
      setGetFrom("User Database");
    }
  }, []);

  const getSeenItemsFromUser = async () => {
    const response = await axios.get("http://localhost:5000/items/seenItem", {
      withCredentials: true,
    });
    if (response.data.success) {
      let items = response.data.items;
      setSeenItems(items);
    } else {
      alert(response.data.message);
    }
  };

  const getSeenItemsFromSess = async (encodeSeenItems) => {
    const response = await axios.get(
      `http://localhost:5000/items/seenItemFromSession/seenItems=${encodeSeenItems}`,
      {
        withCredentials: true,
      }
    );
    if (response.data.success) {
      let items = response.data.items;
      setSeenItems(items);
    } else {
      alert(response.data.message);
    }
  };
  return (
    <React.Fragment>
      <Header />
      <main id="table">
        <h2>Your Seen Items From : {getFrom} </h2>
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
          {seenItems.map(
            ({ id, brand, image, price, number, summary, title }) => {
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
            }
          )}
        </div>
      </main>
    </React.Fragment>
  );
};

export default SeenItemPage;
