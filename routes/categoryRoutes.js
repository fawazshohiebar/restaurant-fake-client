const express = require('express');
const {secure} =require('../middleware/authentication')
const router = express.Router()
const {getItemsByCats,getCatsByResto,deleteCat,deleteCatItem,updateCatItem,postCat,itempost}=require('../controllers/categoriesController')

router.get('/get/items', getItemsByCats)
router.put('/item/put',updateCatItem)
router.delete('/items/delete',deleteCatItem)
router.delete('/category/delete',deleteCat)
router.post('/post',postCat)
router.get('/get',getCatsByResto)
router.post('/item/post',itempost)

module.exports=router;