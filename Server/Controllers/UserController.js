import asyncHandler from "express-async-handler";
import User from "../Modals/UserModal.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Middlewares/Auth.js";

//@desc Register user
//@route POST /api/users/
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, image } = req.body;
  try {
    const userExists = await User.findOne({ email });
    //check if user exists
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user in db
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      image,
    });

    //if user created successfully send user data and token to the client
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    //if user exists compared password with hashed password then send user data and token to client
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

//****************Private Controller***************

//@desc update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullname, email, image } = req.body;
  try {
    //find user in db
    const user = await User.findById(req.user._id);
    if (user) {
      user.fullname = fullname || user.fullname;
      user.email = email || user.email;
      user.image = image || user.image;

      const updateUser = await user.save();
      res.json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(500);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

//@desc delete user profile
//@route DELETE /api/users
//@access Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    //find user in db
    const user = await User.findById(req.user._id);
    //if user exists delete user from db
    if (user) {
      //if user is admin throw error
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Admin user can't be deleted");
      }
      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

//@desc Change user password
//@route PUT /api/users/password
//@access Private
const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    //find user in db
    const user = await User.findById(req.user._id);
    //if user exists compare old password with hashed password then update
    //user password and save it in db
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.json({ message: "password changed!" });
    } else {
      res.status(401);
      throw new Error("Invalid old password");
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

//@desc Get all liked movies
//@route GET /api/users/favorites
//@access Private
const getLikedMovies = asyncHandler(async (req, res) => {
  try {
    //find user in db
    const user = await User.findById(req.user._id).populate("likedMovies");
    //if user exists send liked movies to client
    if (user) {
      res.json(user.likedMovies);
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

//@desc add movie to liked movies
//@route POST /api/users/favorites
//@access Private
const addLikedMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  try {
    //find user in db
    const user = await User.findById(req.user._id);
    //if user exists add movie to liked movies and save it in db
    if (user) {
      //check if movie already liked
      //if movie already liked send error
      if (user.likedMovies.includes(movieId)) {
        res.status(400);
        throw new Error("Movie already liked");
      }
      //else add movie to liked movie and save it in db
      user.likedMovies.push(movieId);
      await user.save();
      res.json(user.likedMovies);
    } else {
      res.status(400);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

//@desc Delete all liked movies
//@route DELETE /api/users/favorites
//@access Private
const deleteLikedMovie = asyncHandler(async (req, res) => {
  try {
    //find user in db
    const user = await User.findById(req.user._id);
    //if user exists delete all liked movies and save it in db
    if (user) {
      user.likedMovies = [];
      await user.save();
      res.json({ message: "All liked movies deleted successfully" });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

//******************Admin Controllers*********************

//@desc Get all users
//@route GET /api/users
//@access PrivateAdmin
const getUsers = asyncHandler(async (req, res) => {
  try {
    //find all users in db
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

//@desc Delete user
//@route DELETE /api/users/:id
//@access PrivateAdmin
const deleteUser = asyncHandler(async (req, res) => {
  try {
    //find user in db
    const user = await User.findById(req.params.id);
    //if user exists delete from db
    if (user) {
      //if user is admin throw error
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can't delete admin user");
      }
      await user.deleteOne();
      res.json({ message: "User deleted Successfully" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

export {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getLikedMovies,
  addLikedMovie,
  deleteLikedMovie,
  getUsers,
  deleteUser,
};
