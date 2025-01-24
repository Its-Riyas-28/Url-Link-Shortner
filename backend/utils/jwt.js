module.exports = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message: "Logged in successfully!",
    token, // Include token in the response
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};
