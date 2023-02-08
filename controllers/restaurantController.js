const asyncHandler = require("express-async-handler");
const restaurantmodel = require("../models/Restaurant");

const path =require('path')
const multer = require("multer");
const storage = multer.diskStorage({
  destination:"uploads",
  filename: (req,file,cb)=>{
    cb(null,file.originalname);
  }
});
const upload = multer({ storage : storage });




// this is used to post a new restaurant

const postRestaurant= asyncHandler(async (req, res) => {
  if (!req.body.restaurant_name) {
    return res.status(400).send({
      error: true,
      message: "Missing required field: restaurant_name",
    });
  }

  let resto_logo;
  if (!req.file) {
    resto_logo = path.join( "./logo.jpg");
  } else {
    resto_logo = req.file.path;
  }

  const restaurantinfo = new restaurantmodel({
    user_id: req.body.user_id,
    restaurant_name: req.body.restaurant_name,
    is_disabled: req.body.is_disabled || false,
    resto_logo: resto_logo,
  });

  try {
    await restaurantinfo.save();
    return res.send({
      message: "Restaurant information saved successfully.",
    });
  } catch (error) {
    return res.status(500).send({
      error: true,
      message: "Failed to save restaurant information.",
    });
  }




  });
// app.get("/restaurants/allrestaurants",
  // used to get all of the restaurants for the superadmin
  const getAll= asyncHandler(async (req, res) => {
    const items = await restaurantmodel.find(
      {},
      { restaurant_name: 1, is_disabled: 1,user_id: 1}
    );
    res.send(items);
  });
  //app.get("/restaurants/logos",
  //used to get restaurants logo
  const restoLogos= asyncHandler( async (req, res) => {
    try {
      const  _id  = req.query._id;
      const resto = await restaurantmodel.find({ _id });
      if (!resto) {
        return res.status(404).send({ error: "No restaurant found" });
      }
  
      res.json(resto[0].resto_logo);
    } catch (error) {
      res.status(500).send(error);
    }
  });
//used to get restaurant name
//app.get("/restaurants/restaurant_name"
const restoName= asyncHandler(async (req, res) => {
    const _id=req.query._id;
    const resto = await restaurantmodel.find({ _id });
    console.log(resto[0].restaurant_name);
    res.send(resto[0].restaurant_name);
  });



  //used to update restaurant logo
//app.put("/restaurants/logo"
const changeLogo= asyncHandler( async (req, res) => {
    const restaurant = await restaurantmodel.findById(req.body._id);
    if (!req.file) {
      return res.status(400).send({ error: "No file was uploaded." });
    } else {
      restaurant.resto_logo = req.file.path;
      await restaurant.save();
       res.status(200).send('Logo Updated Successfully');
    }
  });

  //used to disable a restaurant from the superadmin dashboard
  //app.put("/restaurants/isdisabled"
  const disableResto= asyncHandler(async (req, res) => {
    const {_id,is_disabled,restaurant_name} = req.body;
    const movie = await restaurantmodel.findById(_id);
    
    if (movie) {
      movie.is_disabled = is_disabled;
      await movie.save();
    }
   
  
    res.status(200).send("the is_disabled have been edited ");
  });



  
const changerestoname=asyncHandler(async(req,res)=>{
  const {_id,restaurant_name} = req.body;
  const restaurant = await restaurantmodel.findById(_id);
  
  if (restaurant) {
    restaurant.restaurant_name = restaurant_name;
    await restaurant.save();
    res.send(`The restaurant name has been edited to "${restaurant_name}".`);
  } else {
    res.status(404).send("The restaurant with the given ID was not found.");
  }
})







































  module.exports ={changerestoname,postRestaurant,getAll,restoLogos,restoName,changeLogo,disableResto}