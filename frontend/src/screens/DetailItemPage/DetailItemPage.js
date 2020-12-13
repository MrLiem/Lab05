import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./DetailItemPage.css";
import axios from "axios";

const DetailItemPage = () => {
  const [item, setItem] = useState();
  const id = useParams();

  const getDetailItem = async () => {
    const response = await axios.get(
      `http://localhost:5000/items/detailItem/${id.id}`,
      {
        withCredentials: true,
      }
    );
    if (response.data.success) {
      // Save to sessionStorage seen itemId if someone not authenticated gets detailItemPage
      let itemId = id.id;
      let oldSeenItems = JSON.parse(sessionStorage.getItem("seenItems"));
      let newSeenItems = [];

      if (!oldSeenItems) {
        newSeenItems = [itemId];
      } else if (oldSeenItems.includes(itemId)) {
        newSeenItems = oldSeenItems;
      } else {
        newSeenItems = [...oldSeenItems, itemId];
      }

      sessionStorage.setItem("seenItems", JSON.stringify(newSeenItems));
      setItem(response.data.item);
    } else {
      alert(response.data.message);
    }
  };

  useEffect(() => {
    getDetailItem();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <main>
        <h2>Detail Item </h2>
        <h5>Product Id: {item ? item.id : ""}</h5>
        <hr />
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={item ? item.title : ""}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              className="form-control"
              id="brand"
              value={item ? item.brand : ""}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <input
              type="text"
              className="form-control"
              id="summary"
              value={item ? item.summary : ""}
              readOnly
            />
          </div>
          <div
            className="form-group"
            style={{ marginLeft: "-5px", justifyContent: "flex-start" }}
          >
            <div style={{ paddingLeft: "165px", marginRight: "25px" }}>
              Image
            </div>
            <img
              src={`data:image/*;base64,${item ? item.image : ""}`}
              alt="item"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={item ? item.price : ""}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="number">Number</label>
            <input
              type="number"
              className="form-control"
              id="number"
              value={item ? item.number : ""}
              readOnly
            />
          </div>
        </form>
      </main>
    </React.Fragment>
  );
};

export default DetailItemPage;
