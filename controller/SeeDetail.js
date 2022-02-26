const {User} = require("../model/User");

class SeeDetail {
    static viewListEmployeeByAdmin() {
        let allEmployee = {};
        for (let employee in User.getAllUsers()) {
            allEmployee[employee.id] = {
                "Name": employee.name,
                "Family name": employee.familyName,
                "Department": employee.department,
                "Office": employee.office
            }
        }
        return allEmployee;
    }

    static viewDetailOneEmployeeByAdmin(email) {
        let employee = User.findObjectByKey("email", email);
        let detail = {};
        if (employee !== null) {
            detail[email] = {
                "Name": employee.name,
                "Family name": employee.familyName,
                "Email": email,
                "Phone Number": employee.phoneNumber,
                "Department": employee.department,
                "Organization Level": employee.organizarionLevel,
                "Office": employee.office,
                "Working Hour": employee.workingHour,
                "Role": employee.role,
                "Status": employee.status
            }
            return detail;
        } else throw "employee with the given email address doesn't exist!"
    }

    static getAllEmployeeDepartmentByEmployee(department) {
        let allEmployees = {};
        let emails = [];
        let areThereAny = false;
        for (let i = 0; i < User.getAllUsers().length; i++) {
            if (User.getAllUsers()[i]["department"] === department) {
                emails.push(User.getAllUsers()[i]["email"]);
                areThereAny = true;
            }
        }
        allEmployees[department] = emails;
        if (!areThereAny)
            allEmployees = "there aren't any employees in the selected department"
        return allEmployees;
    }

    static workingHourByEmployee(email_address) {
        let workingHour = {};
        let wantedEmployee = User.findObjectByKey("email", email_address);
        if (wantedEmployee == null)
            throw "Employee with the given Email Address doesn't exist!"
        workingHour[email_address] = {
            "Working Hour": wantedEmployee.workingHour
        }
        return workingHour;
    }
}

module.exports = SeeDetail;
