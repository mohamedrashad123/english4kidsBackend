const defineUserModel = (sequelize, DataTypes) => {
    sequelize.define(
        "user",
        {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            gradeId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            fullname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "active"
            }
        },
        {
            // options
        }
    );
};

module.exports = defineUserModel;
