const defineUserModel = (sequelize, DataTypes) => {
	sequelize.define(
		"user",
		{
			ID: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			fullname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			level: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
			token: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			avatar: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			status: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
			city: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
			scm_token: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			lang: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
			country: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
		},
		{
			// options
		}
	);
};

module.exports = defineUserModel;
