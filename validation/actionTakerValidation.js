class ActionTakerValidation {
    static validateAdmin(user) {
        if (!(user) || user.role !== "admin")
            throw "Only a logged in admin can do this action!"
    }

    static validateEmployee(user) {
        if (!(user) || user.role !== "employee")
            throw "Only a logged in employee can do this action!"
        if (user.status === "disable")
            throw "Your account was disabled! You don't have the permission to take this action!";

    }
}

module.exports = ActionTakerValidation;