// const User = require("../model/User");
const bcrypt = require("bcryptjs");
const Admin = require("../model/Admin");
class CreateAdmin {
    static createAdmin(user, name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour) {
        //check password
        if (user)
            throw "Admin has already been created";

        if (!checkPassword(password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        //hash the password and save it
        let encryptedPassword = bcrypt.hash(password, 10);

        //create new admin
        let admin = new Admin(email, encryptedPassword);
        admin.setAdminDetail(phoneNumber, name, familyName, department, organizationLevel, office, workingHour)
    }
}

function checkPassword(givenPassword) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return passwordRegex.test(givenPassword);
}


module.exports = CreateAdmin;