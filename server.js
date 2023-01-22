const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://fawazsho:password2001@fawz.rqoa1wg.mongodb.net/restaurants",
  {
    useNewUrlParser: true,
  }
);
const usersmodel = require("./models/Users");

const restaurantmodel = require("./models/Restaurant");
const categoriesmodel = require("./models/categories");
const itemmodel = require("./models/Item");

// this code is used to create a new user
app.post("/users/post", async (req, res) => {
  const { username, password, role } = req.query;

  if (!username || !password || !role) {
    res.send({
      status: 403,
      error: true,
      message: "your messing a username or a password or a role ",
    });
  } else {
    const user_information = new usersmodel({
      username: username,
      password: password,
      role: role,
    });
    await user_information.save();
  }
});

// this code is used to create a restaurant

//this is  a post method use it to test the restaurant post method
//http://localhost:3000/restaurant/post/?restaurant_name=alohaaa&is_disabled=false&user_id=63ca8d1e27263a7f82b6121e
//
app.post("/restaurant/post", async (req, res) => {
  const { restaurant_name, is_disabled, user_id } = req.query;

  if (!restaurant_name) {
    res.send({
      status: 403,
      error: true,
      message: "your messing a restaurant name ",
    });
  } else {
    const restaurantinfo = new restaurantmodel({
      user_id: user_id,
      restaurant_name: restaurant_name,
      is_disabled: is_disabled,
    });
    await restaurantinfo.save();
  }
});
// this code is used to post a category into a restaurant using the restaurant id

app.post("/categories/post", async (req, res) => {
  const { category_name, resto_id } = req.query;

  if (!category_name) {
    res.send({
      status: 403,
      error: true,
      message: "your messing a restaurant name ",
    });
  } else {
    const categoryinfo = new categoriesmodel({
      resto_id: resto_id,
      category_name: category_name,
    });
    await categoryinfo.save();
    res.send("the category is being added ");
  }
});
// this code is used to post items to a specific category inside a specific restaurant
//

//http://localhost:3000/item/post/?cat_id=63cb0d57a3abf8006b920f34&item_name=batata&item_description=enna be hayde el item kteer osas n7at feeha f oozroone eza ma katabton bs fleoone&item_price=25000&item_tags=mahlooottt&item_tags=mandooreee
//check the item_tags how it works on postman because it is different
app.post("/item/post", async (req, res) => {
  const { cat_id, item_name, item_description, item_price, item_tags } =
    req.query;

  if (!cat_id || !item_name || !item_description || !item_price || !item_tags) {
    res.send({
      status: 403,
      error: true,
      message: "your messing something ",
    });
  } else {
    const item_info = new itemmodel({
      cat_id: cat_id,
      item_name: item_name,
      item_description: item_description,
      item_price: item_price,
      item_tags: item_tags,
    });
    await item_info.save();
    res.send("the item have been added ");
  }
});

// getters to the categories and items inside categoriesssssss
app.get("/categories", async (req, res) => {
  const { resto_id } = req.query;
  const category = await categoriesmodel.find({ resto_id });
  res.json(category);
});
app.get("/categories/items", async (req, res) => {
  const { cat_id } = req.query;
  const items = await itemmodel.find({ cat_id });
  res.json(items);
});

// this is the end of the getters

//
//use this link to test the put of the items
// http://localhost:3000/category/item/?id=63cb11edf515abaf18bfff02&item_name=jazra&item_description=ana hon
app.put("/category/item", async (req, res) => {
  const { id, item_name, item_description, item_price, item_tags } = req.query;
  const movie = await itemmodel.findById(id);
  if (item_name) {
    movie.item_name = item_name;
  }
  if (item_description) {
    movie.item_description = item_description;
  }
  if (item_price) {
    movie.item_price = item_price;
  }
  if (item_tags) {
    movie.item_tags = item_tags;
  }
  await movie.save();

  res.send("the item have been edited ");
});
//
//
//
// delete api to the items
app.delete("/categories/items", async (req, res) => {
  const _id = req.query;

  const item = await itemmodel.findByIdAndDelete(_id);
  res.send("donee the item have been deleted ");
});
//
// delete api to the catgory
//  this api is not tested yet
//BE CAREFULL IF YOU WANT TO USE IT

// BE CAREFUL IF YOU USE IT

app.delete("/category", async (req, res) => {
  const _id = req.query;

  const item = await categoriesmodel.findByIdAndDelete(_id);
  res.send("donee the item have been deleted ");
});

app.listen(3000, () => {
  console.log("example app listen on port 3000");
  // console.log(movies.length)
});
