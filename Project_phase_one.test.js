const superset = require('supertest')
const Exception = require("./Exception")
const {User} = require("./model/User");
const Admin = require("./model/Admin");
const {checkPassword} = require("./model/User");
const Token = require("./Token");



//Testing the signup admin!
test('should throw an error if some of the fields dont have information', () => {
    expect(() => {
        Admin.signUp("name", "", "name@gmail.com", "kkkkkkkkkkkkkkkkkkkkkkk555555555555555555", 989123456789, "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18");
    }).toThrow("please fill all the information");
})
test('should throw an error if the given password was weak', () => {
    expect(() => {
        Admin.signUp("name", "family", "name@gmail.com", "k", 989123456789, "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18");
    }).toThrow("Your password should be at least 10 characters including alphabetic and numeric.");
})
test("create an admin without throwing exceptions", () => {
    Admin.signUp("name", "family", "name@gmail.com", "kkkkkkkkkk121212", 989123456789, "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18");

    expect(User.findObjectByKey("email", "name@gmail.com")).not.toBeNull();
})
test('should throw an error if an admin has already been created', () => {
    Admin.signUp("name", "family", "name@gmail.com", "kkkkkkkkkk121212", 989123456789, "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18");

    expect(() => {
        Admin.signUp("name", "family", "nammmmme@gmail.com", "kllllllllll1212", 989123456789, "CX", "kkkkkkkkkkkkkkkkkkkk", "aaaaa", "9-18");
    }).toThrow("Admin has already been created");
})


//Testing the signup user!
test()


//Testing the check password function
test("Return false because the password doesn't contain number", () => {
    expect(checkPassword("mnmnmmmnmmm")).toBe(false);
});
test("Return false because the password doesn't contain letter", () => {
    expect(checkPassword("1234567890")).toBe(false);
});
test("Return false because the password doesn't contain 10 characters", () => {
    expect(checkPassword("mjk123")).toBe(false);
});
test("Return true", () => {
    expect(checkPassword("mnbv12lkjh")).toBe(true);
});


//Testing the return values of the Exception class
test('when exception "please fill all the information" is thrown status should be 400', () => {
    expect(Exception.getStatusByExceptionMessage("please fill all the information")).toBe(400);
});
test('when exception "Only a logged in admin can create an employee!" is thrown status should be 400', () => {
    expect(Exception.getStatusByExceptionMessage("Only a logged in admin can create an employee!")).toBe(400);
});
test('when exception "Only a logged in employee can do this action!" is thrown status should be 400', () => {
    expect(Exception.getStatusByExceptionMessage("Only a logged in employee can do this action!")).toBe(400);
});
test('when exception "Only a logged in admin can do this action!" is thrown status should be 400', () => {
    expect(Exception.getStatusByExceptionMessage("Only a logged in admin can do this action!")).toBe(400);
});
test('when exception "Invalid Credentials!" is thrown status should be 401', () => {
    expect(Exception.getStatusByExceptionMessage("Invalid Credentials!")).toBe(401);
});
test('when exception "Access denied! Please login!" is thrown status should be 401', () => {
    expect(Exception.getStatusByExceptionMessage("Access denied! Please login!")).toBe(401);
});
test('when exception "Your account was disabled! You don\'t have the permission to log in!" is thrown status should be 401', () => {
    expect(Exception.getStatusByExceptionMessage("Your account was disabled! You don't have the permission to log in!")).toBe(401);
});
test('when exception Your account was disabled! You don\'t have the permission to take this action!" is thrown status should be 401', () => {
    expect(Exception.getStatusByExceptionMessage("Your account was disabled! You don't have the permission to take this action!")).toBe(401);
});
test('when exception "Employee with the given Email Address doesn\'t exist!" is thrown status should be 406', () => {
    expect(Exception.getStatusByExceptionMessage("Employee with the given Email Address doesn't exist!")).toBe(406);
});
test('when exception "there aren\'t any employees in the given department!" is thrown status should be 409', () => {
    expect(Exception.getStatusByExceptionMessage("there aren't any employees in the given department!")).toBe(409);
});
test('when exception "کارمندی با ایمیل وارد شده وجود دارد!" is thrown status should be 409', () => {
    expect(Exception.getStatusByExceptionMessage("کارمندی با ایمیل وارد شده وجود دارد!")).toBe(409);
});
test('when exception "Your password should be at least 10 characters including alphabetic and numeric." is thrown status should be 409', () => {
    expect(Exception.getStatusByExceptionMessage("Your password should be at least 10 characters including alphabetic and numeric.")).toBe(409);
});
test('when exception "Admin has already been created" is thrown status should be 409', () => {
    expect(Exception.getStatusByExceptionMessage("Admin has already been created")).toBe(409);
});
test('when exception "employee with the given email address doesn\'t exist!" is thrown status should be 409', () => {
    expect(Exception.getStatusByExceptionMessage("employee with the given email address doesn't exist!")).toBe(409);
});
