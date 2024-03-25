const express=require("express");
const controller=require("../controllers/apicontroller")
const router=express.Router();


router.route("/data").get(controller.data)
router.route("/").get(controller.home)

module.exports=router;