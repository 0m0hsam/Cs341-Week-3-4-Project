const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", studentController.getAll);

router.get("/:id", studentController.getSingle);

router.post("/", isAuthenticated, studentController.createStudent);

router.put("/:id", isAuthenticated, studentController.updateStudent);

router.delete("/:id", isAuthenticated, studentController.deleteStudent);
module.exports = router;
