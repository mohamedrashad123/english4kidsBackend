class QuizRepositry {
    constructor() {
        if (new.target === QuizRepositry)
            throw new Error("Abstract class can't be instantiated");
    }

    persist() {
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }

    getIdByToken(token) {
        throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
    }
}

module.exports = QuizRepositry;
