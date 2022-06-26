const User = require("../../../domain/users/User");

const createUser = (fullname, phone, password, gradeId, {userRepository}) => {
    const user = new User({fullname, phone, gradeId, password});
    return userRepository.persist(user);
};

module.exports = createUser;
