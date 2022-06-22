// create lesson question answer class
class LessonQuestionAnswer {
    constructor({questionId, title, isCorrect}) {
        this.questionId = questionId;
        this.title = title;
        this.isCorrect = isCorrect;
    }
}

// extract lesson question answer class
module.exports = LessonQuestionAnswer;
