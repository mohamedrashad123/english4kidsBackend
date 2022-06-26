const Lesson = require("../../../domain/lessons/Lesson");

const updateLesson = async (lessonData, lessonId, {lessonRepositry}) => {
    // create lesson entity
    const lessonEntity = new Lesson({...lessonData});

    // send lesson entity to update method in repositry and return result
    return await lessonRepositry.updateById(lessonEntity, lessonId);
};

module.exports = updateLesson;
