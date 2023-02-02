const asyncHandler = require("express-async-handler");
const restaurantmodel = require("../models/Restaurant");






// this is used to post a new restaurant

const postRestaurant= asyncHandler( async (req, res) => {
    if (!req.body.restaurant_name) {
      res.send({
        status: 403,
        error: true,
        message: "your missing a restaurant name ",
      });
    } else {
      let logoData;
      let logoContentType;
  
      if (!req.file) {
        const defaultImage = fs.readFileSync('logo.jpg');
        logoData = defaultImage;
        logoContentType = 'image/jpeg';
      } else {
        logoData = req.file.buffer;
        logoContentType = req.file.mimetype;
      }
  
      const restaurantinfo = new restaurantmodel({
        user_id: req.body.user_id,
        restaurant_name: req.body.restaurant_name,
        is_disabled: req.body.is_disabled,
        resto_logo: {
          data: logoData,
          contentType: logoContentType,
        },
      });
      await restaurantinfo.save();
      res.send("everything is working")
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
      const  _id  = req.body._id;
      const resto = await restaurantmodel.find({ _id });
      if (!resto) {
        return res.status(404).send({ error: "No restaurant found" });
      }
  
      res.contentType(resto[0].resto_logo.contentType);
      res.send(resto[0].resto_logo.data);
    } catch (error) {
      res.status(500).send(error);
    }
  });
//used to get restaurant name
//app.get("/restaurants/restaurant_name"
const restoName= asyncHandler(async (req, res) => {
    const _id=req.body._id;
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
      restaurant.resto_logo = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      }
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
   
  
    res.status(200).send(restaurant_name);
  });



  








































  module.exports ={postRestaurant,getAll,restoLogos,restoName,changeLogo,disableResto}