/*jslint es6 */

const defineQuizModel = (sequelize, DataTypes) => {
    "use strict";
    sequelize.define(
        "quiz",
        {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            lessonId: {type: DataTypes.INTEGER(100), allowNull: false},
            userId: {type: DataTypes.INTEGER(100), allowNull: false},
            questions: {type: DataTypes.TEXT, allowNull: false},
            success: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            // options
            tableName: "quiz"
        }
    );
};

module.exports = defineQuizModel;
