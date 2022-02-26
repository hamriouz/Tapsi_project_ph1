const bcrypt = require("bcryptjs");
const Token = require("../Token");
const ChangeDetail = require("../controller/ChangeDetail");
const Login = require("../controller/Login");
const Registration = require("../controller/Registration");
const SeeDetail = require("../controller/SeeDetail");

let all_emails = [];
let all_users = [];
// let haveAdmin = false;
let id = 1;


class User {

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
        this._id = id;
        id++;
        all_emails.push(email);
        all_users.push(this);
    }

    static doesEmailExist(email) {
        let isRepetitive = false;

        all_emails.forEach(checkFunction);

        function checkFunction(given_mail) {
            if (email === given_mail) {
                isRepetitive = true;
            }
        }

        return isRepetitive;
    }

/*    static checkPassword(given_password) {
        const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
        return password_regex.test(given_password);
    }*/


    static findObjectByKey(key, value) {
        for (let i = 0; i < all_users.length; i++) {
            if (all_users[i][key] === value) {
                return all_users[i];
            }
        }
        return null;
    }

    static signUp(name, family_name, email, password, phone_number, department, organization_level, office, working_hours, role, status) {
        if (!(name && family_name && email && password && phone_number && department && organization_level && office && working_hours && role && status))
            throw "please fill all the information"

        const repetitiveUser = User.doesEmailExist(email);

        //if user already exists:
        if (repetitiveUser) {
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

    static login(email, password) {

        if (!(email && password))
            throw "please fill all the information"

        const user = User.findObjectByKey("email", email);
        if (user && bcrypt.compare(password, user.password)) {
            if (user.status === "disable")
                throw "Your account was disabled! You don't have the permission to log in!"
            user.token = Token.createToken(user, email)
        } else
            throw "Invalid Credentials!"
    }

    change_detail(name, family_name, working_hour) {
        ChangeDetail.changeDetailByEmployee(name, family_name, working_hour);
    }

    get_all_employee(department) {
        try {
            return SeeDetail.getAllEmployeeDepartmentByEmployee(department);
        }catch (exception){
            throw exception;
        }
    }

    see_working_hour(email_address) {
        return SeeDetail.workingHourByEmployee(email_address);
    }

    static getAllUsers(){
        return all_users;
    }


}

/*class Admin extends User {
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
        if (!checkPassword(password)) {
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
            user.token = createToken(user, email)
        } else
            throw "Invalid Credentials!"
    }

    create_employee(user, name, family_name, email, password, phone_number, department, organization_level, office, working_hours, role, status) {
        if (user && user.role === "admin")
        User.signUp(name, family_name, email, password, phone_number, department, organization_level, office, working_hours, role, status);
        else throw "Only a logged in admin can create an employee!"
    }

    view_list_employees(user) {
        if (user && user.role === "admin") {
            let all_employee = "";
            for (let employee in all_users) {
                if (employee.status !== "admin") {
                    all_employee += employee.name + " " + employee.family_name + " : Department = " + employee.department +
                        " Office = " + employee.office + "\n";
                }
            }
            return all_employee;
        }
        else throw "Only a logged in admin can do this action!"
    }

    change_detail_employee(user, name, family_name, email, department, organization_level, office, working_hours, role, status) {
        if (user && user. role === "admin") {
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
        }
        else throw "Only a logged in admin can do this action!"
    }

    view_detail_one_employee(user, email) {
        if (user && user.role === "admin") {
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
        }
        else throw "Only a logged in admin can do this action!"
    }

    enable_disable(user, email_address) {
        if (user && user.role === "admin") {
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
        }
        else throw "Only a logged in admin can do this action!"
    }

}*/

function checkPassword(given_password) {
    const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return password_regex.test(given_password);
}

function findObjectByKey(key, value) {
    for (let i = 0; i < all_users.length; i++) {
        if (all_users[i][key] === value) {
            return all_users[i];
        }
    }
    return null;
}


module.exports = {checkPassword, User, findObjectByKey};





/*valid input:
#sign up employee->
{
	"name": "hg",
	"family_name": "sds",
	"email": "huuuj@s.com",
	"password": "jjj111iiiiii11",
	"phone_number": 987665,
	"department": "jjjj",
	"organization_level": "as",
	"office": "jjjjjjjj",
	"working_hours": "9-10",
	"role": "employee",
	"status": "bhjbhjb"
}
 */