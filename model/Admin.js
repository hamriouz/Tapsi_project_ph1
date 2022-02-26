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

    view_list_employees(user) {
        SeeDetail.viewListEmployeeByAdmin(user);
/*        if (user && user.role === "admin") {
            let all_employee = "";
            //TODO ALL USERS RO HANDLE KONAM KE ADD KONE TUSH
            for (let employee in all_users) {
                if (employee.status !== "admin") {
                    all_employee += employee.name + " " + employee.family_name + " : Department = " + employee.department +
                        " Office = " + employee.office + "\n";
                }
            }
            return all_employee;
        } else throw "Only a logged in admin can do this action!"*/
    }

    change_detail_employee(user, name, family_name, email, department, organization_level, office, working_hours, role, status) {
        ChangeDetail.changeDetailByAdmin(user, name, family_name, email, department, organization_level, office, working_hours, role, status);
        /*        if (user && user.role === "admin") {
            let employee = User.findObjectByKey("email", email);
            if (employee !== null) {
                if (name)
                    employee.name = name;
                if (family_name)
                    employee.family_name = family_name;
                if (department)
                    employee.department = department;
                if (organization_level)
                    employee.organization_level = organization_level;
                if (office)
                    employee.office = office;
                if (working_hours)
                    employee.working_hours = working_hours;
                if (role)
                    employee.role = role;
                if (status)
                    employee.status = status;
            } else throw "Employee with the given Email Address doesn't exist!";
        } else throw "Only a logged in admin can do this action!"*/
    }

    view_detail_one_employee(user, email) {
        SeeDetail.viewDetailOneEmployeeByAdmin(user, email);
/*        if (user && user.role === "admin") {
            if (!email)
                throw "please fill all the information"
            let employee = User.findObjectByKey("email", email);
            if (employee !== null) {
                return "Name : " + employee.name + "\n" +
                    "Family name : " + employee.family_name + "\n" +
                    "Email :" + email + "\n" +
                    "Phone number : " + employee.phone_number + "\n" +
                    "Department : " + employee.department + "\n" +
                    "Organization Level : " + employee.organization_level + "\n" +
                    "Office : " + employee.office + "\n" +
                    "Working Hours : " + employee.working_hours + "\n" +
                    "Role : " + employee.role + "\n" +
                    "Active / Not Active : " + employee.status;
            } else throw "employee with the given email address doesn't exist!"
        } else throw "Only a logged in admin can do this action!"*/
    }

    enable_disable(user, email_address) {
        ChangeDetail.changeStateByAdmin(user, email_address)
/*        if (user && user.role === "admin") {
            let enOrDis;
            let employee = User.findObjectByKey("email", email_address);
            if (employee !== null) {
                if (employee.status === "enable") {
                    enOrDis = "disabled";
                    employee.status = "disable"
                } else {
                    enOrDis = "enabled";
                    employee.status = "enable";
                }
                return enOrDis;
            } else throw "employee with the given email address doesn't exist!"
        } else throw "Only a logged in admin can do this action!"*/
    }

}

module.exports = Admin;
