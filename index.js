const app = require('./app.js');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;

const start = async ()=>{
  try{
    app.listen(port, ()=> console.log(`server is listening on port ${port}`))
  }catch(error){
    console.error(errror);
  }
}

start();
const mySecret = process.env['PORT']
