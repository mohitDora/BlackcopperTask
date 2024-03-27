const Api= require("../models/apimodel")
const Nodecache=require("node-cache")

const nodecache=new Nodecache();

const data= async (req, res) => {
    console.log("hello")
    try {
        let getdata;
        if(nodecache.has("data")){
            getdata=JSON.parse(nodecache.get("data"))
        }
        else{
            getdata = await Api.find({})

        if(!getdata){
            res.status(404).json({msg:"Data fetching error"});
            return
        }
            nodecache.set("data",JSON.stringify(getdata))
        }
       
        
        res.status(201).send(getdata)
    } catch (error) {
        console.log("error")
        res.status(401).json({msg:"server error"})
    }
}
const like= async (req, res) => {
    console.log("hello")

    try {
        const query={...req.query};

        for (const key in query) {
            if (Object.hasOwnProperty.call(query, key)) {
                const values = query[key].split(',').map(item => item.trim());
                if (values.length === 1 && values[0] === '') {
                    delete query[key]; // Remove key with empty value
                } else {
                    query[key] = values;
                }
            }
        }
        
        console.log(query);

        
const getdata = await Api.find(query);

res.status(200).send(getdata)
    } catch (error) {
        console.log("error")
        res.status(401).json({msg:"server error"})
    }
}
module.exports = {data,like};