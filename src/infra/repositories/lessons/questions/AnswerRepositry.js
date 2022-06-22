const sequelize = require("../../../orm/sequlize");
const LessonQuestionAnswerRepository = require("../../../../domain/lessons/questions/answers/AnswerRepositry");

module.exports = class extends LessonQuestionAnswerRepository {
    #db;
    #model;
    #questionModel;
    constructor() {
        super();
        this.#db = sequelize;
        this.#model = this.#db.model("q_answer");
        this.#questionModel = this.#db.model("question");
    }

    persist = async (LessonQuestionAnswerEntity) => {
        // create new lesson
        const newAnswer = await this.#model.create(LessonQuestionAnswerEntity);

        // save lesson to database
        newAnswer.save();

        // return lesson ID
        return newAnswer.ID;
    };

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
