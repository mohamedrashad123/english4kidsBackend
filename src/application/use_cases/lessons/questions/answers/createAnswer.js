const LessonQuestionAnswer = require("../../../../../domain/lessons/questions/answers/Answer");

const createLessonAnswerQuestion = async (
    lessonQuestionData,
    {LessonQuestionAnswerRepositry}
) => {
    try {
        // create new lesson entity
        const LessonQuestionAnswerEntity = new LessonQuestionAnswer({
            ...lessonQuestionData
        });

        // send lesson entity to repositry and return  lesson id
        return await LessonQuestionAnswerRepositry.persist(
            LessonQuestionAnswerEntity
        );
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = createLessonAnswerQuestion;
