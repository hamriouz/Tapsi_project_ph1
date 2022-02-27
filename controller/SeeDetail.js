const User = require("../model/User");

class SeeDetail {
    static viewListEmployeeByAdmin(allUsers) {
        let allEmployee = {};
        for (let employee in allUsers) {
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
                "Organization Level": employee.organizationLevel,
                "Office": employee.office,
                "Working Hour": employee.workingHour,
                "Role": employee.role,
                "Status": employee.status
            }
            return detail;
        } else throw "employee with the given email address doesn't exist!"
    }

    static getAllEmployeeDepartmentByEmployee(department, allUsers) {
        let allEmployees = {};
        let emails = [];
        let areThereAny = false;
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i]["department"] === department) {
                emails.push(allUsers[i]["email"]);
                areThereAny = true;
            }
        }
        allEmployees[department] = emails;
        if (!areThereAny)
            allEmployees = "there aren't any employees in the selected department"
        return allEmployees;
    }

    static workingHourByEmployee(wantedEmployee) {
        let workingHour = {};
        workingHour[wantedEmployee.email] = {
            "Working Hour": wantedEmployee.workingHour
        }
        return workingHour;
    }
}

module.exports = SeeDetail;
