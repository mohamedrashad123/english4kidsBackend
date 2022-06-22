/*jslint es6 */

const defineLessonQuestionAnswerModel = (sequelize, DataTypes) => {
    "use strict";
    sequelize.define(
        "q_answer",
        {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            questionId: {type: DataTypes.INTEGER(100), allowNull: false},
            title: {type: DataTypes.STRING(150), allowNull: false},
            isCorrect: {type: DataTypes.BOOLEAN, allowNull: false},
            status: {
                type: DataTypes.STRING(15),
                allowNull: false,
                defaultValue: "active"
            }
        },
        {
            // options
        }
    );
};

module.exports = defineLessonQuestionAnswerModel;
