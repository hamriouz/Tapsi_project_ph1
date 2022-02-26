const {User} = require("../model/User");

class SeeDetail {
    static viewListEmployeeByAdmin() {
        let allEmployee = "";
        for (let employee in User.getAllUsers()) {
            allEmployee += employee.name + " " + employee.familyName + " : Department = " + employee.department +
                " Office = " + employee.office + "\n";
        }
        return allEmployee;
    }

    static viewDetailOneEmployeeByAdmin(email) {
        let employee = User.findObjectByKey("email", email);
        if (employee !== null) {
            return "Name : " + employee.name + "\n" +
                "Family name : " + employee.familyName + "\n" +
                "Email :" + email + "\n" +
                "Phone number : " + employee.phoneNumber + "\n" +
                "Department : " + employee.department + "\n" +
                "Organization Level : " + employee.organizarionLevel + "\n" +
                "Office : " + employee.office + "\n" +
                "Working Hours : " + employee.workingHour + "\n" +
                "Role : " + employee.role + "\n" +
                "Active / Not Active : " + employee.status;
        } else throw "employee with the given email address doesn't exist!"
    }

    static getAllEmployeeDepartmentByEmployee(department) {
        let allEmployees = "";
        let areThereAny = false;
        for (let i = 0; i < User.getAllUsers().length; i++) {
            if (User.getAllUsers()[i]["department"] === department) {
                allEmployees += User.getAllUsers()[i]["email"] + "\n";
                areThereAny = true;
            }
        }
        if (!areThereAny)
            allEmployees = "there aren't any employees in the selected department"
        return allEmployees;
    }

    static workingHourByEmployee(email_address) {
        let wantedEmployee = User.findObjectByKey("email", email_address);
        if (wantedEmployee == null)
            throw "Employee with the given Email Address doesn't exist!"
        return wantedEmployee.workingHour;
    }
}

module.exports = SeeDetail;
