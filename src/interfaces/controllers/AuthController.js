const {createUser, getUser} = require("../../application/use_cases/users");
const UserRepositry = require("../../infra/repositories/UserRepositry");
const Controller = require("../../utils/Controller");
const Methods = require("../../utils/endpointMethods");

class AuthContrller extends Controller {
    #userRepositry;
    path = "/";
    routes = [
        {
            path: "login",
            method: Methods.POST,
            handler: (req, res) => this.handleLogin(req, res),
            localMiddleware: []
        },
        {
            path: "register",
            method: Methods.POST,
            handler: (req, res) => this.handleRegister(req, res),
            localMiddleware: []
        }
    ];

    constructor(tokenHandler) {
        super();
        this.tokenHandler = tokenHandler;
        this.#userRepositry = new UserRepositry(this.tokenHandler);
    }

    handleLogin = async (req, res) => {
        try {
            const {phone, password} = req.fields;
            const user =
                (await getUser(phone, password, {
                    userRepositry: this.#userRepositry
                })) || null;

            this.sendSuccess(res, {statusCode: 200, user}, "success");
        } catch (err) {
            console.log(err);
            this.sendError(res, err.message);
        }
    };

    handleRegister = async (req, res) => {
        try {
            const {fullname, phone, gradeId, password} = req.fields;
            const user = await createUser(fullname, phone, password, gradeId, {
                userRepository: this.#userRepositry
            });

            this.sendSuccess(res, user, "success");
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = AuthContrller;
