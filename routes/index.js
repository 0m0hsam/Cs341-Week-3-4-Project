const router = require("express").Router();

router.use("/", require("./swagger"));
//home route
router.get("/", (req, res) => {
  res.send("Welcome to student database!");
});

router
  .use("/student", require("./student")) // Use the student.js file for the /student route
  .use("/grade", require("./grade")); // Use the grade.js file for the /grade route

module.exports = router; // Export the router object
