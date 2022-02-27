//Testing the check password function
const {checkPassword} = require("../controller/Registration");
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
