const app = require('./app.js');
const dotenv = require('dotenv');
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

const DB = require('./config/db.config');
dotenv.config();

const port = process.env.PORT || 3000;

const start = async ()=>{
  try{
    await DB(MONGO_URL);
    app.listen(port, ()=> console.log(`server is listening on port ${port}`))
  }catch(error){
    console.error(error);
  }
}

start();
