class User {
    constructor({ID, fullname, phone, gradeId, token, status, password}) {
        this.id = ID;
        this.fullname = fullname;
        this.phone = phone;
        this.gradeId = gradeId;
        this.token = token;
        this.status = status;
        this.password = password;
    }
}

module.exports = User;
