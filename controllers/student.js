const { body, validationResult } = require("express-validator");
const mongodb = require("../DB/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection("profile").find();
    const profile = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong with fetching the profiles" });
  }
};

const getSingle = async (req, res) => {
  try {
    const userid = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("profile")
      .find({ _id: userid });
    const profile = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(profile[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong with fetching the profile" });
  }
};

const createStudent = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("phoneNumber").isMobilePhone().withMessage("Invalid phone number"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("degree").notEmpty().withMessage("Degree is required"),
  body("school").notEmpty().withMessage("School is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        degree: req.body.degree,
        school: req.body.school,
      };
      const result = await mongodb
        .getDatabase()
        .collection("profile")
        .insertOne(user);
      if (result.insertedId) {
        res.status(201).json({ message: "created successfully" });
      } else {
        res.status(500).json({
          error: "Something went wrong with creating the student profile",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "Something went wrong with creating the student profile",
      });
    }
  },
];

const updateStudent = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("phoneNumber").isMobilePhone().withMessage("Invalid phone number"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("degree").notEmpty().withMessage("Degree is required"),
  body("school").notEmpty().withMessage("School is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userid = new ObjectId(req.params.id);
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        degree: req.body.degree,
        school: req.body.school,
      };
      const result = await mongodb
        .getDatabase()
        .collection("profile")
        .updateOne({ _id: userid }, { $set: user });
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "updated successfully" });
      } else {
        res.status(500).json({
          error: "Something went wrong with updating the student profile",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "Something went wrong with updating the student profile",
      });
    }
  },
];

const deleteStudent = async (req, res) => {
  try {
    const userid = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("profile")
      .deleteOne({ _id: userid });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "deleted successfully" });
    } else {
      res.status(500).json({
        error: "Something went wrong with deleting the student profile",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong with deleting the student profile",
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent,
};
