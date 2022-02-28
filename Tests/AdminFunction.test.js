const Admin = require("../model/Admin")
const {Registration} = require("../controller/Registration");
const CreateAdmin = require("../controller/CreateAdmin");
const User = require("../model/User");

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
            "Status": "enable",
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
    User.removeAllUsers()
})