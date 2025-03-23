const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");

router.get("/", studentController.getAll);

router.get("/:id", studentController.getSingle);

router.post("/", studentController.createStudent);

router.put("/:id", studentController.updateStudent);

router.delete("/:id", studentController.deleteStudent);
module.exports = router;
