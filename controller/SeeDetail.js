const {User} = require("../model/User");

class SeeDetail{
    //TODO ALL THE FUNCTIONS ARE JUST COPIED! DEBUGGING NEEDED!!!!!!!!!!
    static viewListEmployeeByAdmin(user){
        if (user && user.role === "admin") {
            let all_employee = "";
            //TODO ALL USERS RO HANDLE KONAM KE ADD KONE TUSH
            for (let employee in all_users) {
                if (employee.status !== "admin") {
                    all_employee += employee.name + " " + employee.family_name + " : Department = " + employee.department +
                        " Office = " + employee.office + "\n";
                }
            }
            return all_employee;
        } else throw "Only a logged in admin can do this action!"
    }

    static viewDetailOneEmployeeByAdmin(user, email){
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
        } else throw "Only a logged in admin can do this action!"
    }

    static getAllEmployeeDepartmentByEmployee(user, department){
        if (user && user.role === "employee") {
            if (user.status === "disable")
                throw "Your account was disabled! You don't have the permission to take this action!";
            let all_employees = "";
            let are_there_any = false;
            for (let i = 0; i < User.getAllUsers().length; i++) {
                if (User.getAllUsers()[i]["department"] === department) {
                    all_employees += all_users[i]["email"] + "\n";
                    are_there_any = true;
                }
            }
            if (!are_there_any)
                throw "there aren't any employees in the given department!"

            return all_employees;
        }
        else throw "Only a logged in employee can do this action!"

    }

    static workingHourByEmployee(user, email_address){
        if (user && user.role === "employee") {
            if (user.status === "disable")
                throw "Your account was disabled! You don't have the permission to take this action!";
            let wanted_employee = User.findObjectByKey("email", email_address);
            if (wanted_employee == null)
                throw "Employee with the given Email Address doesn't exist!"
            return wanted_employee.working_hours;
        }
        else throw "Only a logged in employee can do this action!"
    }

}

module.exports = SeeDetail;
