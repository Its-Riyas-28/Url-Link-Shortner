module.exports = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 150 * 60 * 1000), 
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message: "Logged in successfully!",
    token,
    user: {
      id: user._id,
      name: user.name, 
      email: user.email,
    },
  });
};
