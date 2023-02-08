const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();
const bodyParser = require('body-parser');
const path =require('path')
const multer = require("multer");
const storage = multer.diskStorage({
    destination:"uploads",
    filename: (req,file,cb)=>{
      cb(null,file.originalname);
    }
  });
  const upload = multer({ storage : storage });
const cors = require("cors");
const fs = require('fs');
const colors= require('colors')
const resRoutes=require('./routes/restaurantRoutes')
const connectDB = require("./config/db");
const categoryRoutes=require('./routes/categoryRoutes')
const userRoutes = require('./routes/userRoutes')







const port = process.env.PORT || 5000;
connectDB(mongoose.set('strictQuery', true));

app.use(cors());
app.use(bodyParser.json());
app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);

app.use("/restaurants",resRoutes );
app.use(express.static(__dirname, { // host the whole directory
  extensions: ["html", "htm", "gif", "png"],
}))

app.listen(port, () => console.log(`server running on port ${port}`));









// this code is used to create a restaurant
//this is  a post method use it to test the restaurant post method
//http://localhost:3000/restaurant/post/?restaurant_name=alohaaa&is_disabled=false&user_id=63ca8d1e27263a7f82b6121e
//
// app.post("/restaurants/post", upload.single("resto_logo"),  async (req, res) => {
//   if (!req.body.restaurant_name) {
//     res.send({
//       status: 403,
//       error: true,
//       message: "your missing a restaurant name ",
//     });
//   } else {
//     let logoData;
//     let logoContentType;

//     if (!req.file) {
//       const defaultImage = fs.readFileSync('logo.jpg');
//       logoData = defaultImage;
//       logoContentType = 'image/jpeg';
//     } else {
//       logoData = req.file.buffer;
//       logoContentType = req.file.mimetype;
//     }

//     const restaurantinfo = new restaurantmodel({
//       user_id: req.body.user_id,
//       restaurant_name: req.body.restaurant_name,
//       is_disabled: req.body.is_disabled,
//       resto_logo: {
//         data: logoData,
//         contentType: logoContentType,
//       },
//     });
//     await restaurantinfo.save();
//     res.send("everything is working")
//   }
// });

// // this code is used to post a category into a restaurant using the restaurant id


// app.post("/categories/post", async (req, res) => {


//   if (!req.body.category_name) {
//     res.send({
//       status: 403,
//       error: true,
//       message: "your messing a category name ",
//     });
//   } else {
//     const categoryinfo = new categoriesmodel({
//       resto_id: req.body.resto_id,
//       category_name: req.body.category_name,
//     });
//     await categoryinfo.save();
//     res.send("the category is being added ");
//   }
// });
// this code is used to post items to a specific category inside a specific restaurant
//

//http://localhost:3000/item/post/?cat_id=63cb0d57a3abf8006b920f34&item_name=batata&item_description=enna be hayde el item kteer osas n7at feeha f oozroone eza ma katabton bs fleoone&item_price=25000&item_tags=mahlooottt&item_tags=mandooreee
//check the item_tags how it works on postman because it is different
// app.post("/item/post", async (req, res) => {
 

//   if (!req.body.cat_id || !req.body.item_name || !req.body.item_description || !req.body.item_price || !req.body.item_tags) {
//     res.send({
//       status: 403,
//       error: true,
//       message: "your messing something ",
//     });
//   } else {
//     const item_info = new itemmodel({
//       cat_id: req.body.cat_id,
//       item_name: req.body.item_name,
//       item_description: req.body.item_description,
//       item_price: req.body.item_price,
//       item_tags: req.body.item_tags,
//     });
//     await item_info.save();
//     res.send("the item have been added ");
//   }
// });

// getters to the categories and items inside categoriesssssss
// app.get("/categories", async (req, res) => {
//   const { resto_id } = req.query;
//   if (!resto_id){
//     res.send("put the resto_id ")
//   }
//   const category = await categoriesmodel.find({ resto_id });
//   res.send(category);
// });
// app.get("/categories/get/items", async (req, res) => {
//   const { cat_id } = req.query;
//   const items = await itemmodel.find({ cat_id });
//   res.send(items);
// });

// app.get("/restaurants/allrestaurants", async (req, res) => {
//   const items = await restaurantmodel.find(
//     {},
//     { restaurant_name: 1, is_disabled: 1 }
//   );
//   res.send(items);
// });

// app.get("/restaurants/logos", async (req, res) => {
//   try {
//     const  user_id  = req.body.user_id;
//     const resto = await restaurantmodel.find({ user_id });
//     if (!resto) {
//       return res.status(404).send({ error: "No restaurant found" });
//     }

//     res.contentType(resto[0].resto_logo.contentType);
//     res.send(resto[0].resto_logo.data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.get("/restaurants/restaurant_name", async (req, res) => {
//   const user_id=req.body.user_id;
//   const resto = await restaurantmodel.find({ user_id });
//   console.log(resto[0].restaurant_name);
//   res.send(resto[0].restaurant_name);
// });

// this is the end of the getters

//
// //use this link to test the put of the items
// // http://localhost:3000/category/item/?id=63cb11edf515abaf18bfff02&item_name=jazra&item_description=ana hon
// app.put("/categories/item/put", async (req, res) => {
//   const { id, item_name, item_description, item_price, item_tags } = req.body;
//   const movie = await itemmodel.findById(id);
//   if (item_name) {
//     movie.item_name = item_name;
//   }
//   if (item_description) {
//     movie.item_description = item_description;
//   }
//   if (item_price) {
//     movie.item_price = item_price;
//   }
//   if (item_tags) {
//     movie.item_tags = item_tags;
//   }
//   await movie.save();

//   res.send("the item have been edited ");
// });







// app.put("/restaurants/logo", upload.single("resto_logo"), async (req, res) => {
//   const restaurant = await restaurantmodel.findById(req.body._id);
//   if (!req.file) {
//     return res.status(400).send({ error: "No file was uploaded." });
//   } else {
//     restaurant.resto_logo = {
//       data: req.file.buffer,
//       contentType: req.file.mimetype,
//     }
//     await restaurant.save();
//      res.send("everything is working fawaz");
//   }
// });





// app.put("/restaurants/isdisabled", async (req, res) => {
//   const {_id,is_disabled} = req.body;
//   const movie = await restaurantmodel.findById(_id);
  
//   if (movie) {
//     movie.is_disabled = is_disabled;
//     await movie.save();
//   }
 

//   res.send("the is_disabled have been edited ");
// });




//
//
//
// delete api to the items
// app.delete("/categories/items", async (req, res) => {
//   const _id = req.body;
// if(!_id){
//   res.status(400).send('item does not existor deleted already')
// }
//   const item = await itemmodel.findByIdAndDelete(_id);
//   res.send("donee the item have been deleted ");
// });
//
// delete api to the catgory
//  this api is not tested yet
//BE CAREFULL IF YOU WANT TO USE IT

// // BE CAREFUL IF YOU USE IT

// app.delete("/categories/category/delete", async (req, res) => {
//   const _id = req.body;

//   const item = await categoriesmodel.findByIdAndDelete(_id);
//   res.send("donee the category has been deleted ");
// });

