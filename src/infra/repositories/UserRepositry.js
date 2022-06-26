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
        const {fullname, phone, password, gradeId} = userEntity;

        // create user on database
        const userData = await this.#model.create({
            fullname,
            phone,
            password,
            gradeId
        });

        // save user
        userData.save();

        // generate token
        const token = await new this.#tokenHandler({
            ID: userData.ID
        }).generateToken();

        // return user data
        return new User({
            ID: userData.ID,
            fullname: userData.fullname,
            phone: userData.phone,
            gradeId: userData.gradeId,
            token
        });
    };

    async getUser(phone, password) {
        const user = await this.#model.findOne({
            attributes: ["ID", "fullName", "gradeId", "phone"],
            where: {phone, password}
        });

        // generate token
        const token = await new this.#tokenHandler({
            ID: user?.ID
        }).generateToken();

        // return user data
        return new User({
            ID: user.ID,
            fullname: user.fullname,
            phone: user.phone,
            gradeId: user.gradeId,
            token
        });
    }
};
