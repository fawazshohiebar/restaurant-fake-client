const express = require('express');
const {secure} =require('../middleware/authentication')
const router = express.Router()
const multer = require('multer');
const storage = multer.diskStorage({
    destination:"uploads",
    filename: (req,file,cb)=>{
      cb(null,file.originalname);
    }
  });
const upload = multer({ storage : storage });
const path =require('path')

  const fs = require('fs');
//requireing the controller of the create user
const { postRestaurant,getAll,restoLogos,restoName, changeLogo,disableResto,changerestoname,getresto}= require('../controllers/restaurantController');



router.post('/post', upload.single("resto_logo"),postRestaurant)
router.put('/logo/put', upload.single("resto_logo"),changeLogo)
router.put('/isdisabled',disableResto)
router.put('/name',changerestoname)
router.get('/logos',restoLogos)
router.get('/allrestaurants',getAll)
router.get('/restaurant_name',restoName)
router.get('/restaurantid',getresto)

module.exports=router;
