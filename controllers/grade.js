const { body, validationResult } = require("express-validator");
const mongodb = require("../DB/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection("grade").find();
    const grade = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(grade);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong with fetching the grades" });
  }
};

const getSingle = async (req, res) => {
  try {
    const gradeid = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("grade")
      .find({ _id: gradeid });
    const grade = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(grade[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong with fetching the grade" });
  }
};

const createGrade = [
  body("studentName").notEmpty().withMessage("Student name is required"),
  body("grade").notEmpty().withMessage("Student grades is required"),
  body("course").notEmpty().withMessage("Course is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("grader").notEmpty().withMessage("Grader  name is required"),
  body("instructor").notEmpty().withMessage("Instructor name is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const grade = {
        studentName: req.body.studentName,
        grade: req.body.grade,
        course: req.body.course,
        email: req.body.email,
        grader: req.body.grader,
        instructor: req.body.instructor,
      };
      const result = await mongodb
        .getDatabase()
        .collection("grade")
        .insertOne(grade);
      if (result.insertedId) {
        res
          .status(201)
          .json({ message: "created  student grade successfully" });
      } else {
        res.status(500).json({
          error: "Something went wrong with creating the student grade",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "Something went wrong with creating the student grade",
      });
    }
  },
];

const updateGrade = [
  body("studentName").notEmpty().withMessage("Student name is required"),
  body("grade").notEmpty().withMessage("Student grades is required"),
  body("course").notEmpty().withMessage("Course is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("grader").notEmpty().withMessage("Grader  name is required"),
  body("instructor").notEmpty().withMessage("Instructor name is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const gradeid = new ObjectId(req.params.id);
      const grade = {
        studentName: req.body.studentName,
        grade: req.body.grade,
        course: req.body.course,
        email: req.body.email,
        grader: req.body.grader,
        instructor: req.body.instructor,
      };
      const result = await mongodb
        .getDatabase()
        .collection("grade")
        .updateOne({ _id: gradeid }, { $set: grade });
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "updated student grade successfully" });
      } else {
        res.status(500).json({
          error: "Something went wrong with updating the student grade",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "Something went wrong with updating the student grade",
      });
    }
  },
];

const deleteGrade = async (req, res) => {
  try {
    const gradeid = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("grade")
      .deleteOne({ _id: gradeid });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "deleted  student grade successfully" });
    } else {
      res.status(500).json({
        error: "Something went wrong with deleting the student grade",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong with deleting the student grade",
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createGrade,
  updateGrade,
  deleteGrade,
};
