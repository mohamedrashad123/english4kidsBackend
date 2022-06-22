class LessonHistory {
    lessonId;
    userId;

    static setLessonId(lessonId) {
        this.lessonId = lessonId;
    }

    static setUserId(userId) {
        this.userId = userId;
    }
}

module.exports = LessonHistory;
