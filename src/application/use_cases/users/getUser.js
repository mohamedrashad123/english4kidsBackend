const getUser = async (phone, password, {userRepositry}) => {
    return (await userRepositry.getUser(phone, password)) || null;
};

module.exports = getUser;
