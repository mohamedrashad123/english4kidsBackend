const User = require("../../../domain/users/User");

const createUser = (fullname, phone, avatar, password, { userRepository }) => {
	const user = new User(null, fullname, phone, avatar, null, null, password);
	return userRepository.persist(user);
};

module.exports = createUser;
