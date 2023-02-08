const asyncHandler = require("express-async-handler");
const categoriesmodel = require("../models/categories");
const itemmodel = require("../models/Item");

// this code is used to post a category into a restaurant using the restaurant id
//app.post("/categories/post"

const postCat= asyncHandler( async (req, res) => {


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


const itempost=asyncHandler(async (req,res)=>{


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



})













  
//   app.put("/categories/item/put"
//use to edit an item
// app.put("/categories/item/put",
const updateCatItem= asyncHandler(  async (req, res) => {
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
  

//app.delete("/categories/items/delete"
// use to delete an item inside a category
const deleteCatItem= asyncHandler(  async (req, res) => {
  const _id = req.query;

  const item = await itemmodel.findByIdAndDelete(_id);
  res.send("donee the item have been deleted ");;
  });


  // BE CAREFUL IF YOU USE IT
//app.delete("/categories/category/delete"
const deleteCat= asyncHandler(  async (req, res) => {
    const _id = req.body;
  
    const item = await categoriesmodel.findByIdAndDelete(_id);
    res.send("donee the category has been deleted ");
  });

//get categories with resto id
// app.get("/categories/get"
const getCatsByResto= asyncHandler(  async (req, res) => {
    const { resto_id } = req.query;
    if (!resto_id){
      res.send("put the resto_id ")
    }
    const category = await categoriesmodel.find({ resto_id });
    res.send(category);
  });


  //get items by their category
//   app.get("/categories/get/items"
const getItemsByCats= asyncHandler(  async (req, res) => {
    const { cat_id } = req.query;
    const items = await itemmodel.find({ cat_id });
    res.json(items);
  });
 

  module.exports={getItemsByCats,getCatsByResto,deleteCat,deleteCatItem,updateCatItem,postCat,itempost}