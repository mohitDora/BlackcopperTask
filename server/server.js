const express=require("express");
const router=require("./router/apirouter")
const connectdb=require("./utils/db");
const cors=require("cors");
const morgan = require('morgan');

const app=express();

const PORT=5000;
const corsOptions={
    origin:"http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true
}

app.use(express.json())
app.use(morgan('dev'));
app.use(router)
app.use(cors(corsOptions))

app.get("/",(req,res)=>{
    res.status(200).send("home");
})
connectdb().then(()=>{
app.listen(PORT,()=>{
    console.log(`server is running at port : ${PORT}`)
})
})