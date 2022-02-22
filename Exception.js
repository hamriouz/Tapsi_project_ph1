class Exception {
    static get_status_by_Emessage(message) {
        switch (message) {
            case
            "please fill all the information"
            :
            case
            "Only a logged in admin can create an employee!"
            :
                return 400;
            case
            "Invalid Credentials!"
            :
            case
            "Access denied! Please login!"
            :
                return 401;
            case
            "Employee with the given Email Address doesn't exist!"
            :
                return 406;
            case
            "there aren't any employees in the given department!"
            :
            case
            "کارمندی با ایمیل وارد شده وجود دارد!"
            :
            case
            "Your password should be at least 10 characters including alphabetic and numeric."
            :
            case
            "Admin has already been created"
            :
            case
            "employee with the given email address doesn't exist!"
            :
                return 409;
        }
    }
}

module.exports = Exception;
