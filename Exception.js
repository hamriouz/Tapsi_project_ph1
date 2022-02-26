class Exception {
    static getStatusByExceptionMessage(message) {
        switch (message) {
            case
            "please fill all the information"
            :
            case
            "Only a logged in admin can create an employee!"
            :
            case
            "Only a logged in employee can do this action!"
            :
            case
            "Only a logged in admin can do this action!"
            :
                return 400;
            case
            "Invalid Credentials!"
            :
            case
            "Access denied! Please login!"
            :
            case
            "Your account was disabled! You don't have the permission to log in!"
            :
            case
            "Your account was disabled! You don't have the permission to take this action!"
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
