const mongoose= require('mongoose')
require('dotenv').config();
//define mongodb connection URL

//const mongoURL='mongodb://127.0.0.1:27017/hotels'
//const mongoURL='mongodb+srv://sutarvishwajeet:sutarvish@hotel.frwe1jq.mongodb.net/'
const mongoURL=process.env.MONGODB_URL;
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db= mongoose.connection

//define event listner for mongodb connection

db.on('connected',()=>{
    console.log('connected to mongodb server');
})

db.on('error',()=>{
    console.log('connection error');
})

db.on('disconnected',()=>{
    console.log( 'mongodb server disconnected');
})

module.exports=db;


