const express = require('express');
const bodyParser = require('body-parser');
const User = require("./model/User");
const Exception = require("./Exception")
const Admin = require("./model/Admin");
const Token = require("./Token");
const actionTakerValidation = require("./validation/actionTakerValidation");
const e = require("express");

const app = express();
app.use(bodyParser.json());



// each file should contain one class
// TODO debug the separation of Admin and User
// TODO validations can be moved to presentation (view) layer
// TODO change the response to json format
// TODO Change the method name so it'll reflect the responsibility (signup is actually create employee and createAdmin)
// TODO separate each route by its resource
// TODO use controller and write the main functionality of your program in the controller
// TODO move this to user class as an static method
// TODO make the constructors smaller!
// TODO debug root!!!!!!


//TODO INCOMPLETE!
app.post('/room_management/sign_up/admin', async (req, res) => {
    const {name, family_name, email, password, phone_number, department, organization_level, office, working_hours} = req.body;
    try {
        Admin.signUp(name, family_name, email, password, phone_number, department, organization_level, office, working_hours);
        res.status(201).send("Admin was successfully created!");
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})
//TODO INCOMPLETE!
app.post('/room_management/sign_up/employee', async (req, res) =>{
    const {name, family_name, email, password, phone_number, department, organization_level, office, working_hours, role, status} = req.body;
    try {
        const user_request = Token.authenticate_actor(req.header('Authorization'));
        user_request.create_employee(user_request, name, family_name, email, password, phone_number, department, organization_level, office, working_hours, role, status);
        res.status(201).send("Username with email address \"" + email + "\" was successfully created!");
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})
//TODO INCOMPLETE!
app.post('/room_management/login/admin', async (req, res) => {
    const {email, password} = req.body;
    try {
        Admin.login(email, password);
        res.header('Authorization', Token.createToken(User.findObjectByKey("email", email), email));
        res.status(200).send("The admin successfully logged in!");
    } catch (err) {
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})
//TODO INCOMPLETE!
app.post('/room_management/login/employee', async (req, res) =>{
    const { email, password } = req.body;
    try {
        User.login(email, password);
        res.header('Authorization', Token.createToken(User.findObjectByKey("email", email), email));
        res.status(200).send("The admin successfully logged in!");
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_admin/list_of_employees', async (req, res) =>{
    try {
        const user_request = Token.authenticate_actor(req.header('Authorization'));
        actionTakerValidation.validateAdmin(user_request);
        res.status(201).send(user_request.view_list_employees());
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_admin/enable_disable_employee', async (req, res) =>{
    const {email} = req.body;
    if (!email)
        throw "please fill all the information"
    try {
        const user_request = Token.authenticate_actor(req.header('Authorization'));
        actionTakerValidation.validateAdmin(user_request);
        let EnOrDis = user_request.enable_disable(email);
        res.status(200).send("employee with the email address " + email + " was successfully " + EnOrDis);
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_admin/view_employee', async (req, res) =>{
    const { email } = req.body;
    if (!email) throw "please fill all the information"
    try{
        const user_request = Token.authenticate_actor(req.header('Authorization'));
        actionTakerValidation.validateAdmin(user_request);
        let detail = user_request.view_detail_one_employee(email)
        res.status(200).send(detail);
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_admin/edit_employee', async (req, res) =>{
    const { name, family_name, email, department, organization_level, office, working_hours, role, status } = req.body;
    try {
        const user_request = Token.authenticate_actor(req.header('Authorization'));
        actionTakerValidation.validateAdmin(user_request);
        user_request.change_detail_employee(name, family_name,email, department, organization_level, office, working_hours, role, status);
        res.status(200).send("The user's detail(s) was successfully edited")
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_employee/edit', async (req, res) =>{
    const { name, family_name, working_hour } = req.body;
    try {
        const employee = Token.authenticate_actor(req.header('Authorization'));
        actionTakerValidation.validateEmployee(employee);
        employee.change_detail(name, family_name, working_hour);
        res.status(200).send("The employee's detail(s) was changed successfully!")
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_employee/all_employee_department', async (req, res) =>{
    const { department } = req.body;
    if (!department)
        throw "please fill all the information";
    try {
        let employee = Token.authenticate_actor(req.header('Authorization'));
        actionTakerValidation.validateEmployee(employee);
        res.status(200).send(employee.get_all_employee(department))
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_employee/working_hour',async (req, res) =>{
    const { email } = req.body;
    if (!email) throw "please fill all the information"
    try {
        let employee = Token.authenticate_actor(req.header('Authorization'));
        actionTakerValidation.validateEmployee(employee)
        res.status(200).send(employee.see_working_hour(employee, email))
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.listen(2000)