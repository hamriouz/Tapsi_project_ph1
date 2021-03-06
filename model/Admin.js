const bcrypt = require("bcryptjs");
const Token = require("../Token");
const SeeDetail = require("../controller/SeeDetail");
const ChangeDetail = require("../controller/ChangeDetail");
const {Registration} = require("../controller/Registration");
const User = require("./User")

class Admin extends User {
    constructor(email, password) {
        super(email, password);
    }

    static login(email, password) {
        const user = User.findObjectByKey("email", email);
        if (user && bcrypt.compare(password, user.password)) {
            user.token = Token.createToken(user, email)
        } else
            throw "Invalid Credentials!"
    }

/*    setAdminDetail(phoneNumber, name, familyName, department, organizationLevel, office, workingHour) {
        this.name = name;
        this.familyName = familyName;
        this.phoneNumber = phoneNumber;
        this.department = department;
        this.organizarionLevel = organizationLevel;
        this.office = office;
        this.workingHour = workingHour;
        this.role = "admin";
        this.status = "enable";
    }*/

    createEmployee(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status) {
        try {
            Registration.createEmployeeByAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status);
        } catch (e) {
            throw e;
        }
    }

    view_list_employees() {
        return SeeDetail.viewListEmployeeByAdmin(User.getAllUsers());
    }

    change_detail_employee(name, family_name, email, department, organization_level, office, working_hours, role, status) {
        try {

            ChangeDetail.changeDetailByAdmin(name, family_name, email, department, organization_level, office, working_hours, role, status);
        } catch (e) {
            throw e
        }
    }

    view_detail_one_employee(email) {
        try {
            return SeeDetail.viewDetailOneEmployeeByAdmin(email, User.findObjectByKey("email", email));
        } catch (e) {
            throw e
        }
    }

    enable_disable(email_address) {
        try {
            return ChangeDetail.changeStateByAdmin(email_address)
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Admin;
