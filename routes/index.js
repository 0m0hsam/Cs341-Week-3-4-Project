const router = require("express").Router();
const passport = require("passport");
// Import the authenticate middleware
const authenticate = require("../middleware/authenticate");

// Swagger documentation route
router.use("/", require("./swagger"));

// Home route
router.get("/", (req, res) => {
  res.send("Welcome to student database!");
});

// Login route (GitHub authentication)'/
router.get("/login", passport.authenticate("github"), (req, res) => {});

// Logout route
router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.redirect("/"); // Redirect to the home page after logout
  });
});

module.exports = router; // Export the router object
