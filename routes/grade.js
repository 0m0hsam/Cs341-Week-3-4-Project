const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/grade.js");

router.get("/", gradeController.getAll);

router.get("/:id", gradeController.getSingle);

router.post("/", gradeController.createGrade);

router.put("/:id", gradeController.updateGrade);

router.delete("/:id", gradeController.deleteGrade);
module.exports = router;
