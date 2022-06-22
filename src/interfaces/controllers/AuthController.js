const { createUser } = require("../../application/use_cases/users");
const UserRepositry = require("../../infra/repositories/UserRepositry");
const Controller = require("../../utils/Controller");
const Methods = require("../../utils/endpointMethods");

class AuthContrller extends Controller {
	path = "/";
	routes = [
		{
			path: "/login",
			method: Methods.POST,
			handler: (req, res) => this.handleLogin(req, res),
			localMiddleware: [],
		},
		{
			path: "/register",
			method: Methods.POST,
			handler: (req, res) => this.handleRegister(req, res),
			localMiddleware: [],
		},
	];

	constructor(tokenHandler) {
		super();
		this.tokenHandler = tokenHandler;
	}

	handleLogin = async (req, res) => {
		try {
			const token = req.headers["authorization"];
			const userId = await this.tokenHandler.verifyToken(token);
			this.sendSuccess(res, { name: "mohamed", ID: userId }, "hello");
		} catch (err) {
			console.log(err);
		}
	};

	handleRegister = async (req, res) => {
		try {
			const userRepository = new UserRepositry(this.tokenHandler);
			const { fullname, phone, avatar, password } = req.fields;
			const user = await createUser(fullname, phone, avatar, password, {
				userRepository,
			});
			// this.tokenHandler.payload = { ID: Math.floor(Math.random() * 500) };

			// const token = await this.tokenHandler.generateToken();
			this.sendSuccess(res, user, "success");
		} catch (err) {
			console.log(err);
		}
	};
}

module.exports = AuthContrller;
