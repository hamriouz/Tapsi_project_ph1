const User = require("../model/User");
const {Registration} = require("../controller/Registration")


test('should throw an error if the given password was weak', () => {
    expect( () => {
         Registration.createAdmin("name", "family", "name@gmail.com", "k", "09123456789", "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18");
    }).toThrow("Your password should be at least 10 characters including alphabetic and numeric.");
})
test("create an admin without throwing exceptions", () => {
    Registration.createAdmin("name", "family", "name@gmail.com", "kkkkkkkkkk121212", "09123456789", "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18");

    expect(User.findObjectByKey("email", "name@gmail.com")).not.toBeNull();
    User.removeAllUsers()
})
test('should throw an error if an admin has already been created', () => {
    Registration.createAdmin("name", "family", "name@gmail.com", "kkkkkkkkkk121212", "09123456789", "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18");

    expect(() => {
        Registration.createAdmin("name", "family", "nammmmme@gmail.com", "kllllllllll1212", "09123456789", "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18");
    }).toThrow("Admin has already been created");
})


