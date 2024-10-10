const express = require("express");
const router = express.Router();
const User = require("./model");
const { createNewUser, authenticateUser } = require("./controller");
const auth = require("./../../middleware/auth");
const {
  sendVerificationOTPEmail,
} = require("./../email_verification/controller");
const multer = require("multer");
const path = require("path");
const verifyToken = require("./../../middleware/auth");
const bcrypt = require("bcrypt");
const { Cart } = require("../userdahboard/models/cart");

// Protected route example
router.get("/private_data", auth, (req, res) => {
  res
    .status(200)
    .send(`You're in the private territory of ${req.currentUser.email}`);
});

// Signin route
router.post("/", async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the request body
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    if (!(email && password)) {
      throw new Error("Empty credentials supplied!");
    }
    const authenticatedUser = await authenticateUser({ email, password });
    res.status(200).json(authenticatedUser);
  } catch (error) {
    console.error("SignIn error:", error.message); // Log the error for debugging
    res.status(400).json({ error: error.message });
  }
});

// Signup route
router.post("/signup", async (req, res) => {
  try {
    let { fullname, email, password, phone } = req.body;
    fullname = fullname.trim();
    email = email.trim();
    password = password.trim();
    phone = phone.trim();
    if (!(fullname && email && password && phone)) {
      throw new Error("Empty input fields!");
    } else if (!/^[a-zA-Z ]*$/.test(fullname)) {
      throw new Error("Invalid name entered");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw new Error("Invalid email entered");
    } else if (!/^[0-9]{10}$/.test(phone)) {
      throw new Error("Invalid phone number");
    } else if (password.length < 8) {
      throw new Error("Password is too short!");
    } else {
      // Good credentials, create new user
      const newUser = await createNewUser({
        fullname,
        email,
        password, // Ensure you hash the password before storing it
        phone,
      });
      await sendVerificationOTPEmail(email);
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to get user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.currentUser.userId;
    const user = await User.findById(userId).select("-password"); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Construct the full URL for the profile image
    const baseUrl = req.protocol + "://" + req.get("host");
    const profileImageUrl = user.profileImage
      ? `${baseUrl}/${user.profileImage}`
      : null;

    res.json({
      ...user._doc,
      profileImage: profileImageUrl,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to update user profile
router.put(
  "/profile",
  verifyToken,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const userId = req.currentUser.userId;
      const { fullname, email, phone, password, address } = req.body;
      let profileImage = null;

      // Check if profileImage was uploaded
      if (req.file) {
        profileImage = req.file.path.replace(/\\/g, "/"); // Normalize file path
      }

      const updateData = { fullname, email, phone, address };

      // Hash the password if provided
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password with 10 rounds of salt
        updateData.password = hashedPassword;
      }

      // Add profileImage to updateData if it exists
      if (profileImage) {
        updateData.profileImage = profileImage;
      }

      // Update user and retrieve updated document, excluding password field
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      }).select("-password");

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Construct the full URL for the profile image
      const baseUrl = req.protocol + "://" + req.get("host");
      const profileImageUrl = updatedUser.profileImage
        ? `${baseUrl}/${updatedUser.profileImage}`
        : null;

      res.status(200).json({
        message: "Profile updated successfully",
        user: {
          ...updatedUser._doc,
          profileImage: profileImageUrl,
        },
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

// add to cart
router.post("/cart", verifyToken, async (req, res) => {
  try {
    const userId = req.currentUser.userId;
    const { product } = req.body;

    // Create a new Cart document
    const cart = new Cart(product);
    await cart.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add product to cart collection
    user.cart.push(cart._id);
    await user.save();
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// get from cart
router.get("/cart", verifyToken, async (req, res) => {
  try {
    const userId = req.currentUser.userId;
    const user = await User.findById(userId).populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// delete from cart
router.delete("/cart/:cartId", verifyToken, async (req, res) => {
  try {
    const userId = req.currentUser.userId;
    const { cartId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove cart item from user's cart
    user.cart.pull(cartId);
    await user.save();

    // Delete cart item from Cart collection
    await Cart.findByIdAndDelete(cartId);

    // get updated cart
    const updated = await User.findById(userId).populate("cart");

    res.status(200).json({
      cart: updated.cart,
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// update cart
router.put("/cart/:cartId", verifyToken, async (req, res) => {
  try {
    const userId = req.currentUser.userId;
    const { cartId } = req.params;
    const { product } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update cart item in Cart collection
    await Cart.findByIdAndUpdate(cartId, product);

    // get updated cart
    const updated = await User.findById(userId).populate("cart");

    res.status(200).json({
      cart: updated.cart,
      message: "Product updated in cart successfully",
    });
  } catch (error) {
    console.error("Error updating product in cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
