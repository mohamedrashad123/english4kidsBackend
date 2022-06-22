const {Sequelize, DataTypes} = require("sequelize");
const environment = require("../../config/environment");
const defineUserModel = require("./models/User");
const defineLessonModel = require("./models/Lesson");
const defineLessonQuestionModel = require("./models/LessonQuestion");
const defineLessonQuestionAnswerModel = require("./models/LessonQuestionAnswer");
const defineLessonHistoryModel = require("./models/LessonHistory");
const defineQuizModel = require("./models/Quiz");

const sequelize = new Sequelize(
    "dipdux_english4kids",
    "dipdux_dipdux",
    "K}1oV*!!npjq",
    {
        dialect: environment.database.dialect,
        logging: false
    }
);

// const sequelize = new Sequelize("english4kids", "root", "", {
//     dialect: environment.database.dialect,
//     logging: false
// });

sequelize
    .authenticate()
    .then(() => {
        console.log("database conneted");
    })
    .catch((err) => {
        console.log("database unable to connect");
    });

[
    defineUserModel,
    defineLessonModel,
    defineLessonQuestionModel,
    defineLessonQuestionAnswerModel,
    defineLessonHistoryModel,
    defineQuizModel
].map((model) => model(sequelize, DataTypes));

const Lesson = sequelize.model("lesson");
const Question = sequelize.model("question");
const Answer = sequelize.model("q_answer");

Lesson.hasMany(Question, {foreignKey: "lessonId"});
Question.belongsTo(Lesson, {
    targetKey: "ID",
    foreignKey: "lessonId",
    as: "questions"
});

Question.hasMany(Answer, {as: "answers"});
Answer.belongsTo(Question, {
    targetKey: "ID",
    foreignKey: "questionId",
    as: "answers"
});

module.exports = sequelize;
