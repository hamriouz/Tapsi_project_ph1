class ChangeDetail{
    //TODO EVERYTHING WAS COPIED! DEBUG!!!!!!!1

    static changeDetailByEmployee(user, name, family_name, working_hour){

        if (user && user.role === "employee") {
            if (user.status === "disable")
                throw "Your account was disabled! You don't have the permission to take this action!";
            if (name)
                this.name = name;
            if (family_name)
                this.family_name = family_name;
            if (working_hour)
                this.working_hours = working_hour;
        }
        else throw "Only a logged in employee can do this action!"
    }

    static changeDetailByAdmin(user, name, family_name, email, department, organization_level, office, working_hours, role, status){
        if (user && user.role === "admin") {
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
        } else throw "Only a logged in admin can do this action!"
    }

    static changeStateByAdmin(user, email_address){
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
        } else throw "Only a logged in admin can do this action!"

    }
}

module.exports = ChangeDetail;