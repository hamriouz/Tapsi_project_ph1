const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const User = require("./model/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Exception = require("./Exception")
const Admin = require("./model/user");
const Token = require("./Token");
const e = require("express");
const app = express();
app.use(bodyParser.json());


//TODO CHECK IF THE PERSON USING THE EMPLOYEE'S ACTION IS AN EMPLOYEE!
//TODO tuyen enable disable check kone ke yaru log ine ya na o ....
//TODO in logins and other actions, check if the person who is logging in is the correct person (admin or employee)
//TODO How to give each user a token and check if the token is given?
//fixme req.body.token miad tokene requeste ersalio migire bad verify mikoni

//TODO biad inja user ro begire bad khodesh exception mide age vujud nadasht bad user ro pass bede be tabeyi ke gharare
// kar anjam bede unja age yaru admin ya employee nabud baz exception

// send the token when logging in -> res.header('Authorization', Token.createToken(User.findObjectByKey("email", email), email));
// receive the token when logged in -> const user_request = Token.authenticate_actor(req.header('Authorization'));

// If no one had logged in, it throws an exception and no need yto handle it again!

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
        const user_request = Token.authenticate_actor(req.header('Authorization'));
        Admin.create_employee(user_request, name, family_name, email, password, phone_number, department, organization_level, office, working_hours, role, status);
        res.status(201).send("Username with email address \"" + email + "\" was successfully created!");
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

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
        res.status(201).send(Admin.view_list_employees(user_request));
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_admin/enable_disable_employee', async (req, res) =>{
    const {email} = req.body;
    try {
        const user_request = Token.authenticate_actor(req.header('Authorization'));
        let EnOrDis = Admin.enable_disable(user_request, email);
        res.status(200).send("employee with the email address " + email + " was successfully " + EnOrDis);
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_admin/view_employee', async (req, res) =>{
    const { email } = req.body;
    try{
        const user_request = Token.authenticate_actor(req.header('Authorization'));
        let detail = Admin.view_detail_one_employee(user_request, email)
        res.status(200).send(detail);
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_admin/edit_employee', async (req, res) =>{
    const { name, family_name, email, department, organization_level, office, working_hours, role, status } = req.body;
    try {
        const user_request = Token.authenticate_actor(req.header('Authorization'));
        Admin.change_detail_employee(user_request, name, family_name,email, department, organization_level, office, working_hours, role, status);
        res.status(200).send("The user's detail(s) was successfully edited")
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_employee/edit', async (req, res) =>{
    const { name, family_name, working_hour } = req.body;
    try {
        const employee = Token.authenticate_actor(req.header('Authorization'));
        employee.change_detail(name, family_name, working_hour);
        res.status(200).send("The employee's detail(s) was changed successfully!")
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_employee/all_employee_department', async (req, res) =>{
    const { department } = req.body;
    try {
        let employee = Token.authenticate_actor(req.header('Authorization'));
        res.status(200).send(employee.get_all_employee(department))
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.post('/room_management/panel_employee/working_hour',async (req, res) =>{
    const { email } = req.body;
    try {
        let employee = Token.authenticate_actor(req.header('Authorization'));
        res.status(200).send(employee.see_working_hour(email))
    }catch (err){
        res.status(Exception.get_status_by_Emessage(err)).send(err);
    }
})

app.listen(2000)



/*
function auth(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    const user = User.findByPk(parseInt(req.user.id));
    if (user == null || user == undefined) {
      req.user = undefined;
      return res.status(400).json({ error: 'Invalid Token' });
    }
    // req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid Token' });
  }
}
 */











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