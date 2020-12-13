import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./AddItemPage.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddItemPage = () => {
  const history = useHistory();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [summary, setSummary] = useState("");
  const [price, setPrice] = useState(0);
  const [number, setNumber] = useState(0);
  const [image, setImage] = useState();

  const onChangeInput = async (event) => {
    const value = event.target.value;

    switch (event.target.id) {
      case "id":
        setId(value);
        break;
      case "title":
        setTitle(value);
        break;
      case "brand":
        setBrand(value);
        break;
      case "summary":
        setSummary(value);
        break;
      case "images":
        setImage(event.target.files[0]);
        break;
      case "price":
        setPrice(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const onSubmitHandle = async (event) => {
    event.preventDefault();
    if (!id || !title || !summary || !price || !number || !brand) {
      return alert("Please type all the field!!!");
    }
    if (price < 0 || price > 10000000) {
      return alert("Please type price between 0  and 10000000!!!");
    }
    const newItem = {
      id,
      title,
      summary,
      price,
      number,
      brand,
    };
    // Add new Item
    const response = await axios.post("http://localhost:5000/items/", newItem, {
      withCredentials: true,
    });
    if (response.data.success) {
      // Send image after successfully send json data
      let formData = new FormData();
      if (image === "") {
        return alert("Please add an image!!!");
      }
      formData.append("image", image);
      const response2 = await axios.post(
        "http://localhost:5000/items/uploadNewImage",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response2.data.success) {
        alert("upload image Ok");
        history.push("/adminPage");
      } else {
        alert(response2.data.message);
      }
    } else {
      alert(response.data.message);
    }
  };
  return (
    <React.Fragment>
      <Header />
      <main>
        <h2>Thêm sản phẩm</h2>
        <h5>Product</h5>
        <hr />
        <form onSubmit={onSubmitHandle}>
          <div className="form-group">
            <label htmlFor="id">Id</label>
            <input
              type="text"
              maxLength="4"
              className="form-control"
              id="id"
              aria-describedby="emailHelp"
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              maxLength="4"
              className="form-control"
              id="brand"
              name="brand"
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <input
              type="text"
              className="form-control"
              id="summary"
              name="summary"
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group" style={{ marginLeft: "-5px" }}>
            <label htmlFor="images">Image</label>
            <input
              type="file"
              name="image"
              id="images"
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              id="price"
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="number">Number</label>
            <input
              type="number"
              className="form-control"
              name="number"
              id="number"
              onChange={onChangeInput}
            />
          </div>
          <div className="form-button">
            <button type="submit" id="addItem" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
};

export default AddItemPage;
