const User = require("../model/User");
const {Registration} = require("../controller/Registration")

test('should throw an error if there is already a user with the given email', () => {
    Registration.createEmployeeByAdmin("name", "family", "name@gmail.com", "123asd123asd", "09123456789","CX", "asdff", "oiuy", "9-15", "employee", "enable");
    expect( () => {
        //Registration.createAdmin("name", "family", "name@gmail.com", "k", "09123456789", "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18");
        Registration.createEmployeeByAdmin("name2", "family2", "name@gmail.com", "123a22sd123asd", "09123456777","CX", "asdff", "oiuy", "9-15", "employee", "enable");
    }).toThrow("کارمندی با ایمیل وارد شده وجود دارد!");
    User.removeAllUsers()
})

test('should throw an error if the given password was weak', () => {
    expect( () => {
        Registration.createEmployeeByAdmin("name", "family", "name@gmail.com", "k", "09123456789", "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18");
    }).toThrow("Your password should be at least 10 characters including alphabetic and numeric.");
})

test("create an employee without throwing exceptions", () => {
    Registration.createEmployeeByAdmin("name", "family", "name@gmail.com", "kkkkkkkkkk121212", "09123456789", "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18","employee", "enable");
    expect(User.findObjectByKey("email", "name@gmail.com")).not.toBeNull();
})