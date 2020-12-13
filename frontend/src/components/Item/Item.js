import React from "react";
import { Link } from "react-router-dom";

const Item = ({
  id,
  image,
  title,
  price,
  brand,
  summary,
  number,
  isAdmin,
  deleteItem,
}) => {
  return (
    <div className="table-row">
      <div className="itemId">{id}</div>
      <div className="name">
        <img src={`data:image/*;base64, ${image}`} alt="item" />

        <div>
          <div style={{ fontWeight: 600, color: "red" }}>{title}</div>
          <div>{summary}</div>
        </div>
      </div>
      <div className="cost" style={{ fontWeight: 600 }}>
        {price} VND
      </div>
      <div className="status">
        {number > 0 ? (
          <span style={{ fontWeight: 600 }}>Còn hàng</span>
        ) : (
          <span style={{ color: "red" }}>Hết hàng</span>
        )}
        <br />
        {number}
      </div>
      {isAdmin ? (
        <>
          <div className="operate">
            <button className="edit" id="editButton">
              <Link
                to={{
                  pathname: "/updateItemPage",
                  state: {
                    id: id,
                    image: image,
                    title: title,
                    price: price,
                    brand: brand,
                    number: number,
                    summary: summary,
                  },
                }}
              >
                Edit
              </Link>
            </button>
            <button className="details" id="detailButton">
              <Link to={`/detailItemPage/${id}`}>Details</Link>
            </button>
            <button
              className="delete"
              id="deleteButton"
              onClick={() => deleteItem(id)}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="brand">{brand}</div>
          <div className="add">
            <Link
              to={`/detailItemPage/${id}`}
              className="details"
              id="detailButton"
            >
              Details
            </Link>
            <a href="/" style={{ color: "blue" }}>
              Thêm vào giỏ hàng
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
