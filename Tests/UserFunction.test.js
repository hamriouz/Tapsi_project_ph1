const User = require("../model/User");
const {Registration} = require("../controller/Registration");

test("remove all users", () => {
    Registration.createEmployeeByAdmin("a","a","a","aaaaaaaaaaaaaaaaaaa111","a","a","a","a","a","a","a")
    Registration.createEmployeeByAdmin("a","a","aa","aqqqqqqqqqqqqqqqqqqqqqqq11","a","a","a","a","a","a","a")
    User.removeAllUsers()
    expect(User.findObjectByKey("email", "a")).toBeNull();
})

//TODO test login?

test("change detail", () => {
    Registration.createEmployeeByAdmin("a","a","a","123456789a","a","a","a","a","a","a","a")
    let user = User.findObjectByKey("email", "a");
    user.change_detail(user, "kkkk", "", "")
    expect(user.name).toBe("kkkk");
    User.removeAllUsers()
})

test("get all employees from a department", () => {
    Registration.createEmployeeByAdmin("a","a","a","123456789a","a","dep","a","a","9-16","a","a")
    Registration.createEmployeeByAdmin("a","a","aa","123456789a","a","dep","a","a","9-16","a","a")
    Registration.createEmployeeByAdmin("a","a","aaa","123456789a","a","dep","a","a","9-16","a","a")
    Registration.createEmployeeByAdmin("a","a","aaaa","123456789a","a","depart","a","a","9-16","a","a")
    let user = User.findObjectByKey("email", "a");
    expect(user.get_all_employee("dep")).toStrictEqual({"dep": ["a", "aa", "aaa"]})
    User.removeAllUsers()
})

test("see an employee's working hours", () => {
    Registration.createEmployeeByAdmin("a","a","a","aaaaaaaaaaaaaaaaaaa111","a","a","a","a","9-16","a","a")
    let user = User.findObjectByKey("email", "a");
    expect(user.see_working_hour("a")).toStrictEqual({"a": {"Working Hour": "9-16"}})
    User.removeAllUsers()
})
