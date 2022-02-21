const bcrypt = require("bcryptjs");
const express = require("express");

let all_emails = [];
let all_users = [];
let haveAdmin = false;



class User{
/*    name;
    family_name;
    email;
    password;
    phone_number;
    department;
    organization_level;
    office;
    working_hours;
    role;
    status;
    token;*/

    constructor(email, password, phone_number, name, family_name, department, organization_level, office, working_hours, role, status) {
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
        this.name = name;
        this.family_name = family_name;
        this.department = department;
        this.organization_level = organization_level;
        this.office = office;
        this.working_hours = working_hours;
        this.role = role;
        this.status = status;
        all_emails.push(email);
        all_users.push(this);
    }

    static doesEmailExist(email) {
        let isRepetitive = false;

        all_emails.forEach(checkFunction);
        function checkFunction(given_mail){
            if (email === given_mail) {
                isRepetitive = true;
            }
        }

        return isRepetitive;
    }

    static findObjectByKey(key, value) {
        for (let i = 0; i < all_users.length; i++) {
            if (all_users[i][key] === value) {
                return all_users[i];
            }
        }
        return null;
    }

    static signUp(name, family_name, email, password, phone_number, department, organization_level, office, working_hours, role, status){
        if (!(name && family_name && email && password && phone_number && department && organization_level && office && working_hours && role && status))
            throw "please fill all the information"

        const repetitiveUser = User.doesEmailExist(email);

        //if user already exists:
        if (repetitiveUser){
            throw "کارمندی با ایمیل وارد شده وجود دارد!"
        }
        //check the password
        if (!checkPassword(password)) {
            throw "Your password should be at least 10 characters including alphabetic and numeric.";
        }

        //hash the password and save it
        let encryptedPassword = bcrypt.hash(password, 10);

        const user = new User(email, encryptedPassword, phone_number, name, family_name, department, organization_level, office, working_hours, "admin", "enable");
    }

    //TODO
    static login(email, password){

    }
    //TODO
    change_detail(name, family_name, working_hour){

    }

    get_all_employee(department){
        let all_employees;
        let are_there_any = false;
        for (let i = 0; i < all_users.length; i++) {
            if (all_users[i]["department"] === department) {
                all_employees += all_users[i]["email"] + "\n";
                are_there_any = true;
            }
        }
        if (!are_there_any)
            throw "there aren't any employees in the given department!"

        return all_employees;
    }
    see_working_hour(email_address){
       let wanted_employee = User.findObjectByKey("email_address", email_address);
       if (wanted_employee == null)
           throw "Employee with the given Email Address doesn't exist!"
       return wanted_employee.working_hours;
    }
}

class Admin extends User{
    constructor(email, password, phone_number, name, family_name, department, organization_level, office, working_hours, role, status) {
        super(email, password, phone_number, name, family_name, department, organization_level, office, working_hours, role, status);
    }

    static signUp(name, family_name, email, password, phone_number, department, organization_level, office, working_hours) {

        if (!(name && family_name && email && password && phone_number && department && organization_level && office && working_hours))
            throw "please fill all the information";

        //if admin was already created:
        if (haveAdmin) {
            throw "Admin has already been created";
        }
        //check password
        if (!checkPassword(password)) {
            throw "Your password should be at least 10 characters including alphabetic and numeric.";
        }

        //hash the password and save it
        let encryptedPassword = bcrypt.hash(password, 10);

        //create new admin
        const user = new User(email, encryptedPassword, phone_number, name, family_name, department, organization_level, office, working_hours, "admin", "enable");
        haveAdmin = true;
    }

    //TODO
    static login(email, password){

    }

    static create_employee(name, family_name, email, password, phone_number, department, organization_level, office, working_hours, role, status){
        User.signUp(name, family_name, email, password, phone_number, department, organization_level, office, working_hours, role, status);

    }

    static view_list_employees(){
        let all_employee = "";
        for (let employee in all_users){
            if (employee.status !== "admin"){
                all_employee += employee.name + " " + employee.family_name + " : Department = " + employee.department +
                    " Office = " + employee.office + "\n";
            }
        }
        return all_employee;
    }
    //TODO
    static change_detail_employee(){

    }
    //TODO age login bud karaye lazem ro anjam bede!
    static enable_disable(email_address){
        let enOrDis;
        let employee = User.findObjectByKey("email_address", email_address);
        if (employee !== null) {
            if (employee.status === "enable") {
                enOrDis = "disabled";
                employee.status = "disable"
            } else {
                enOrDis = "enabled";
                employee.status = "enable";
            }
            return enOrDis;
        }
        else throw "employee with the given email address doesn't exist!"
    }


}

function checkPassword(given_password) {
    const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return password_regex.test(given_password);}

module.exports = User;
module.exports = Admin;