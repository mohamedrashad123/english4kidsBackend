const sequelize = require("../../../orm/sequlize");
const LessonHistoryRepositry = require("../../../../domain/lessons/history/LessonHistoryRepoisitry");

module.exports = class extends LessonHistoryRepositry {
    #db;
    #model;
    constructor() {
        super();
        this.#db = sequelize;
        this.#model = this.#db.model("lesson_history");
    }

    persist = async (LessonHistoryEntity) => {
        // create new lesson
        const newLessonHistory = await this.#model.create(LessonHistoryEntity);

        // save lesson to database
        newLessonHistory.save();

        // return lesson ID
        return newLessonHistory.ID;
    };
};
