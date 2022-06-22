const LessonQuestion = require("../../../../domain/lessons/questions/Question");

const createLessonQuestion = async (
    lessonQuestionData,
    {LessonQuestionRepositry}
) => {
    try {
        // create new lesson entity
        const LessonQuestionEntity = new LessonQuestion({
            ...lessonQuestionData
        });

        // send lesson entity to repositry and return  lesson id
        return await LessonQuestionRepositry.persist(LessonQuestionEntity);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = createLessonQuestion;
