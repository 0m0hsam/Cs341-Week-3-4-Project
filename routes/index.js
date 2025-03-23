const router = require("express").Router();

//home route
router.get("/", (req, res) => {
  res.send("Welcome to student database!");
});

router.use("/student", require("./student")); // Use the student.js file for the /student route
module.exports = router; // Export the router object
