const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express() ;

app.use(express.json(),cors());

app.get("/" , (req,res) =>{
    res.status(200).send({"msg":"This is a home route"});
});

app.listen(process.env.PORT , () => {
    console.log(`Server is running ...`);
});
