const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config();
class TokenHandler {
	#secretKey;
	#options;

	constructor(payload, options) {
		this.#secretKey = process.env.SECRET_KEY;
		this.#options = options || {};
		this.payload = payload;
	}

	generateToken = async () => {
		const token = await jwt.sign(this.payload, this.#secretKey, this.#options);

		return token;
	};

	verifyToken = async (token) => {
		const { ID } = await jwt.verify(token, this.#secretKey);

		return ID;
	};
}

module.exports = TokenHandler;
