const express = require("express");
const app = express();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const cors = require("cors");
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://fawazsho:password2001@fawz.rqoa1wg.mongodb.net/restaurants",
//   {
//     useNewUrlParser: true,
//   }
// );

mongoose.connect(
  "mongodb+srv://fawazsho:password2001@cluster0.decz2qu.mongodb.net/restaurants",
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
 
  console.log("reqqqqqqqdksad;as;dsaldjaslkdjaslkdjsalkdjsalkdjlqqqqqqqqqqq",req.body)
  if (!req.body.username || !req.body.password || !req.body.role) {
    res.send({
      status: 403,
      error: true,
      message: "your missing a username or a password or a role ",
    });
  } else {
    
    const user_information = new usersmodel({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    });
    await user_information.save();
    res.send("its done rasha ")
  }
});

// this code is used to create a restaurant
//this is  a post method use it to test the restaurant post method
//http://localhost:3000/restaurant/post/?restaurant_name=alohaaa&is_disabled=false&user_id=63ca8d1e27263a7f82b6121e
//
app.post("/restaurant/post", upload.single("resto_logo"), async (req, res) => {
 

  if (!req.body.restaurant_name) {
    res.send({
      status: 403,
      error: true,
      message: "your messing a restaurant name ",
    });
  } else {
    if (!req.file) {
      return res.status(400).send({ error: "No file was uploaded." });
    }
    const restaurantinfo = new restaurantmodel({
      user_id: req.body.user_id,
      restaurant_name: req.body.restaurant_name,
      is_disabled: req.body.is_disabled,
      resto_logo: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    await restaurantinfo.save();
    res.send("everything is working")
  }
});
// this code is used to post a category into a restaurant using the restaurant id


app.post("/categories/post", async (req, res) => {


  if (!req.body.category_name) {
    res.send({
      status: 403,
      error: true,
      message: "your messing a category name ",
    });
  } else {
    const categoryinfo = new categoriesmodel({
      resto_id: req.body.resto_id,
      category_name: req.body.category_name,
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
 

  if (!req.body.cat_id || !req.body.item_name || !req.body.item_description || !req.body.item_price || !req.body.item_tags) {
    res.send({
      status: 403,
      error: true,
      message: "your messing something ",
    });
  } else {
    const item_info = new itemmodel({
      cat_id: req.body.cat_id,
      item_name: req.body.item_name,
      item_description: req.body.item_description,
      item_price: req.body.item_price,
      item_tags: req.body.item_tags,
    });
    await item_info.save();
    res.send("the item have been added ");
  }
});

// getters to the categories and items inside categoriesssssss
app.get("/categories", async (req, res) => {
  const { resto_id } = req.body;
  const category = await categoriesmodel.find({ resto_id });
  res.json(category);
});
app.get("/categories/items", async (req, res) => {
  const { cat_id } = req.body;
  const items = await itemmodel.find({ cat_id });
  res.json(items);
});

app.get("/allrestaurants", async (req, res) => {
  const items = await restaurantmodel.find(
    {},
    { restaurant_name: 1, is_disabled: 1 }
  );
  res.send(items);
});

app.get("/restaurants", async (req, res) => {
  try {
    const  user_id  = req.body.user_id;
    const resto = await restaurantmodel.find({ user_id });
    if (!resto) {
      return res.status(404).send({ error: "No restaurant found" });
    }

    res.contentType(resto[0].resto_logo.contentType);
    res.send(resto[0].resto_logo.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/restaurants/restaurant_name", async (req, res) => {
  const user_id=req.body.user_id;
  const resto = await restaurantmodel.find({ user_id });
  console.log(resto[0].restaurant_name);
  res.send(resto[0].restaurant_name);
});

// this is the end of the getters

//
//use this link to test the put of the items
// http://localhost:3000/category/item/?id=63cb11edf515abaf18bfff02&item_name=jazra&item_description=ana hon
app.put("/category/item", async (req, res) => {
  const { id, item_name, item_description, item_price, item_tags } = req.body;
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






app.put("/restaurant/isdisabled", async (req, res) => {
  const {_id,is_disabled} = req.body;
  const movie = await restaurantmodel.findById(_id);
  
  if (movie) {
    movie.is_disabled = is_disabled;
    await movie.save();
  }
 

  res.send("the is_disabled have been edited ");
});




//
//
//
// delete api to the items
app.delete("/categories/items", async (req, res) => {
  const _id = req.body;

  const item = await itemmodel.findByIdAndDelete(_id);
  res.send("donee the item have been deleted ");
});
//
// delete api to the catgory
//  this api is not tested yet
//BE CAREFULL IF YOU WANT TO USE IT

// BE CAREFUL IF YOU USE IT

app.delete("/category", async (req, res) => {
  const _id = req.body;

  const item = await categoriesmodel.findByIdAndDelete(_id);
  res.send("donee the item have been deleted ");
});

app.listen(3000, () => {
  console.log("example app listen on port 3000");
  // console.log(movies.length)
});
