const express = require("express");
const quizRouter = express.Router();
const { Quiz } = require("../models/quiz.model");

quizRouter.route("/")
  .get(async (req, res) => {
    const quizzes = await Quiz.find({})
    res.json({ success: true, quizzes })
  })

module.exports = quizRouter;