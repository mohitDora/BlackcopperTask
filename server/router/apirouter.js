const express=require("express");
const controller=require("../controllers/apicontroller")
const router=express.Router();


router.route("/data").get(controller.data)
router.route("/data/like").get(controller.like)


module.exports=router;