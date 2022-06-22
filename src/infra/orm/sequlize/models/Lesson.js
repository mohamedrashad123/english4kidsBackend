/*jslint es6 */

const defineLessonModel = (sequelize, DataTypes) => {
    "use strict";
    sequelize.define(
        "lesson",
        {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            gradeId: {type: DataTypes.INTEGER(100), allowNull: false},
            unitId: {type: DataTypes.INTEGER(100), allowNull: false},
            title: {type: DataTypes.STRING(150), allowNull: false},
            description: {type: DataTypes.TEXT, allowNull: false},
            video: {type: DataTypes.STRING(150), allowNull: false},
            image: {type: DataTypes.STRING(150)},
            grammar_images: {type: DataTypes.STRING(200), allowNull: false},
            words_info: {type: DataTypes.TEXT("tiny")},
            words_images: {type: DataTypes.STRING(200), allowNull: false},
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

module.exports = defineLessonModel;
