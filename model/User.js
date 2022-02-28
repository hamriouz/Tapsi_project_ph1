const bcrypt = require("bcryptjs");
const Token = require("../Token");
const ChangeDetail = require("../controller/ChangeDetail");
const SeeDetail = require("../controller/SeeDetail");
const e = require("express");

let allEmails = [];
let allUsers = [];
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

    static removeAllUsers(){
        allUsers.length = 0;
        allEmails.length = 0;
    }

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

    static findObjectByKey(key, value) {
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i][key] === value) {
                return allUsers[i];
            }
        }
        return null;
    }

    static login(email, password) {
        const user = User.findObjectByKey("email", email);
        if (user && bcrypt.compare(password, user.password)) {
            if (user.status === "disable")
                throw "Your account was disabled! You don't have the permission to log in!"
            user.token = Token.createToken(user, email)
        } else
            throw "Invalid Credentials!"
    }

    static getAllUsers() {
        return allUsers;
    }

    setEmployeeDetail(phoneNumber, name, familyName, department, organizationLevel, office, workingHour,role, status){
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.familyName = familyName;
        this.department = department;
        this.organizationLevel = organizationLevel;
        this.office = office;
        this.workingHour = workingHour;
        this.role = "employee";
        this.status = status;
    }

    setAdminDetail(phoneNumber, name, familyName, department, organizationLevel, office, workingHour) {
        this.name = name;
        this.familyName = familyName;
        this.phoneNumber = phoneNumber;
        this.department = department;
        this.organizationLevel = organizationLevel;
        this.office = office;
        this.workingHour = workingHour;
        this.role = "admin";
        this.status = "enable";
    }

    change_detail(employee, name, familyName, workingHour) {
        ChangeDetail.changeDetailByEmployee(employee, name, familyName, workingHour);
    }

    get_all_employee(department) {
        return SeeDetail.getAllEmployeeDepartmentByEmployee(department, allUsers);
    }

    see_working_hour(email_address) {
        let user = User.findObjectByKey("email", email_address)
        if (!user)
            throw "Employee with the given Email Address doesn't exist!"
        return SeeDetail.workingHourByEmployee(user);
    }

}

module.exports = User;


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

/* get all user return format:
 [ User {
        email: 'a',
        password: Promise { <pending> },
        _id: 1,
        phoneNumber: 'a',
        name: 'a',
        familyName: 'a',
        department: 'a',
        organizarionLevel: 'a',
        office: 'a',
        workingHour: 'a',
        role: 'employee',
        status: 'a' },
      User {
        email: 'aa',
        password: Promise { <pending> },
        _id: 2,
        phoneNumber: 'a',
        name: 'a',
        familyName: 'a',
        department: 'a',
        organizarionLevel: 'a',
        office: 'a',
        workingHour: 'a',
        role: 'employee',
        status: 'a' } ]

 */