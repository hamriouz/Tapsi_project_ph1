class ActionException{
    static signUpAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, haveAdmin){
        if (!(name && familyName && email && password && phoneNumber && department && organizationLevel && office && workingHour))
            throw new Error("please fill all the information");
        if (haveAdmin)
            throw "Admin has already been created";
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