import User from "../models/user-model.js";
import Favorite from "../models/favorite-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//signup user function
const signupUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    console.log(username, email, password);
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(404).json({ message: "User already exists." });
    }
    if (password != confirmPassword) {
      return res.status(404).json({ message: "passwords not matched" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "user signup successful" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // Duplicate key error
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }
    return res
      .status(500)
      .json({ error: "Error while signing up user from server side." });
  }
};



//login user function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email: email });
    if (!existUser) {
      return res.status(404).json({ message: "User does not exist.." });
    }
    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (!isPasswordValid) {
      return res.status(404).json({ message: "Password does not match.." });
    }

    const userFavorites = await Favorite.find({ email: email });

    // Generate JWT token with user data
    const payload = {
      user: {
        id: existUser.id,
        username: existUser.username,
        email: existUser.email,
      },
    };
    jwt.sign(payload, "jwtSecretkey", { expiresIn: "1d" }, (err, token) => {
      if (err) {
        return res.status(500).json({ msg: "Error while logging in user" });
      }
      return res.status(201).json({ token, existUser ,userFavorites});
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error while user login from server side.." });
  }
};

export { signupUser, loginUser };
