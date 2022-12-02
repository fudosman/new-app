const {User} = require("../models");
// const {bcrypt} = require('../services');/


module.exports.postUser = async (req, res) => {
  try {
    const data = req.body;

    if (!data.username) {
      return res.status(400).json({
        msg: "Username is required"
      });
    }
    
    const user = new User(data);
    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if(!users) {
      return res.status(404).json({
        msg: "No users found"
      });
    }
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
};

module.exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if(!user) {
      return res.status(404).json({
        msg: "User not found"
      });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username} = req.body;
    const user = await Book.findById(id);
    
    if(!user) {
      return res.status(404).json({
        msg: "user not found"
      });
    }
  
    if(username) {
      user.username = title;
    }
    
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if(!user) {
      return res.status(404).json({
        msg: "user not found"
      });
    }
    
    await user.remove();
    return res.status(200).json({
      msg: "user deleted"
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
};