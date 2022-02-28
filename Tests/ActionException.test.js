const {Registration} = require("../controller/Registration");
actionException = require("../controller/actionException")
actionTakerValidator = require("../validation/actionTakerValidation")

test("throw fill all the information exception", () => {
    expect( () => {
    actionException.signUpAdmin("","","a","a1234567890","a","a","a","a","a");
}).toThrow("please fill all the information");
})

test("logged in admin can take actions", () => {
    expect( () => {
        actionTakerValidator.validateEmployee(undefined);
    }).toThrow("Only a logged in employee can do this action!")
})

