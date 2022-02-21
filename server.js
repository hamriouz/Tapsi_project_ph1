const express = require('express');
const myClass = require('./final');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.post('/name', (req, res) => {

    let newPrintWord = new myClass(req.body.name);

    res.json({name: newPrintWord.printNameWithDot()})
})

app.listen(2000);
