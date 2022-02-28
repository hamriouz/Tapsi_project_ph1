const Admin = require("../model/Admin")
const {Registration} = require("../controller/Registration");
const CreateAdmin = require("../controller/CreateAdmin");
const User = require("../model/User");
const e = require("express");

/*test("get all employees from a department", () => {
    Registration.createEmployeeByAdmin("a","a","a","123456789a","a","dep","a","a","9-16","a","a")
    Registration.createEmployeeByAdmin("a","a","aa","123456789a","a","dep","a","a","9-16","a","a")
    Registration.createEmployeeByAdmin("a","a","aaa","123456789a","a","dep","a","a","9-16","a","a")
    Registration.createEmployeeByAdmin("a","a","aaaa","123456789a","a","depart","a","a","9-16","a","a")
    let user = User.findObjectByKey("email", "a");
    expect(user.get_all_employee("dep")).toStrictEqual({"dep": ["a", "aa", "aaa"]})
    User.removeAllUsers()
})*/
/*test("view list of all employees", () => {
    Registration.createAdmin("a","a","a","123456789a","a","de","a","a","9-12")
    // Registration.createEmployeeByAdmin("a","a","a","123456789a","a","dep","a","a","9-16","a","employee")
    Registration.createEmployeeByAdmin("a","a","aa","123456789a","a","depa","a","a","9-16","employee","enable")
    Registration.createEmployeeByAdmin("a","a","aaa","123456789a","a","depar","a","a","9-16","employee","enable")
    Registration.createEmployeeByAdmin("a","a","aaaa","123456789a","a","depart","a","a","9-16","employee","enable")
    let admin = Admin.findObjectByKey("email","a");
    // expect(admin.role).toBe("admin")
    expect(admin.view_detail_one_employee("aaa").toStrictEqual({"dep": ["a", "aa", "aaa"]}))
})*/

test("view list of all employees", () => {
    CreateAdmin.createAdmin(undefined, "a","a","a","123456789a","1","q","a","a","9-12");
    Registration.createEmployeeByAdmin("ab","a","aa","123456789a","a","a","a","a","8-15","employee","enable");
    Registration.createEmployeeByAdmin("abc","a","aaa","123456789a","a","a","a","a","8-15","employee","enable");
    Registration.createEmployeeByAdmin("abcd","a","aaaa","123456789a","a","a","a","a","8-15","employee","enable");
    let admin = Admin.findObjectByKey("role","admin");
    expect(admin.view_list_employees()).toStrictEqual({
        "a": {
            "Department": "q",
            "Family name": "a",
            "Name": "a",
            "Office": "a"
        },
        "aa": {
            "Department": "a",
            "Family name": "a",
            "Name": "ab",
            "Office": "a"
        },
        "aaa": {
            "Department": "a",
            "Family name": "a",
            "Name": "abc",
            "Office": "a"
        },
        "aaaa": {
            "Department": "a",
            "Family name": "a",
            "Name": "abcd",
            "Office": "a"
        }
    });
    User.removeAllUsers()
})

test("change detail of employee", () => {
    CreateAdmin.createAdmin(undefined, "a","a","a","123456789a","1","q","a","a","9-12");
    Registration.createEmployeeByAdmin("ab","a","aa","123456789a","a","a","a","a","8-15","employee","enable");
    let admin = User.findObjectByKey("role","admin");
    let employee = User.findObjectByKey("email", "aa")
    admin.change_detail_employee("asdf","","aa","","","","","","")
    expect(employee.name).toBe("asdf")
    User.removeAllUsers()
})

test("view detail of one employee", () => {
    CreateAdmin.createAdmin(undefined, "a","a","a","123456789a","1","q","a","a","9-12");
    Registration.createEmployeeByAdmin("ab","a","aa","123456789a","a","a","a","a","8-15","employee","enable");
    let admin = User.findObjectByKey("role","admin");
    // let employee = User.findObjectByKey("email", "aa")
    expect(admin.view_detail_one_employee("aa")).toStrictEqual({
        "aa": {
            "Department": "a",
            "Email": "aa",
            "Family name": "a",
            "Name": "ab",
            "Office": "a",
            "Organization Level": "a",
            "Phone Number": "a",
            "Role": "employee",
            "Status": "employee",
            "Working Hour": "8-15"
        }
    })
    User.removeAllUsers()
})

test("enable disable employee", () => {
    CreateAdmin.createAdmin(undefined, "a","a","a","123456789a","1","q","a","a","9-12");
    Registration.createEmployeeByAdmin("ab","a","aa","123456789a","a","a","a","a","8-15","employee","enable");
    let admin = User.findObjectByKey("role","admin");
    let employee = User.findObjectByKey("email", "aa")
    admin.enable_disable("aa");
    expect(employee.status).toBe("disable")
})