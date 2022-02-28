const User = require("../model/User");
// const {Registration} = require("../controller/Registration")
const CreateAdmin = require("../controller/CreateAdmin")

test('should throw an error if the given password was weak', () => {
    expect( () => {
        CreateAdmin.createAdmin(undefined,"name", "family", "name@gmail.com", "k", "09123456789", "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18");
    }).toThrow("Your password should be at least 10 characters including alphabetic and numeric.");
    User.removeAllUsers()
})

test("create an admin without throwing exceptions", () => {
    CreateAdmin.createAdmin(undefined, "name", "family", "name@gmail.com", "kkkkkkkkkk121212", "09123456789", "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18");
    expect(User.findObjectByKey("email", "name@gmail.com")).not.toBeNull();
    User.removeAllUsers()
})

test('should throw an error if an admin has already been created', () => {
    CreateAdmin.createAdmin(undefined, "name", "family", "name@gmail.com", "kkkkkkkkkk121212", "09123456789", "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18");

    expect(() => {
        CreateAdmin.createAdmin(User.findObjectByKey("role", "admin"), "name", "family", "nammmmme@gmail.com", "kllllllllll1212", "09123456789", "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18");
    }).toThrow("Admin has already been created");
})