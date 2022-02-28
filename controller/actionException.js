class ActionException{
    static signUpAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour){
        if (!(name && familyName && email && password && phoneNumber && department && organizationLevel && office && workingHour))
            throw ("please fill all the information");
    }

    static signUpEmployee(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status){
        if (!(name && familyName && email && password && phoneNumber && department && organizationLevel && office && workingHour && role && status))
            throw "please fill all the information";
    }

    static login(email, password){
        if (!(email && password))
            throw ("please fill all the information");
    }

    static emptyEmail(email){
        if (!(email))
            throw ("please fill all the information");
    }

    static emptyDepartment(department){
        if (!(department))
            throw ("please fill all the information");

    }
}

module.exports = ActionException;