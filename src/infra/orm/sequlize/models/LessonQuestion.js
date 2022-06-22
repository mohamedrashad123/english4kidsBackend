/*jslint es6 */
const defineLessonQuestionModel = (sequelize, DataTypes) => {
    "use strict";
    sequelize.define(
        "question",
        {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            lessonId: {type: DataTypes.INTEGER(100), allowNull: false},
            title: {type: DataTypes.STRING(150), allowNull: false},
            image: {type: DataTypes.STRING(150)},
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

module.exports = defineLessonQuestionModel;
