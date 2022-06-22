const Lesson = require("../../../domain/lessons/Lesson");

const createLesson = async (lessonData, {LessonRepositry}) => {
    try {
        // create new lesson entity
        const LessonEntity = new Lesson({...lessonData});

        // send lesson entity to repositry and return  lesson id
        return await LessonRepositry.persist(LessonEntity);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = createLesson;
