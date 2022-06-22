const Quiz = require("../../../domain/quiz/Quiz");
const {getListOfQuestions} = require("../lessons/questions");

const createNewQuiz = async (
    lessonId,
    userId,
    questions,
    {QuizRepositry, questionRepositry}
) => {
    let mark = 0;
    const quizEntity = new Quiz();
    quizEntity.userId = userId;
    quizEntity.lessonId = lessonId;
    quizEntity.questions = JSON.stringify(questions);

    const lessonsQuestions = await getListOfQuestions(lessonId, {
        questionRepositry
    });

    for (let question of questions) {
        const lessonsQuestion = lessonsQuestions.find(
            (ques) => ques.ID == question.questionId
        );

        const correctAnswerId = lessonsQuestion.dataValues.answers.find(
            (answer) => answer.isCorrect
        ).ID;

        if (correctAnswerId == question.answerId) mark += 1;
    }

    if (mark > Math.floor(lessonsQuestions.length / 2))
        quizEntity.success = true;
    else quizEntity.success = false;

    const quizId = await QuizRepositry.persist(quizEntity);

    return {
        quizId,
        correctQuestions: mark,
        allQuestions: lessonsQuestions.length,
        success: quizEntity.success
    };
};

module.exports = createNewQuiz;
