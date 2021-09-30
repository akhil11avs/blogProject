const jwt = require("jsonwebtoken");
const User = require("./userSchema");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const tokenVerify = jwt.verify(
      token,
      "mynameisakhilandiamfromhisarharyanauttarpradesh"
    );

    const rootUser = await User.findOne({
      _id: tokenVerify._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (error) {
    res.status(400).send("Unauthorized:No token provided");
    console.log(error);
  }
};

module.exports = Authenticate;
