class Exception {
    static get_status_by_Emessage(message) {
        switch (message) {
            case
            "please fill all the information"
            :
                return 400;
            case
            "کارمندی با ایمیل وارد شده وجود دارد!"
            :
                return 409;
            case
            "Your password should be at least 10 characters including alphabetic and numeric."
            :
                return 409;
            case
            "Admin has already been created"
            :
                return 409;
            case
            "Employee with the given Email Address doesn't exist!"
            :
                return 406;
            case
            "there aren't any employees in the given department!"
            :
                return 409;
            case
            "employee with the given email address doesn't exist!"
            :
                return 409;
        }
    }
}

module.exports = Exception;
