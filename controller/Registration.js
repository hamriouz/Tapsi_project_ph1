const bcrypt = require("bcryptjs");
const User = require("../model/User");
// const {Admin} = require("../model/Admin");
// const {checkPassword} = require("../model/User");

class Registration {
    static  createAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, haveAdmin) {
        //check password
        // if (haveAdmin)
        if (User.findObjectByKey("role", "admin"))
            throw "Admin has already been created";

        if (!checkPassword(password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        //hash the password and save it
        let encryptedPassword = bcrypt.hash(password, 10);

        //create new admin
        /*        const admin = new Admin(email, encryptedPassword);
                admin.setAdminDetail(phoneNumber, name, familyName, department, organizationLevel, office, workingHour)*/
        let admin = new User(email, encryptedPassword);
        admin.setAdminDetail(phoneNumber, name, familyName, department, organizationLevel, office, workingHour)
    }

    static createEmployeeByAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status) {
        const repetitiveUser = User.doesEmailExist(email);

        if (repetitiveUser)
            throw "کارمندی با ایمیل وارد شده وجود دارد!"

        if (!checkPassword(password))
            throw "Your password should be at least 10 characters including alphabetic and numeric.";

        let encryptedPassword = bcrypt.hash(password, 10);
        const employee = new User(email, encryptedPassword);
        employee.setEmployeeDetail(phoneNumber, name, familyName, department, organizationLevel, office, workingHour, role, status)
    }
}

function checkPassword(givenPassword) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return passwordRegex.test(givenPassword);
}


module.exports = {Registration, checkPassword};