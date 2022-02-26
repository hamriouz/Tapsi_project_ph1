const bcrypt = require("bcryptjs");
const Token = require("../Token");
const SeeDetail = require("../controller/SeeDetail")
const ChangeDetail = require("../controller/ChangeDetail")
const {User} = require("./User");
const Registration = require("../controller/Registration")


class Admin extends User {
    constructor(email, password) {
        super(email, password);
    }

    /*    constructor(email, password, phone_number, name, family_name, department, organization_level, office, working_hours, role, status) {
            super(email, password, phone_number, name, family_name, department, organization_level, office, working_hours, role, status);
        }*/

    static login(email, password) {
        const user = User.findObjectByKey("email", email);
        if (user && bcrypt.compare(password, user.password)) {
            user.token = Token.createToken(user, email)
        } else
            throw "Invalid Credentials!"
    }

    setAdminDetail(phoneNumber, name, familyName, department, organizationLevel, office, workingHour) {
        this.name = name;
        this.familyName = familyName;
        this.phoneNumber = phoneNumber;
        this.department = department;
        this.organizarionLevel = organizationLevel;
        this.office = office;
        this.workingHour = workingHour;
        this.role = "admin";
        this.status = "enable";
    }

    createEmployee(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status) {
        try {
            Registration.createEmployeeByAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status);
        } catch (e) {
            throw e;
        }
        User.signUp(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status);
    }

    view_list_employees() {
        return SeeDetail.viewListEmployeeByAdmin();
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
            return SeeDetail.viewDetailOneEmployeeByAdmin(email);
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
