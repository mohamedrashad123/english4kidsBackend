const LessonQuestionAnswer = require("../../../../../domain/lessons/questions/answers/Answer");

const updateAnswer = async (answerData, answerId, {answerRepositry}) => {
    try {
        // create new lesson entity
        const answerEntity = new LessonQuestionAnswer({
            ...answerData
        });

        // send lesson entity to repositry and return  lesson id
        return await answerRepositry.updateById(answerEntity, answerId);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = updateAnswer;
