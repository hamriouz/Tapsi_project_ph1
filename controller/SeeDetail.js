const {User} = require("../model/User");

class SeeDetail {
    //TODO ALL THE FUNCTIONS ARE JUST COPIED! DEBUGGING NEEDED!!!!!!!!!!
    //TODO AGE THIS DARE PAK KONAM!
    static viewListEmployeeByAdmin() {
        let all_employee = "";
        for (let employee in User.getAllUsers()) {
            all_employee += employee.name + " " + employee.family_name + " : Department = " + employee.department +
                " Office = " + employee.office + "\n";
        }
        return all_employee;
    }

    static viewDetailOneEmployeeByAdmin(email) {
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

    static getAllEmployeeDepartmentByEmployee(department) {
        let all_employees = "";
        let are_there_any = false;
        for (let i = 0; i < User.getAllUsers().length; i++) {
            if (User.getAllUsers()[i]["department"] === department) {
                all_employees += User.getAllUsers()[i]["email"] + "\n";
                are_there_any = true;
            }
        }
        if (!are_there_any)
            all_employees = "there aren't any employees in the selected department"
        return all_employees;
    }

    static workingHourByEmployee(email_address) {
        let wanted_employee = User.findObjectByKey("email", email_address);
        if (wanted_employee == null)
            throw "Employee with the given Email Address doesn't exist!"
        return wanted_employee.working_hours;
    }

}

module.exports = SeeDetail;
