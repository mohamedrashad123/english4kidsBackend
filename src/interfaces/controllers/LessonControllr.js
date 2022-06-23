const Controller = require("../../utils/Controller");
const Methods = require("../../utils/endpointMethods");
const LessonRepositry = require("../../infra/repositories/LessonRepositry");
const LessonHistoryRepositry = require("../../infra/repositories/lessons/history/LessonHistoryRepoisitry");
const LessonQuestionRepositry = require("../../infra/repositories/lessons/QuestionRepositry");
const LessonQuestionAnswerRepositry = require("../../infra/repositories/lessons/questions/AnswerRepositry");
const {
    createLesson,
    getLessonDetails,
    getListOfLessons,
    subscribeLesson
} = require("../../application/use_cases/lessons");
const {
    createLessonQuestion
} = require("../../application/use_cases/lessons/questions");
const {
    createLessonAnswerQuestion
} = require("../../application/use_cases/lessons/questions/answers");
const {getImgPath} = require("../../utils/imageSaver");

class LessonController extends Controller {
    path = "/lessons";
    #lessonRepositry;
    #questionRepositry;
    #answerRepositry;
    #lessonHistoryRepositry;
    routes = [
        {
            path: "/",
            method: Methods.POST,
            handler: (req, res) => this.handleCreateLesson(req, res),
            localMiddleware: []
        },
        {
            path: "/",
            method: Methods.GET,
            handler: (req, res) => this.handleGetListOfLessons(req, res),
            localMiddleware: []
        },
        {
            path: "/:lessonId",
            method: Methods.GET,
            handler: (req, res) => this.handleGetLessonDetails(req, res),
            localMiddleware: []
        },
        {
            path: "/:lessonId/subscribe",
            method: Methods.POST,
            handler: (req, res) => this.handleSubscribeLesson(req, res),
            localMiddleware: []
        }
    ];

    constructor(TokenHandler) {
        super();
        this.tokenHandler = new TokenHandler();
        this.#lessonRepositry = new LessonRepositry();
        this.#questionRepositry = new LessonQuestionRepositry();
        this.#answerRepositry = new LessonQuestionAnswerRepositry();
        this.#lessonHistoryRepositry = new LessonHistoryRepositry();
    }

    handleCreateLesson = async (req, res) => {
        try {
            // const token = req.headers["authorization"];
            // const {
            // 	dataValues: { ID: userId },
            // } = await userRepositry.getIdByToken(token);

            // extend  lesson data from request
            const {
                gradeId,
                unitId,
                title,
                description,
                video,
                grammar_images,
                words_info,
                words_images
            } = req.fields;
            const {lessonImage} = req.files;
            let lessonImageLink = "";

            // if (lessonImage)
            //     lessonImageLink = getImgPath(lessonImage, "lessons");

            // // create lesson data map
            // const lessonData = {
            //     gradeId,
            //     unitId,
            //     title,
            //     description,
            //     video,
            //     image: lessonImageLink,
            //     grammar_images,
            //     words_info,
            //     words_images
            // };

            // // send data to create lesson use case and get lesson id
            // const lessonId = await createLesson(lessonData, {
            //     LessonRepositry: this.#lessonRepositry
            // });

            // if (lessonId) {
            //     const {questions} = req.fields;
            //     const formatedQuestions =
            //         typeof questions === "string"
            //             ? JSON.parse(questions)
            //             : questions;

            //     if (formatedQuestions.length) {
            //         for (let question of formatedQuestions) {
            //             // create lesson entity
            //             const questionData = Object.assign({}, question, {
            //                 lessonId
            //             });

            //             // send lesson question data to usecase
            //             const questionId = await createLessonQuestion(
            //                 questionData,
            //                 {LessonQuestionRepositry: this.#questionRepositry}
            //             );

            //             if (questionId) {
            //                 for (let answer of question.answers) {
            //                     const answerData = Object.assign({}, answer, {
            //                         questionId
            //                     });

            //                     createLessonAnswerQuestion(answerData, {
            //                         LessonQuestionAnswerRepositry:
            //                             this.#answerRepositry
            //                     });
            //                 }
            //             } else {
            //                 throw new Error(
            //                     "error on creating new lesson question"
            //                 );
            //             }
            //         }
            //     }

            // this.sendSuccess(
            //     res,
            //     {statusCode: 200, lessonId},
            //     "lesson created successfully"
            // );
            this.sendSuccess(
                res,
                {statusCode: 200, lessonImage},
                "lesson created successfully"
            );
            // } else this.sendError(res, "error on creating new lesson");
        } catch (err) {
            console.log(err);
            this.sendError(res, err.message);
        }
    };

    handleGetListOfLessons = async (req, res) => {
        try {
            const {
                query: {unitId, gradeId, search}
            } = req;

            const lessons = await getListOfLessons(unitId, gradeId, search, {
                LessonRepositry: this.#lessonRepositry
            });

            this.sendSuccess(res, {statusCode: 200, lessons}, "ok");
        } catch (err) {
            console.log(err);
            this.sendError(res, err.message);
        }
    };

    handleGetLessonDetails = async (req, res) => {
        const {
            params: {lessonId}
        } = req;
        // const token = req.headers["authorization"];
        // const {
        // 	dataValues: { ID: userId },
        // } = await userRepositry.getIdByToken(token);
        const lessonDetails = await getLessonDetails(lessonId, {
            LessonRepositry: this.#lessonRepositry
        });
        this.sendSuccess(
            res,
            {
                statusCode: 200,
                lesson_details: lessonDetails
            },
            "ok"
        );
    };

    handleSubscribeLesson = async (req, res) => {
        try {
            const {
                params: {lessonId},
                fields: {userId}
            } = req;

            const lessonHistoryId = await subscribeLesson(
                {lessonId, userId},
                {LessonHistoryRepositry: this.#lessonHistoryRepositry}
            );

            if (lessonHistoryId)
                this.sendSuccess(res, {statusCode: 200, lessonHistoryId}, "ok");
            else this.sendError(res, "error when subscribing on lesson");
        } catch (err) {
            this.sendError(res, err.message);
        }
    };
}

module.exports = LessonController;
