/*jslint es6 */

const defineLessonHistoryModel = (sequelize, DataTypes) => {
    "use strict";
    sequelize.define(
        "lesson_history",
        {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            lessonId: {type: DataTypes.INTEGER(100), allowNull: false},
            userId: {type: DataTypes.INTEGER(100), allowNull: false}
        },
        {
            tableName: "lesson_history"
            // options
        }
    );
};

module.exports = defineLessonHistoryModel;
