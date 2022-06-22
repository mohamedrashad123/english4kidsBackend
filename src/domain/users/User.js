class User {
	constructor(ID, fullname, phone, avatar, token, status, password) {
		this.ID = ID;
		this.fullname = fullname;
		this.phone = phone;
		this.avatar = avatar;
		this.token = token;
		this.status = status;
		this.password = password;
	}
}

module.exports = User;
