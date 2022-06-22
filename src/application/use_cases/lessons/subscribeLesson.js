const LessonHistory = require("../../../domain/lessons/history/LessonHistory");

const subscribeLesson = async (lessonHistoryData, {LessonHistoryRepositry}) => {
    try {
        // create new lesson history entity
        const LessonHistoryEntity = new LessonHistory();
        LessonHistoryEntity.lessonId = lessonHistoryData.lessonId;
        LessonHistoryEntity.userId = lessonHistoryData.userId;

        // send lesson entity to repositry and return  lesson id
        return await LessonHistoryRepositry.persist(LessonHistoryEntity);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = subscribeLesson;
