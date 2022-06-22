const sequelize = require("../../orm/sequlize");
const QuizRepositry = require("../../../domain/quiz/quizRepositry");

module.exports = class extends QuizRepositry {
    #db;
    #model;

    constructor() {
        super();
        this.#db = sequelize;
        this.#model = this.#db.model("quiz");
    }

    persist = async (quizEntity) => {
        // create new quiz
        const newQuiz = await this.#model.create(quizEntity);

        // save quiz to database
        newQuiz.save();

        // return quiz ID
        return newQuiz.ID;
    };
};
