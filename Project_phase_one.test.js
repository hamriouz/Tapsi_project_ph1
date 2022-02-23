const superset = require('supertest')
const User = require("./model/user");
const Exception = require("./Exception")
const Admin = require("./model/user");
const Token = require("./Token");


test('when exception "please fill all the information" is thrown status should be 400', () => {
    expect(Exception.get_status_by_Emessage("please fill all the information")).toBe(400);
});

test('when exception "Only a logged in admin can create an employee!" is thrown status should be 400', () => {
    expect(Exception.get_status_by_Emessage("Only a logged in admin can create an employee!")).toBe(400);
});
test('when exception "Only a logged in employee can do this action!" is thrown status should be 400', () => {
    expect(Exception.get_status_by_Emessage("Only a logged in employee can do this action!")).toBe(400);
});
test('when exception "Only a logged in admin can do this action!" is thrown status should be 400', () => {
    expect(Exception.get_status_by_Emessage("Only a logged in admin can do this action!")).toBe(400);
});
test('when exception "Invalid Credentials!" is thrown status should be 401', () => {
    expect(Exception.get_status_by_Emessage("Invalid Credentials!")).toBe(401);
});
test('when exception "Access denied! Please login!" is thrown status should be 401', () => {
    expect(Exception.get_status_by_Emessage("Access denied! Please login!")).toBe(401);
});
test('when exception "Your account was disabled! You don\'t have the permission to log in!" is thrown status should be 401', () => {
    expect(Exception.get_status_by_Emessage("Your account was disabled! You don't have the permission to log in!")).toBe(401);
});
test('when exception Your account was disabled! You don\'t have the permission to take this action!" is thrown status should be 401', () => {
    expect(Exception.get_status_by_Emessage("Your account was disabled! You don't have the permission to take this action!")).toBe(401);
});
test('when exception "Employee with the given Email Address doesn\'t exist!" is thrown status should be 406', () => {
    expect(Exception.get_status_by_Emessage("Employee with the given Email Address doesn't exist!")).toBe(406);
});
test('when exception "there aren\'t any employees in the given department!" is thrown status should be 409', () => {
    expect(Exception.get_status_by_Emessage("there aren't any employees in the given department!")).toBe(409);
});
test('when exception "کارمندی با ایمیل وارد شده وجود دارد!" is thrown status should be 409', () => {
    expect(Exception.get_status_by_Emessage("کارمندی با ایمیل وارد شده وجود دارد!")).toBe(409);
});
test('when exception "Your password should be at least 10 characters including alphabetic and numeric." is thrown status should be 409', () => {
    expect(Exception.get_status_by_Emessage("Your password should be at least 10 characters including alphabetic and numeric.")).toBe(409);
});
test('when exception "Admin has already been created" is thrown status should be 409', () => {
    expect(Exception.get_status_by_Emessage("Admin has already been created")).toBe(409);
});
test('when exception "employee with the given email address doesn\'t exist!" is thrown status should be 409', () => {
    expect(Exception.get_status_by_Emessage("employee with the given email address doesn't exist!")).toBe(409);
});
