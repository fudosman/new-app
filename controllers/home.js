module.exports = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Welcome to the home page",
  });
};

