const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/grade.js");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", gradeController.getAll);

router.get("/:id", gradeController.getSingle);

router.post("/", isAuthenticated, gradeController.createGrade);

router.put("/:id", isAuthenticated, gradeController.updateGrade);

router.delete("/:id", isAuthenticated, gradeController.deleteGrade);
module.exports = router;
