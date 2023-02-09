// used for jwt token auth!
const jwt = require("jsonwebtoken");
const bcrpt = require("bcryptjs");
// used to handle async operations (try/catch)
const asyncHandler = require("express-async-handler");
const User = require("../models/usersModel");

//@access PUBLIC
//@ route POST /api/users
// @desc register a new user
const registerUser = asyncHandler(async (req, res) => {
  //used to check for the fields and createing a new user
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    throw new Error("please fill all of the fields above!");
  }
  //check if user already exists
  const checkUser = await User.findOne({ username });
  if (checkUser) {
    res.status(400);
    throw new Error({ message: "User already exists" });
  }

  //Hash the password of the user
  const salt = await bcrpt.genSalt(10);
  const hashedPwd = await bcrpt.hash(password, salt);

  //create user
  const user = await User.create({
    username: req.body.username,
      password: hashedPwd,
      role: req.body.role
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      role:user.role,
      token:generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});
//@access PUBLIC
//@ route POST /api/users/login
// @desc authenticate a user
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  //will check for the existance of the email
  const user = await User.findOne({username});
  //will compare the input password with the one in the DB
  if (user && (await bcrpt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      token:generateToken(user._id),
      role:user.role,
    });
  } else {
    res.status(400);
    throw new Error("invalid email or password");
  }
});
//@access PUBLIC
//@ route GET/api/users/me
// @desc get user data
const getUserData = asyncHandler(async (req, res) => {
const {_id}= await User.findById(req.user.id)
res.status(200).json({
  id:_id,
 
})
});

//Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  getUserData,
  loginUser,
};
