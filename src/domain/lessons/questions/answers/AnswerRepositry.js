class LessonQuestionAnswerRepository {
    constructor() {
        if (new.target === LessonQuestionAnswerRepository)
            throw new Error("Abstract class can't be instantiated");
    }

    persist() {
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }

    getIdByToken(token) {
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
}

module.exports = LessonQuestionAnswerRepository;
