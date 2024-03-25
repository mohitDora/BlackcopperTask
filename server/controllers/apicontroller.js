const Api= require("../models/apimodel")
const Nodecache=require("node-cache")

const nodecache=new Nodecache();

const data= async (req, res) => {
    console.log("hello")
    try {
        // let getdata;
        // if(nodecache.has("data")){
        //     getdata=JSON.parse(nodecache.get("data"))
        // }
        // else{
        //     getdata = await Api.find({})
        //     nodecache.set("data",JSON.stringify(getdata))
        // }
        
        const getdata = await Api.find({})
        if(!getdata){
            res.status(404).json({msg:"Data fetching error"});
            return
        }
        res.status(201).json(getdata)
    } catch (error) {
        console.log("error")
        res.status(401).json({msg:"server error"})
    }
}
module.exports = {data};