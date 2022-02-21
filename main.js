const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const User = require("./model/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Exception = require("./Exception")
const Admin = require("./model/user");
const e = require("express");
const app = express();
app.use(bodyParser.json());


//TODO in logins and other actions, check if the person who is logging in is the correct person (admin or employee)
//TODO How to give each user a token and check if the token is given?
//TODO token set on cookie & token set on header?


app.post('/room_management/sign_up/admin', async (req, res) => {
    const {name, family_name, email, password, phone_number, department, organization_level, office, working_hours} = req.body;
    try {
        Admin.signUp(name, family_name, email, password, phone_number, department, organization_level, office, working_hours);
        res.status(201).send("Admin was successfully created!");
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/sign_up/employee', async (req, res) =>{
    const {name, family_name, email, password, phone_number, department, organization_level, office, working_hours, role, status} = req.body;
    try {
        Admin.create_employee(name, family_name, email, password, phone_number, department, organization_level, office, working_hours, role, status);
        res.status(201).send("Username with email address \"" + email + "\" was successfully created!");
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

//TODO give token!
app.post('/room_management/login/admin', async (req, res) => {
    const {email, password} = req.body;
    try {
        Admin.login(email, password);
        res.status(200).send("The admin successfully logged in!");
    } catch (err) {
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})
/*
    if (!(email && password)) {
        res.status(400).send("All input is required");
    }

    //validate password:
    const user = User.findObjectByKey("email", email);
    if (user && bcrypt.compare(password, user.password)){
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        // save user token
        user.token = token;

        res.status(200).send("The admin successfully logged in!");
    }
    else {
        res.status(400).send("Invalid Credentials!")
    }
    */

//TODO give token!
app.post('/room_management/login/employee', async (req, res) =>{
    const { email, password } = req.body;
    try {
        User.login(email, password);
        res.status(200).send("The admin successfully logged in!");
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_admin/list_of_employees', async (req, res) =>{
    let list = Admin.view_list_employees();
    res.status(201).send(list);
})

app.post('/room_management/panel_admin/enable_disable_employee', async (req, res) =>{
    const {email} = req.body;
    try {
        let EnOeDis = Admin.enable_disable(email);
        res.status(200).send("employee with the email address " + email + " was successfully " + EnOeDis);
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_admin/view_employee', async (req, res) =>{
    const { email } = req.body;
    try{
        let detail = Admin.view_detail_one_employee(email)
        res.status(200).send(detail);
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_admin/edit_employee', async (req, res) =>{
    const { name, family_name, email, department, organization_level, office, working_hours, role, status } = req.body;
    try {
        Admin.change_detail_employee(name, family_name,email, department, organization_level, office, working_hours, role, status);
        res.status(200).send("The user's detail(s) was successfully edited")
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_employee/edit', async (req, res) =>{
    const { name, family_name, working_hour } = req.body;
    try {
        //TODO pass the user here!
        let a = "a";
        let employee = new User(a,a,1,a,a,a,a,a,a,a,a);
        employee.change_detail(name, family_name, working_hour);
        res.status(200).send("The employee's detail(s) was changed successfully!")
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_employee/all_employee_department', async (req, res) =>{
    const { department } = req.body;
    try {
        let a = "a";
        let employee = new User(a,a,1,a,a,a,a,a,a,a,a);
        let list = employee.get_all_employee(department)
        res.status(200).send(list)
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_employee/working_hour',async (req, res) =>{
    const { email } = req.body;
    try {
        let a = "a";
        let employee = new User(a,a,1,a,a,a,a,a,a,a,a);
        let working_hour = employee.see_working_hour(email)
        res.status(200).send(working_hour)
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.listen(2000)















/*valid input:
#sign up employee->
{
	"name": "hg",
	"family_name": "sds",
	"email": "huuuj@s.com",
	"password": "jjj111iiiiii11",
	"phone_number": 987665,
	"department": "jjjj",
	"organization_level": "as",
	"office": "jjjjjjjj",
	"working_hours": "9-10",
	"role": "employee",
	"status": "bhjbhjb"
}
 */