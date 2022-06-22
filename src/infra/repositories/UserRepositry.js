const User = require("../../domain/users/User");
const UserRepositry = require("../../domain/users/userRepositry");
const sequelize = require("../orm/sequlize");

module.exports = class extends UserRepositry {
	#db;
	#model;
	#tokenHandler;
	constructor(tokenHandler) {
		super();
		this.#db = sequelize;
		this.#model = this.#db.model("user");
		this.#tokenHandler = tokenHandler;
	}

	persist = async (userEntity) => {
		const { fullname, phone, avatar, password } = userEntity;

		// create user on database
		const userData = await this.#model.create({
			fullname,
			phone,
			avatar,
			password,
		});

		// save user
		userData.save();

		// generate token
		const token = await new this.#tokenHandler({
			ID: userData.ID,
		}).generateToken();

		// return user data
		return new User(userData.ID, userData.fullname, userData.phone, userData.avatar, token);
	};

	getIdByToken = async (token) => {
		return await this.#model.findOne({ where: { token }, attributes: ["ID"] });
	};
};
