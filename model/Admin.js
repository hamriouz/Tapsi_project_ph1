const bcrypt = require("bcryptjs");
const Token = require("../Token");
const SeeDetail = require("../controller/SeeDetail")
const ChangeDetail = require("../controller/ChangeDetail")
const {User} = require("./User");
let haveAdmin = false;


class Admin extends User {
    constructor(email, password) {
        super(email, password);
    }

/*    constructor(email, password, phone_number, name, family_name, department, organization_level, office, working_hours, role, status) {
        super(email, password, phone_number, name, family_name, department, organization_level, office, working_hours, role, status);
    }*/

    static signUp(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour) {
        //if admin was already created:
        if (haveAdmin) {
            throw "Admin has already been created";
        }
        //check password
        if (!Admin.checkPassword(password)) {
            throw "Your password should be at least 10 characters including alphabetic and numeric.";
        }

        //hash the password and save it
        let encryptedPassword = bcrypt.hash(password, 10);

        //create new admin
        const user = new User(email, encryptedPassword, phoneNumber, name, familyName, department, organizationLevel, office, workingHour, "admin", "enable");
        haveAdmin = true;
    }

    static login(email, password) {
        const user = User.findObjectByKey("email", email);
        if (user && bcrypt.compare(password, user.password)) {
            user.token = Token.createToken(user, email)
        } else
            throw "Invalid Credentials!"
    }

    setAdminDetail(phoneNumber, name, familyName, department, organizationLevel, office, workingHour, status){
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

    createEmployee(user, name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status) {
        if (user && user.role === "admin")
            User.signUp(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status);
        else throw "Only a logged in admin can create an employee!"
    }

    view_list_employees() {
        return SeeDetail.viewListEmployeeByAdmin();
    }

    change_detail_employee(name, family_name, email, department, organization_level, office, working_hours, role, status) {
        try {
            ChangeDetail.changeDetailByAdmin(name, family_name, email, department, organization_level, office, working_hours, role, status);
        }catch (e){
            throw e
        }
    }

    view_detail_one_employee(email) {
        try {
            return SeeDetail.viewDetailOneEmployeeByAdmin(email);
        }
        catch (e){
            throw e
        }
    }

    enable_disable(email_address) {
        try {
            return ChangeDetail.changeStateByAdmin(email_address)
        }
        catch (error){
            throw error;
        }
    }

}

module.exports = Admin;
