const Controller = require("../../utils/Controller");
const Methods = require("../../utils/endpointMethods");
const QuizRepositry = require("../../infra/repositories/quiz/QuizRepositry");
const LessonQuestionRepositry = require("../../infra/repositories/lessons/QuestionRepositry");
const {createQuiz} = require("../../application/use_cases/quiz");

class QuizController extends Controller {
    path = "/quizes";
    #quizRepositry;
    #questionRepositry;
    routes = [
        {
            path: "/",
            method: Methods.POST,
            handler: (req, res) => this.handleCreateQuiz(req, res),
            localMiddleware: []
        }
    ];

    constructor(TokenHandler) {
        super();
        this.tokenHandler = new TokenHandler();
        this.#quizRepositry = new QuizRepositry();
        this.#questionRepositry = new LessonQuestionRepositry();
    }

    handleCreateQuiz = async (req, res) => {
        try {
            // const token = req.headers["authorization"];
            // const {
            // 	dataValues: { ID: userId },
            // } = await userRepositry.getIdByToken(token);

            // extend  lesson data from request
            const {lessonId, userId, questions} = req.fields;

            // send data to create lesson use case and get lesson id
            const quizReport = await createQuiz(lessonId, userId, questions, {
                QuizRepositry: this.#quizRepositry,
                questionRepositry: this.#questionRepositry
            });

            if (quizReport.quizId) {
                this.sendSuccess(
                    res,
                    {statusCode: 200, quizReport},
                    "quiz created successfully"
                );
            } else this.sendError(res, "error on creating new quiz");
        } catch (err) {
            console.log(err);
            this.sendError(res, err.message);
        }
    };
}

module.exports = QuizController;
