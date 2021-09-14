const mongoose = require("mongoose");
const { Schema } = mongoose;
const quizData = require("../quiz-data/quiz-data");

const OptionSchema = new Schema({
  text: {
    type: String,
    required: "Cannot add questions without some text"
  },
  isRight: {
    type: Boolean,
    required: "Cannot add option without specifying it's correctness"
  }
})

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: "Cannot add questions without some text"
  },
  options: {
    type: [OptionSchema],
    required: true
  },
  points: {
    type: Number,
    required: "Cannot add question without it's points"
  },
  negativePoints: {
    type: Number,
    required: "Cannot add question without it's negative points"
  }
})

const QuizSchema = new Schema({
  name: {
    type: String,
    required: "Cannot add quiz without a name"
  },
  coverImage: {
    type: String,
    required: "Cannot add quiz without it's cover image"
  },
  questions: {
    type: [QuestionSchema],
    required: "Cannot add quiz without questions"
  },
  totalQuestions: {
    type: Number,
    required: "Please mention total questions of the quiz"
  },
  totalPoints: {
    type: Number,
    required: "Please mention total points of the quiz"
  }
});

const Quiz = mongoose.model("Quiz", QuizSchema);

async function seedAllQuizzes() {
  try {
    quizData.forEach(async (quiz) => {
      const addedQuiz = new Quiz(quiz);
      await addedQuiz.save();
    })
    console.log("successfully added all the quiz");
  } catch (error) {
    console.error(error);
  }
} 

module.exports = { Quiz, seedAllQuizzes };