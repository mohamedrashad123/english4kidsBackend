class Quiz {
    lessonId;
    userId;
    questions;
    success;

    static set lessonId(lessonId) {
        this.lessonId = lessonId;
    }
    static set userId(userId) {
        this.userId = userId;
    }
    static set questions(questions) {
        this.questions = questions;
    }
    static set success(success) {
        this.success = success;
    }
}

module.exports = Quiz;
