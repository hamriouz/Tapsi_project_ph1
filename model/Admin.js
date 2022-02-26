const bcrypt = require("bcryptjs");
const User = require("./User");
const Token = require("../Token");
const SeeDetail = require("../controller/SeeDetail")
const ChangeDetail = require("../controller/ChangeDetail")
let haveAdmin = false;


class Admin extends User {
    constructor(email, password, phone_number, name, family_name, department, organization_level, office, working_hours, role, status) {
        super(email, password, phone_number, name, family_name, department, organization_level, office, working_hours, role, status);
    }

    static signUp(name, family_name, email, password, phone_number, department, organization_level, office, working_hours) {

        if (!(name && family_name && email && password && phone_number && department && organization_level && office && working_hours))
            throw new Error("please fill all the information");

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
        const user = new User(email, encryptedPassword, phone_number, name, family_name, department, organization_level, office, working_hours, "admin", "enable");
        haveAdmin = true;
    }

    static login(email, password) {
        if (!(email && password))
            throw "please fill all the information"

        const user = User.findObjectByKey("email", email);
        if (user && bcrypt.compare(password, user.password)) {
            user.token = Token.createToken(user, email)
        } else
            throw "Invalid Credentials!"
    }

    create_employee(user, name, family_name, email, password, phone_number, department, organization_level, office, working_hours, role, status) {
        if (user && user.role === "admin")
            User.signUp(name, family_name, email, password, phone_number, department, organization_level, office, working_hours, role, status);
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
