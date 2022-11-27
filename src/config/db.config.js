const mongoose = require('mongoose');

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// export the mongoose connecting string
module.exports = (MONGO_URL) => {
  try {
    mongoose.connect(MONGO_URL, mongoOptions);
    console.log("DB connected successfully");
  } catch (err) {
    console.log("<::: Couldn't connect to database ", err.message);
  }
};