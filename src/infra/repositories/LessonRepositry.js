const sequelize = require("../orm/sequlize");
const LessonRepositry = require("../../domain/lessons/LessonRepositry");
const {Op} = require("sequelize");

module.exports = class extends LessonRepositry {
    #db;
    #model;
    #questionModel;
    #answerModel;
    constructor() {
        super();
        this.#db = sequelize;
        this.#model = this.#db.model("lesson");
        this.#questionModel = this.#db.model("question");
        this.#answerModel = this.#db.model("q_answer");
    }

    persist = async (LessonEntity) => {
        // create new lesson
        const newLesson = await this.#model.create(LessonEntity);

        // save lesson to database
        newLesson.save();

        // return lesson ID
        return newLesson.ID;
    };

    getList = async (unitId, gradeId, search) => {
        const where = new Object();

        where.status = "active";
        if (unitId) where.unitId = unitId;
        if (gradeId) where.gradeId = gradeId;
        if (search) where.title = {[Op.like]: `%${search}%`};

        const lessonsList = await this.#model.findAll({
            where,
            attributes: [
                "ID",
                "title",
                "image",
                "video",
                [
                    sequelize.literal(
                        `(SELECT  IFNULL(count(ID), 0) FROM questions WHERE lessonId = lesson.ID AND status="active")`
                    ),
                    "questionsCount"
                ]
            ],
            limit: 10
        });

        return lessonsList;
    };

    async getById(lessonId) {
        // get lesson data from lessons table
        const lessonDetails = await this.#model.findByPk(lessonId, {
            attributes: [
                "ID",
                "gradeId",
                "unitId",
                "title",
                "description",
                "video",
                "image",
                "grammar_images",
                "words_info",
                "words_images"
            ],
            include: {
                model: this.#questionModel,
                as: "questions",
                attributes: ["ID", "title", "image"],
                include: {
                    model: this.#answerModel,
                    as: "answers",
                    attributes: ["ID", "title"]
                }
            }
        });

        return lessonDetails;
    }

    async updateById(lessonEntity, lessonId) {
        const result = await this.#model.update(lessonEntity, {
            where: {ID: lessonId}
        });

        return result;
    }
};
