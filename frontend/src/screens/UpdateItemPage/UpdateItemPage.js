import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import "./UpdateItemPage.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
const UpdateItemPage = (props) => {
  const history = useHistory();
  // Get update item value from location.state
  const updateTitle = props.location.state.title;
  const updateBrand = props.location.state.brand;
  const updateSummary = props.location.state.summary;
  const updatePrice = props.location.state.price;
  const updateNumber = props.location.state.number;
  const id = props.location.state.id;

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [summary, setSummary] = useState("");
  const [price, setPrice] = useState(0);
  const [number, setNumber] = useState(0);
  const [image, setImage] = useState();

  useEffect(() => {
    setTitle(updateTitle);
    setBrand(updateBrand);
    setSummary(updateSummary);
    setPrice(updatePrice);
    setNumber(updateNumber);
  }, []);

  const onChangeInput = async (event) => {
    const value = event.target.value;

    switch (event.target.id) {
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
        // image = event.target.files[0];
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
    if (!title || !summary || !price || !number || !brand) {
      return alert("Please type all the field!!!");
    }
    const updatedItem = {
      id,
      title,
      summary,
      price,
      number,
      brand,
    };
    // Request update item
    const response = await axios.put("/items", updatedItem, {
      withCredentials: true,
    });
    if (response.data.success) {
      // Send image after successfully send json data
      let formData = new FormData();
      formData.append("image", image);
      // Request update image
      const response2 = await axios.put("/items/uploadUpdatedImage", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
        <h2>Cập nhật Sản phẩm</h2>
        <h5>Product Id: {id}</h5>
        <hr />
        <form onSubmit={onSubmitHandle}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              className="form-control"
              id="brand"
              value={brand}
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <input
              type="text"
              className="form-control"
              id="summary"
              value={summary}
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
              id="price"
              value={price}
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="number">Number</label>
            <input
              type="number"
              className="form-control"
              id="number"
              value={number}
              onChange={onChangeInput}
            />
          </div>
          <div className="form-button">
            <button
              type="submit"
              className="btn btn-primary"
              id="saveItemButton"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
};

export default UpdateItemPage;
