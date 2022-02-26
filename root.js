const express = require('express');
const bodyParser = require('body-parser');
const {User} = require("./model/User");
const Exception = require("./Exception")
const Admin = require("./model/Admin");
const Token = require("./Token");
const actionTakerValidation = require("./validation/actionTakerValidation");

const app = express();
app.use(bodyParser.json());



// each file should contain one class
// debug the separation of Admin and User
// validations can be moved to presentation (view) layer
// TODO change the response to json format
// Change the method name so it'll reflect the responsibility (signup is actually create employee and createAdmin)
// separate each route by its resource
// use controller and write the main functionality of your program in the controller
// TODO move this to user class as a static method
// make the constructors smaller!
// debug root!!!!!!


app.post('/roomManagement/signUp/admin', async (req, res) => {
    const {name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour} = req.body;
    if (!(name && familyName && email && password && phoneNumber && department && organizationLevel && office && workingHour))
        throw new Error("please fill all the information");

    try {
        User.createAdmin(name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour);
        res.status(201).send("Admin was successfully created!");
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/panelAdmin/signUpEmployee', async (req, res) =>{
    const {name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status} = req.body;
    if (!(name && familyName && email && password && phoneNumber && department && organizationLevel && office && workingHour && role && status))
        throw new Error("please fill all the information");

    try {
        const userRequest = Token.authenticateActor(req.header('Authorization'));
        actionTakerValidation.validateAdmin(userRequest);
        userRequest.createEmployee(userRequest, name, familyName, email, password, phoneNumber, department, organizationLevel, office, workingHour, role, status);
        res.status(201).send("Username with email address \"" + email + "\" was successfully created!");
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})
//TODO INCOMPLETE!
app.post('/roomManagement/login/admin', async (req, res) => {
    const {email, password} = req.body;
    if (!(email && password))
        throw new Error("please fill all the information");
    try {
        Admin.login(email, password);
        res.header('Authorization', Token.createToken(User.findObjectByKey("email", email), email));
        res.status(200).send("The admin successfully logged in!");
    } catch (err) {
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})
//TODO INCOMPLETE!
app.post('/roomManagement/login/employee', async (req, res) =>{
    const { email, password } = req.body;
    if (!(email && password))
        throw new Error("please fill all the information");
    try {
        User.login(email, password);
        res.header('Authorization', Token.createToken(User.findObjectByKey("email", email), email));
        res.status(200).send("The admin successfully logged in!");
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/panelAdmin/listOfEmployees', async (req, res) =>{
    try {
        const userRequest = Token.authenticateActor(req.header('Authorization'));
        actionTakerValidation.validateAdmin(userRequest);
        res.status(201).send(userRequest.view_list_employees());
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/panelAdmin/enableDisableEmployee', async (req, res) =>{
    const {email} = req.body;
    if (!email)
        throw "please fill all the information"
    try {
        const userRequest = Token.authenticateActor(req.header('Authorization'));
        actionTakerValidation.validateAdmin(userRequest);
        let EnOrDis = userRequest.enable_disable(email);
        res.status(200).send("employee with the email address " + email + " was successfully " + EnOrDis);
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/panelAdmin/viewEmployee', async (req, res) =>{
    const { email } = req.body;
    if (!email) throw "please fill all the information"
    try{
        const userRequest = Token.authenticateActor(req.header('Authorization'));
        actionTakerValidation.validateAdmin(userRequest);
        let detail = userRequest.view_detail_one_employee(email)
        res.status(200).send(detail);
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/panelAdmin/editEmployee', async (req, res) =>{
    const { name, familyName, email, department, organizationLevel, office, workingHour, role, status } = req.body;
    try {
        const userRequest = Token.authenticateActor(req.header('Authorization'));
        actionTakerValidation.validateAdmin(userRequest);
        userRequest.change_detail_employee(name, familyName,email, department, organizationLevel, office, workingHour, role, status);
        res.status(200).send("The user's detail(s) was successfully edited")
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/panelEmployee/edit', async (req, res) =>{
    const { name, familyName, workingHour } = req.body;
    try {
        const employee = Token.authenticateActor(req.header('Authorization'));
        actionTakerValidation.validateEmployee(employee);
        employee.change_detail(employee, name, familyName, workingHour);
        res.status(200).send("The employee's detail(s) was changed successfully!")
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/panelEmployee/allEmployeeDepartment', async (req, res) =>{
    const { department } = req.body;
    if (!department)
        throw "please fill all the information";
    try {
        let employee = Token.authenticateActor(req.header('Authorization'));
        actionTakerValidation.validateEmployee(employee);
        res.status(200).send(employee.get_all_employee(department))
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.post('/roomManagement/panelEmployee/workingHour',async (req, res) =>{
    const { email } = req.body;
    if (!email) throw "please fill all the information"
    try {
        let employee = Token.authenticateActor(req.header('Authorization'));
        actionTakerValidation.validateEmployee(employee)
        res.status(200).send(employee.see_working_hour(employee, email))
    }catch (err){
        res.status(Exception.getStatusByExceptionMessage(err)).send(err);
    }
})

app.listen(2000)