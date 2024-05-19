const express= require('express')
const app=express();
const db=require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();

const PORT =process.env.PORT ||4000;

app.get('/',(req,res) =>{
    res.send("welcome to our hotel...How can i help you")
})

const personRoutes= require('./routes/personRoutes');
app.use('/person',personRoutes);



app.listen(PORT,()=>{
    console.log("server listing on port 4000");
})
