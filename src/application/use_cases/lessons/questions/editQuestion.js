const LessonQuestion = require("../../../../domain/lessons/questions/Question");

const updateQuestion = async (
    questionData,
    questionId,
    {lessonQuestionRepositry}
) => {
    try {
        // create new lesson entity
        const LessonQuestionEntity = new LessonQuestion({
            ...questionData
        });

        // send lesson entity to repositry and return  lesson id
        return await lessonQuestionRepositry.updateById(
            LessonQuestionEntity,
            questionId
        );
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = updateQuestion;
