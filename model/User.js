
const bcrypt = require("bcryptjs");
const Token = require("../Token");
const ChangeDetail = require("../controller/ChangeDetail");
const Login = require("../controller/Login");
const Registration = require("../controller/Registration");
const SeeDetail = require("../controller/SeeDetail");

let allEmails = [];
let allUsers = [];
let haveAdmin = false;
let id = 1;


class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this._id = id;
        id++;
        allEmails.push(email);
        allUsers.push(this);
    }

    /*
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
        allEmails.push(email);
        allUsers.push(this);
    }*/

    static addToAllUsers(user){
        allUsers.push(user)
    }

    static addToEmail(email){
        allEmails.push(email)
    }

    static createAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour) {
        //if admin was already created:
        if (haveAdmin)
            throw "Admin has already been created";
        try {
            Registration.createAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour);
            haveAdmin = true;
        } catch (e) {
            throw e;
        }
    }

    // static setId(){
    // }
    static doesEmailExist(email) {
        let isRepetitive = false;

        allEmails.forEach(checkFunction);

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
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i][key] === value) {
                return allUsers[i];
            }
        }
        return null;
    }

    static signUp(name,
                  familyName,
                  email,
                  password,
                  phoneNumber,
                  department,
                  organizationLevel,
                  office,
                  workingHour,
                  role,
                  status) {

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

        const user = new User(email,
            encryptedPassword,
            phoneNumber,
            name,
            familyName,
            department,
            organizationLevel,
            office,
            workingHour,
            role,
            status);
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

    setEmployeeDetail(phoneNumber, name, familyName, department, organizationLevel, office, workingHour, status){
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.familyName = familyName;
        this.department = department;
        this.organizarionLevel = organizationLevel;
        this.office = office;
        this.workingHour = workingHour;
        this.role = "employee";
        this.status = status;
    }

    change_detail(employee, name, familyName, workingHour) {
        ChangeDetail.changeDetailByEmployee(employee, name, familyName, workingHour);
    }

    get_all_employee(department) {
        return SeeDetail.getAllEmployeeDepartmentByEmployee(department);
    }

    see_working_hour(email_address) {
        return SeeDetail.workingHourByEmployee(email_address);
    }

    static getAllUsers() {
        return allUsers;
    }


}

function checkPassword(givenPassword) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return passwordRegex.test(givenPassword);
}

function findObjectByKey(key, value) {
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i][key] === value) {
            return allUsers[i];
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