const express = require("express");
const multer = require("multer");
const router = express.Router();

const { auth } = require("../middleware/auth");
// import file define Item object
const { Item } = require("../models/item");
const { User } = require("../models/user");

//Middleware Xử lí image user gửi lên
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPEG|JPG)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

// GET ALL Items
router.get("/", auth, async (req, res) => {
  let items = await Item.find();
  res.json({ success: true, items: items });
});

// GET ADMIN Items
router.get("/admin", auth, async (req, res) => {
  let userId = req.user._id;
  let email = req.user.email;
  let items = await Item.find({ userId });
  res.status(200).json({ success: true, items, email });
});

/*--------------------Add New Item---------------------*/
let newItem;
// Add Item
router.post("/", auth, async (req, res) => {
  //check duplicate id
  let duplicateItem = await Item.find({ id: req.body.id });
  if (duplicateItem.length !== 0) {
    return res.json({ success: false, message: "Duplicate Id" });
  }

  newItem = new Item(req.body);
  newItem.userId = req.user._id;
  res.status(200).json({ success: true, newItem });
});

//Upload Image
router.post("/uploadNewImage", upload.single("image"), async (req, res) => {
  if (req.file) {
    // Convert image to base64 to store in database
    let data = req.file.buffer;
    let buff = Buffer.from(data, "utf-8");
    let base64Data = buff.toString("base64");
    newItem.image = base64Data;
    await newItem.save();
    // Reset new item
    newItem = new Item();
    res.status(200).json({ success: true });
  }
});

/*-----------------------------------------------*/

/*-------------Delete Item Functional------------*/
router.delete("/", auth, async (req, res) => {
  const itemId = req.body.id;

  Item.findOneAndDelete({ id: itemId }, (err, deleteItem) => {
    if (err) return res.json({ success: false, message: err });
  });
  res.status(200).json({ success: true });
});

/*-----------------------------------------------*/

/*------------------Update Item functional-------------------*/

// Initilize updatedItem
let updatedItem = new Item();
// Save Updated Item
router.put("/", auth, (req, res) => {
  const { id, title, brand, summary, price, number } = req.body;
  const userId = req.user._id;

  // Update Item
  updatedItem.id = id;
  updatedItem.title = title;
  updatedItem.brand = brand;
  updatedItem.summary = summary;
  updatedItem.price = price;
  updatedItem.number = number;
  updatedItem.userId = userId;

  return res.status(200).json({ success: true });
});

// Save Updated Image
router.put("/uploadUpdatedImage", upload.single("image"), async (req, res) => {
  if (req.file) {
    // Convert image to base64 to store in database
    let data = req.file.buffer;
    let buff = Buffer.from(data, "utf-8");
    let base64Data = buff.toString("base64");
    updatedItem.image = base64Data;
  }
  // Delete Id based on Id
  const item = await Item.findOneAndDelete({ id: updatedItem.id });
  if (!updatedItem.image) {
    updatedItem.image = item.image;
  }

  // Save Updated Item
  updatedItem.save((err, updatedItem) => {
    if (err) return res.json({ success: false, message: err });
    res.json({ success: true });
  });
  // Reset Updated item
  updatedItem = new Item();
});

// DETAIL ITEM PAGE
router.get("/detailItem/:id", auth, async (req, res) => {
  // Get itemId from Url params and query
  const itemId = req.params.id;
  Item.findOne({ id: itemId }, (err, item) => {
    if (err) return res.json({ success: false, message: err });

    res.json({ success: true, item: item });
  });

  // Add Seen Item to user
  if (req.user) {
    const userId = req.user._id;
    const user = await User.findById(userId);
    user.seenItem.push(itemId);
    // Delete duplicate seen item
    user.seenItem = user.seenItem.filter(
      (a, b) => user.seenItem.indexOf(a) === b
    );
    await user.save();
  }
});

// SeenItemPage IF YOU ARE AUTHENTICATED
router.get("/seenItem", auth, async (req, res) => {
  let items = [];
  let seenItems = [];

  if (req.user) {
    let userId = req.user._id;
    const user = await User.findById(userId);
    seenItems = user.seenItem;
  }

  items = await Item.find({
    id: {
      $in: seenItems,
    },
  });
  res.status(200).json({ success: true, items });
});

// SeenItemPage IF YOU ARE NOT AUTHENTICATED
// If You are not user, seenItem got from req.params (get from session storage)
router.get("/seenItemFromSession/:seenItems", auth, async (req, res) => {
  // Get seenItems from params url
  let seenItems = JSON.parse(req.params.seenItems.split("=")[1]);
  let seenItemsArray = [];
  let keys = Object.keys(seenItems);
  for (let i = 0; i < keys.length; i++) {
    seenItemsArray.push(seenItems[keys[i]]);
  }
  let items = await Item.find({
    id: {
      $in: seenItemsArray,
    },
  });
  // return res.render("seenItemPage", { items, check });
  res.status(200).json({ success: true, items });
});
/*----------------------------------------------------*/

module.exports = router;
