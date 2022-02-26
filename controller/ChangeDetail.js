const User = require("../model/User")

class ChangeDetail {
    static changeDetailByEmployee(employee, name, family_name, working_hour) {
        if (name)
            employee.name = name;
        if (family_name)
            employee.family_name = family_name;
        if (working_hour)
            employee.working_hours = working_hour;
    }

    static changeDetailByAdmin(name, family_name, email, department, organization_level, office, working_hours, role, status) {
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

    static changeStateByAdmin(emailAddress) {
        let enOrDis;
        let employee = User.findObjectByKey("email", emailAddress);
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
}

module.exports = ChangeDetail;