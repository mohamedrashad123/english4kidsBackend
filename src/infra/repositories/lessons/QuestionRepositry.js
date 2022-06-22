const sequelize = require("../../orm/sequlize");
const LessonQuestionRepositry = require("../../../domain/lessons/questions/QuestionRepositry");

module.exports = class extends LessonQuestionRepositry {
    #db;
    #model;
    #userModel;
    #answerModel;
    constructor() {
        super();
        this.#db = sequelize;
        this.#model = this.#db.model("question");
        this.#answerModel = this.#db.model("q_answer");
        this.#userModel = this.#db.model("user");
    }

    persist = async (LessonQuestionEntity) => {
        // create new lesson
        const newQuestion = await this.#model.create(LessonQuestionEntity);

        // save lesson to database
        newQuestion.save();

        // return lesson ID
        return newQuestion.ID;
    };

    async getList(lessonId) {
        const questions = await this.#model.findAll({
            where: {lessonId},
            attributes: ["ID", "title", "image"],
            include: {
                model: this.#answerModel,
                as: "answers",
                attributes: ["ID", "title", "isCorrect"]
            }
        });

        return questions;
    }

    async getById(lessonId) {
        // get lesson data from lessons table
        const lessonDetails = await this.#model.findByPk(lessonId, {
            attributes: [
                "ID",
                "title",
                "content",
                "video",
                "grammer_images",
                "words_images"
            ]
            // include: {
            // 	model: this.#userModel,
            // 	as: "users",
            // 	attributes: ["phone"],
            // },
        });

        return lessonDetails;
    }
};
