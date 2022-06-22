const LessonDetails = require("../../../domain/lessons/LessonDetails");

const getLessonDetails = async (lessonId, {LessonRepositry}) => {
    try {
        // create new lesson detials entity
        // const LessonEntity = new Lesson({...lessonData});

        // get lesson details from repositry
        const lessonData = await LessonRepositry.getById(lessonId);

        const lessonDetails = new LessonDetails(lessonData);
        return lessonDetails;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = getLessonDetails;
